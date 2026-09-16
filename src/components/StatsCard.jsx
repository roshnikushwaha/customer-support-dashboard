import {
  CircleCheck,
  Clock3,
  Inbox,
  Ticket,
} from "lucide-react";

const iconMap = {
  total: Ticket,
  open: Inbox,
  progress: Clock3,
  resolved: CircleCheck,
};

function StatsCard({ title, value, type, description }) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>

          <h3 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
            {value}
          </h3>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
          <Icon size={21} />
        </div>
      </div>

      <p className="mt-4 text-xs text-slate-400">{description}</p>
    </div>
  );
}

export default StatsCard;