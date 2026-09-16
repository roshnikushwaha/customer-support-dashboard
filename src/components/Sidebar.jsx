import {
  LayoutDashboard,
  Ticket,
  Users,
  BarChart3,
  Settings,
  LifeBuoy,
  X,
} from "lucide-react";

const menuItems = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    active: true,
  },
  {
    label: "Tickets",
    icon: Ticket,
  },
  {
    label: "Customers",
    icon: Users,
  },
  {
    label: "Analytics",
    icon: BarChart3,
  },
];

function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform duration-300 lg:static lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex h-20 items-center justify-between border-b border-slate-100 px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm">
              <LifeBuoy size={22} />
            </div>

            <div>
              <h1 className="text-sm font-bold text-slate-900">
                SupportHub
              </h1>
              <p className="text-xs text-slate-400">Support Center</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-4 py-6">
          <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Main Menu
          </p>

          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.label}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                  item.active
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <Icon size={19} />
                <span>{item.label}</span>
              </button>
            );
          })}

          <div className="pt-7">
            <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Settings
            </p>

            <button className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-500 transition hover:bg-slate-50 hover:text-slate-900">
              <Settings size={19} />
              <span>Settings</span>
            </button>
          </div>
        </nav>

        {/* Bottom Card */}
        <div className="m-4 rounded-2xl bg-slate-900 p-4 text-white">
          <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">
            <LifeBuoy size={18} />
          </div>

          <p className="text-sm font-semibold">Need help?</p>

          <p className="mt-1 text-xs leading-5 text-slate-400">
            Contact your support administrator if you need assistance.
          </p>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;