"use client";
import { Download } from "lucide-react";
import { queueCsv } from "@/lib/operations";
export function QueueExport({
  rows,
  demo,
}: {
  rows: Array<Record<string, string | number>>;
  demo: boolean;
}) {
  const csv = queueCsv(rows);
  return (
    <details className="csv-export">
      <summary className="button secondary small">
        <Download size={14} /> Export queue ({rows.length})
      </summary>
      <div className="csv-preview">
        <b>{demo ? "Demo queue export" : "Visible queue export"}</b>
        <p>Only jobs matching your current filters are included.</p>
        <textarea
          aria-label="CSV export preview"
          readOnly
          value={csv}
          rows={5}
        />
        <button
          type="button"
          className="button secondary small"
          disabled={!rows.length}
          onClick={() => {
            const url = URL.createObjectURL(
              new Blob(["\uFEFF", csv], {
                type: "text/csv;charset=utf-8",
              }),
            );
            const link = document.createElement("a");
            link.href = url;
            link.download = `roadwatch-${demo ? "demo-" : ""}queue.csv`;
            document.body.appendChild(link);
            link.click();
            link.remove();
            setTimeout(() => URL.revokeObjectURL(url), 1000);
          }}
        >
          <Download size={14} /> Download CSV
        </button>
      </div>
    </details>
  );
}
