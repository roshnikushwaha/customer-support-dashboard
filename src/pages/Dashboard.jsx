import { AlertCircle, RefreshCw } from "lucide-react";
import useTicketStore from "../store/ticketStore";
import StatsCard from "../components/StatsCard";
import TicketFilters from "../components/TicketFilters";
import TicketList from "../components/TicketList";

function Dashboard() {
  const tickets = useTicketStore((state) => state.tickets);
  const loading = useTicketStore((state) => state.loading);
  const error = useTicketStore((state) => state.error);

  const loadTickets = useTicketStore(
    (state) => state.loadTickets
  );

  const totalTickets = tickets.length;

  const openTickets = tickets.filter(
    (ticket) => ticket.status === "Open"
  ).length;

  const inProgressTickets = tickets.filter(
    (ticket) => ticket.status === "In Progress"
  ).length;

  const resolvedTickets = tickets.filter(
    (ticket) => ticket.status === "Resolved"
  ).length;

  if (loading) {
    return (
      <main className="p-4 sm:p-6 lg:p-8">
        <div className="animate-pulse">
          <div className="h-8 w-56 rounded-lg bg-slate-200" />

          <div className="mt-2 h-4 w-80 rounded bg-slate-200" />

          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-36 rounded-2xl bg-slate-200"
              />
            ))}
          </div>

          <div className="mt-6 h-24 rounded-2xl bg-slate-200" />

          <div className="mt-6 h-96 rounded-2xl bg-slate-200" />
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-[calc(100vh-80px)] items-center justify-center p-6">
        <div className="w-full max-w-md rounded-2xl border border-red-100 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-500">
            <AlertCircle size={26} />
          </div>

          <h2 className="mt-4 text-lg font-bold text-slate-900">
            Something went wrong
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            {error}
          </p>

          <button
            onClick={loadTickets}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            <RefreshCw size={17} />
            Try Again
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="p-4 sm:p-6 lg:p-8">
      {/* Page Heading */}
      <div>
        <p className="text-sm font-medium text-indigo-600">
          Overview
        </p>

        <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Support Dashboard
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Monitor and manage customer support requests from one place.
        </p>
      </div>

      {/* Stats */}
      <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          title="Total Tickets"
          value={totalTickets}
          type="total"
          description="All customer support tickets"
        />

        <StatsCard
          title="Open"
          value={openTickets}
          type="open"
          description="Tickets waiting for action"
        />

        <StatsCard
          title="In Progress"
          value={inProgressTickets}
          type="progress"
          description="Tickets currently being handled"
        />

        <StatsCard
          title="Resolved"
          value={resolvedTickets}
          type="resolved"
          description="Successfully resolved tickets"
        />
      </div>

      {/* Tickets */}
      <section className="mt-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Support Tickets
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Search and manage customer requests.
            </p>
          </div>

          <p className="hidden text-sm text-slate-400 sm:block">
            {totalTickets} tickets
          </p>
        </div>

        <TicketFilters />

        <TicketList />
      </section>
    </main>
  );
}

export default Dashboard;