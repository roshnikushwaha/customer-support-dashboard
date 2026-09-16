import { CalendarDays, ChevronRight, Mail } from "lucide-react";
import useTicketStore from "../store/ticketStore";
import PriorityBadge from "./PriorityBadge";
import StatusBadge from "./StatusBadge";

function formatDate(dateString) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(dateString));
}

function TicketList() {
  const tickets = useTicketStore((state) => state.tickets);
  const searchQuery = useTicketStore((state) => state.searchQuery);
  const statusFilter = useTicketStore((state) => state.statusFilter);
  const priorityFilter = useTicketStore(
    (state) => state.priorityFilter
  );

  const setSelectedTicket = useTicketStore(
    (state) => state.setSelectedTicket
  );

  const filteredTickets = tickets.filter((ticket) => {
    const query = searchQuery.toLowerCase().trim();

    const matchesSearch =
      !query ||
      ticket.id.toLowerCase().includes(query) ||
      ticket.subject.toLowerCase().includes(query) ||
      ticket.customer.name.toLowerCase().includes(query) ||
      ticket.customer.email.toLowerCase().includes(query);

    const matchesStatus =
      statusFilter === "All" || ticket.status === statusFilter;

    const matchesPriority =
      priorityFilter === "All" ||
      ticket.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  const resultCount = filteredTickets.length;
  const totalCount = tickets.length;

  if (resultCount === 0) {
    return (
      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6">
          <div>
            <h3 className="text-sm font-bold text-slate-800">
              Ticket Directory
            </h3>

            <p className="mt-1 text-xs text-slate-400">
              Showing 0 of {totalCount} tickets
            </p>
          </div>
        </div>

        <div className="border-t border-dashed border-slate-200 px-6 py-16 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400">
            <Mail size={24} />
          </div>

          <h3 className="mt-4 text-base font-semibold text-slate-800">
            No tickets found
          </h3>

          <p className="mt-1 text-sm text-slate-400">
            Try changing your search or filters.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* List Header */}
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6">
        <div>
          <h3 className="text-sm font-bold text-slate-800">
            Ticket Directory
          </h3>

          <p className="mt-1 text-xs text-slate-400">
            Showing {resultCount} of {totalCount} tickets
          </p>
        </div>

        <div className="hidden rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-500 sm:block">
          {resultCount === 1 ? "1 Result" : `${resultCount} Results`}
        </div>
      </div>

      {/* Desktop Table Header */}
      <div className="hidden border-b border-slate-100 bg-slate-50/70 px-6 py-4 lg:grid lg:grid-cols-[1.5fr_2fr_0.8fr_1fr_1fr_32px] lg:items-center lg:gap-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Customer
        </p>

        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Subject
        </p>

        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Priority
        </p>

        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Status
        </p>

        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Created
        </p>

        <span />
      </div>

      {/* Tickets */}
      <div className="divide-y divide-slate-100">
        {filteredTickets.map((ticket) => (
          <button
            key={ticket.id}
            onClick={() => setSelectedTicket(ticket)}
            className="group block w-full text-left transition hover:bg-slate-50 focus:outline-none focus-visible:bg-indigo-50/40"
          >
            {/* Desktop */}
            <div className="hidden px-6 py-5 lg:grid lg:grid-cols-[1.5fr_2fr_0.8fr_1fr_1fr_32px] lg:items-center lg:gap-4">
              {/* Customer */}
              <div className="min-w-0">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-xs font-bold text-indigo-600 ring-4 ring-indigo-50/50">
                    {ticket.customer.name
                      .split(" ")
                      .map((word) => word[0])
                      .join("")
                      .slice(0, 2)}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-800">
                      {ticket.customer.name}
                    </p>

                    <p className="truncate text-xs text-slate-400">
                      {ticket.id}
                    </p>
                  </div>
                </div>
              </div>

              {/* Subject */}
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-slate-700">
                  {ticket.subject}
                </p>

                <p className="mt-1 truncate text-xs text-slate-400">
                  {ticket.customer.email}
                </p>
              </div>

              {/* Priority */}
              <PriorityBadge priority={ticket.priority} />

              {/* Status */}
              <StatusBadge status={ticket.status} />

              {/* Created */}
              <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                <CalendarDays
                  size={15}
                  className="text-slate-400"
                />

                {formatDate(ticket.createdAt)}
              </div>

              {/* Arrow */}
              <ChevronRight
                size={18}
                className="text-slate-300 transition-all duration-200 group-hover:translate-x-1 group-hover:text-indigo-500"
              />
            </div>

            {/* Mobile / Tablet */}
            <div className="p-4 sm:p-5 lg:hidden">
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-xs font-bold text-indigo-600 ring-4 ring-indigo-50/50">
                    {ticket.customer.name
                      .split(" ")
                      .map((word) => word[0])
                      .join("")
                      .slice(0, 2)}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-800">
                      {ticket.customer.name}
                    </p>

                    <p className="mt-0.5 text-xs text-slate-400">
                      {ticket.id}
                    </p>
                  </div>
                </div>

                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-slate-400 transition group-hover:bg-indigo-50 group-hover:text-indigo-500">
                  <ChevronRight size={17} />
                </div>
              </div>

              <div className="mt-4">
                <p className="text-sm font-semibold leading-5 text-slate-800">
                  {ticket.subject}
                </p>

                <p className="mt-1 truncate text-xs text-slate-400">
                  {ticket.customer.email}
                </p>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <PriorityBadge priority={ticket.priority} />

                <StatusBadge status={ticket.status} />

                <span className="ml-auto flex items-center gap-1.5 text-xs font-medium text-slate-400">
                  <CalendarDays size={14} />
                  {formatDate(ticket.createdAt)}
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default TicketList;