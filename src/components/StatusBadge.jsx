function StatusBadge({ status }) {
  const styles = {
    Open: "bg-amber-50 text-amber-700 ring-amber-600/10",
    "In Progress": "bg-blue-50 text-blue-700 ring-blue-600/10",
    Resolved: "bg-emerald-50 text-emerald-700 ring-emerald-600/10",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${
        styles[status] || "bg-slate-50 text-slate-600 ring-slate-500/10"
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

export default StatusBadge;