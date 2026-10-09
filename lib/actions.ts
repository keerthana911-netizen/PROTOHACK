'use server';
import {revalidatePath} from 'next/cache';
import {redirect} from 'next/navigation';
import {z} from 'zod';
import {requireRole} from './supabase';
async function upload(db:Awaited<ReturnType<typeof requireRole>>['db'],userId:string,file:FormDataEntryValue|null){
 if(!(file instanceof File) || file.size===0 || file.size>6*1024*1024 || !['image/jpeg','image/png','image/webp'].includes(file.type)) throw new Error('Upload a JPEG, PNG or WebP photo under 6 MB.');
 const bytes=new Uint8Array(await file.arrayBuffer());
 const valid=file.type==='image/jpeg' ? bytes[0]===255&&bytes[1]===216&&bytes[2]===255 : file.type==='image/png' ? bytes.slice(0,8).join(',')==='137,80,78,71,13,10,26,10' : new TextDecoder().decode(bytes.slice(0,4))==='RIFF'&&new TextDecoder().decode(bytes.slice(8,12))==='WEBP';
 if(!valid) throw new Error('Photo content does not match its file type.');
 const path=`${userId}/${crypto.randomUUID()}.${file.type.split('/')[1]}`;
 const {error}=await db.storage.from('road-photos').upload(path,bytes,{contentType:file.type,upsert:false});if(error) throw error;return path;
}
export async function submitReport(form:FormData){
 const s=await requireRole(['citizen']);
 const v=z.object({segment:z.string().uuid(),lat:z.coerce.number().min(-90).max(90),lng:z.coerce.number().min(-180).max(180),source:z.enum(['gps','manual_pin']),note:z.string().max(2000)}).parse(Object.fromEntries(form));
 const photo=await upload(s.db,s.user.id,form.get('photo'));
 const {data,error}=await s.db.rpc('submit_report',{segment:v.segment,lat:v.lat,lng:v.lng,source:v.source,photo,report_note:v.note});if(error) throw error;
 const {triageReport}=await import('./ai');await triageReport(data);
 revalidatePath('/'); redirect(`/tickets/${data}`);
}
export async function flagUnresolved(form:FormData){const s=await requireRole(['citizen']);const {error}=await s.db.rpc('flag_unresolved',{target:z.string().uuid().parse(form.get('id')),message:z.string().min(5).max(2000).parse(form.get('note'))});if(error)throw error;revalidatePath('/');revalidatePath(`/tickets/${form.get('id')}`);}
