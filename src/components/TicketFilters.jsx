import {
  Filter,
  RotateCcw,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import useTicketStore from "../store/ticketStore";

function TicketFilters() {
  const searchQuery = useTicketStore((state) => state.searchQuery);
  const statusFilter = useTicketStore((state) => state.statusFilter);
  const priorityFilter = useTicketStore(
    (state) => state.priorityFilter
  );

  const setSearchQuery = useTicketStore(
    (state) => state.setSearchQuery
  );

  const setStatusFilter = useTicketStore(
    (state) => state.setStatusFilter
  );

  const setPriorityFilter = useTicketStore(
    (state) => state.setPriorityFilter
  );

  const clearFilters = () => {
    setSearchQuery("");
    setStatusFilter("All");
    setPriorityFilter("All");
  };

  const hasFilters =
    searchQuery ||
    statusFilter !== "All" ||
    priorityFilter !== "All";

  return (
    <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      {/* Filter Heading */}
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
            <SlidersHorizontal size={17} />
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-800">
              Find Tickets
            </h3>

            <p className="hidden text-xs text-slate-400 sm:block">
              Search and filter support requests
            </p>
          </div>
        </div>

        {hasFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
          >
            <RotateCcw size={14} />
            Clear
          </button>
        )}
      </div>

      {/* Controls */}
      <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_180px_180px]">
        {/* Search */}
        <div className="relative">
          <Search
            size={18}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            value={searchQuery}
            onChange={(event) =>
              setSearchQuery(event.target.value)
            }
            placeholder="Search by name, email, subject or ticket ID..."
            className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50/60 pl-11 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50"
          />
        </div>

        {/* Status */}
        <div className="relative">
          <Filter
            size={16}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value)
            }
            className="h-11 w-full cursor-pointer appearance-none rounded-xl border border-slate-200 bg-slate-50/60 px-10 text-sm font-medium text-slate-700 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50"
          >
            <option value="All">All Statuses</option>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>

        {/* Priority */}
        <div className="relative">
          <Filter
            size={16}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <select
            value={priorityFilter}
            onChange={(event) =>
              setPriorityFilter(event.target.value)
            }
            className="h-11 w-full cursor-pointer appearance-none rounded-xl border border-slate-200 bg-slate-50/60 px-10 text-sm font-medium text-slate-700 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50"
          >
            <option value="All">All Priorities</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default TicketFilters;