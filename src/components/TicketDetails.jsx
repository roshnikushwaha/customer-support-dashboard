import {
  CalendarDays,
  Clock3,
  Mail,
  Phone,
  UserRound,
  X,
} from "lucide-react";
import useTicketStore from "../store/ticketStore";
import PriorityBadge from "./PriorityBadge";
import StatusBadge from "./StatusBadge";

function formatDateTime(dateString) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(dateString));
}

function TicketDetails() {
  const selectedTicket = useTicketStore(
    (state) => state.selectedTicket
  );

  const closeTicketDetails = useTicketStore(
    (state) => state.closeTicketDetails
  );

  const updateTicketStatus = useTicketStore(
    (state) => state.updateTicketStatus
  );

  const updatingTicketId = useTicketStore(
    (state) => state.updatingTicketId
  );

  if (!selectedTicket) {
    return null;
  }

  const handleStatusChange = async (event) => {
    await updateTicketStatus(
      selectedTicket.id,
      event.target.value
    );
  };

  const isUpdating =
    updatingTicketId === selectedTicket.id;

  return (
    <>
      {/* Background Overlay */}
      <div
        className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-[2px]"
        onClick={closeTicketDetails}
      />

      {/* Details Drawer */}
      <aside className="fixed inset-y-0 right-0 z-50 flex w-full max-w-xl flex-col bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-6">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
              Ticket Details
            </p>

            <h2 className="mt-1 truncate text-lg font-bold text-slate-900">
              {selectedTicket.id}
            </h2>
          </div>

          <button
            onClick={closeTicketDetails}
            className="rounded-xl p-2.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
            aria-label="Close ticket details"
          >
            <X size={21} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="space-y-6 p-5 sm:p-6">
            {/* Issue Details */}
            <section>
              <div className="flex flex-wrap items-center gap-2">
                <PriorityBadge
                  priority={selectedTicket.priority}
                />

                <StatusBadge
                  status={selectedTicket.status}
                />
              </div>

              <h3 className="mt-4 text-xl font-bold leading-7 text-slate-900">
                {selectedTicket.subject}
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                {selectedTicket.description}
              </p>
            </section>

            {/* Customer Information */}
            <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-indigo-600 shadow-sm">
                  <UserRound size={18} />
                </div>

                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    Customer Information
                  </h4>

                  <p className="text-xs text-slate-400">
                    Contact details
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {/* Name */}
                <div>
                  <p className="text-xs font-medium text-slate-400">
                    Name
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-800">
                    {selectedTicket.customer.name}
                  </p>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3">
                  <Mail
                    size={16}
                    className="mt-0.5 shrink-0 text-slate-400"
                  />

                  <div>
                    <p className="text-xs font-medium text-slate-400">
                      Email
                    </p>

                    <p className="mt-1 break-all text-sm font-medium text-slate-700">
                      {selectedTicket.customer.email}
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3">
                  <Phone
                    size={16}
                    className="mt-0.5 shrink-0 text-slate-400"
                  />

                  <div>
                    <p className="text-xs font-medium text-slate-400">
                      Phone
                    </p>

                    <p className="mt-1 text-sm font-medium text-slate-700">
                      {selectedTicket.customer.phone}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Ticket Information */}
            <section>
              <h4 className="mb-4 text-sm font-bold text-slate-900">
                Ticket Information
              </h4>

              <div className="grid gap-4 sm:grid-cols-2">
                {/* Status */}
                <div className="rounded-xl border border-slate-200 p-4">
                  <p className="mb-2 text-xs font-medium text-slate-400">
                    Status
                  </p>

                  <select
                    value={selectedTicket.status}
                    onChange={handleStatusChange}
                    disabled={isUpdating}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <option value="Open">
                      Open
                    </option>

                    <option value="In Progress">
                      In Progress
                    </option>

                    <option value="Resolved">
                      Resolved
                    </option>
                  </select>

                  {isUpdating && (
                    <p className="mt-2 text-xs font-medium text-indigo-600">
                      Updating status...
                    </p>
                  )}
                </div>

                {/* Priority */}
                <div className="rounded-xl border border-slate-200 p-4">
                  <p className="mb-2 text-xs font-medium text-slate-400">
                    Priority
                  </p>

                  <PriorityBadge
                    priority={selectedTicket.priority}
                  />
                </div>

                {/* Created Date */}
                <div className="flex items-start gap-3 rounded-xl border border-slate-200 p-4 sm:col-span-2">
                  <CalendarDays
                    size={18}
                    className="mt-0.5 text-slate-400"
                  />

                  <div>
                    <p className="text-xs font-medium text-slate-400">
                      Created Date & Time
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-700">
                      {formatDateTime(
                        selectedTicket.createdAt
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Conversation */}
            <section>
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    Conversation
                  </h4>

                  <p className="mt-1 text-xs text-slate-400">
                    Previous messages
                  </p>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Clock3 size={14} />

                  {selectedTicket.messages.length} messages
                </div>
              </div>

              <div className="space-y-4">
                {selectedTicket.messages.map((message) => {
                  const isCustomer =
                    message.sender === "customer";

                  return (
                    <div
                      key={message.id}
                      className={`flex ${
                        isCustomer
                          ? "justify-start"
                          : "justify-end"
                      }`}
                    >
                      <div
                        className={`max-w-[88%] rounded-2xl p-4 ${
                          isCustomer
                            ? "rounded-tl-md bg-slate-100"
                            : "rounded-tr-md bg-indigo-600 text-white"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-4">
                          <p
                            className={`text-xs font-bold ${
                              isCustomer
                                ? "text-slate-700"
                                : "text-white"
                            }`}
                          >
                            {message.name}
                          </p>

                          <p
                            className={`text-[10px] ${
                              isCustomer
                                ? "text-slate-400"
                                : "text-indigo-200"
                            }`}
                          >
                            {formatDateTime(
                              message.timestamp
                            )}
                          </p>
                        </div>

                        <p
                          className={`mt-2 text-sm leading-6 ${
                            isCustomer
                              ? "text-slate-600"
                              : "text-indigo-50"
                          }`}
                        >
                          {message.message}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
        </div>
      </aside>
    </>
  );
}

export default TicketDetails;