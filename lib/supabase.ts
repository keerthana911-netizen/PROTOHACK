import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
export function configured() { return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY); }
export async function supabase() {
 if (!configured()) throw new Error('Connect Supabase to enable live workflows.');
 const jar = await cookies();
 return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {cookies:{getAll:()=>jar.getAll(),setAll: values=>{try {values.forEach(({name,value,options})=>jar.set(name,value,options));} catch {/* Server Components cannot set cookies; actions refresh sessions. */}}}});
}
export async function session() {
 if (!configured()) return null;
 const db = await supabase(); const {data:{user}}=await db.auth.getUser(); if (!user) return null;
 const {data,error}=await db.from('profiles').select('*').eq('id',user.id).single();
 if(error || !data) return null;
 return {db,user,profile:data as {id:string;name:string;role:'citizen'|'officer'|'reviewer';ward_id:string}};
}
export async function requireRole(roles:string[]) { const s=await session(); if(!s || !roles.includes(s.profile.role)) throw new Error('Your role cannot perform this action.'); return s; }
