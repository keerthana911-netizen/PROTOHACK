import { loadData } from "@/lib/data";
import { Shell } from "@/components/shell";
import { Dashboard } from "@/components/dashboard";
import { aiEnabled } from "@/lib/ai";
export const dynamic = "force-dynamic";
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string; view?: string }>;
}) {
  const p = await searchParams;
  const d = await loadData(p.view);
  return (
    <Shell d={d} active={p.filter === "repeat" ? "memory" : "dashboard"}>
      <Dashboard d={d} filter={p.filter} ai={aiEnabled()} />
    </Shell>
  );
}
