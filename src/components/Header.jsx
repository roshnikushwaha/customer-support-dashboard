import { Bell, Menu, Search } from "lucide-react";

function Header({ onMenuClick }) {
  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:px-6 lg:px-8">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="rounded-xl p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
        >
          <Menu size={22} />
        </button>

        <div>
          <p className="text-xs font-medium text-slate-400">
            Support Center
          </p>
          <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
            Customer Support
          </h2>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <button className="hidden rounded-xl p-2.5 text-slate-500 hover:bg-slate-100 sm:block">
          <Search size={20} />
        </button>

        <button className="relative rounded-xl p-2.5 text-slate-500 hover:bg-slate-100">
          <Bell size={20} />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-indigo-600 ring-2 ring-white" />
        </button>

        <div className="h-8 w-px bg-slate-200" />

        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-600">
            RS
          </div>

          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-slate-800">
              Support Admin
            </p>
            <p className="text-xs text-slate-400">Administrator</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;