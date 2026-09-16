function PriorityBadge({ priority }) {
  const styles = {
    Low: "bg-slate-100 text-slate-600",
    Medium: "bg-orange-50 text-orange-700",
    High: "bg-red-50 text-red-700",
  };

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
        styles[priority] || "bg-slate-100 text-slate-600"
      }`}
    >
      {priority}
    </span>
  );
}

export default PriorityBadge;