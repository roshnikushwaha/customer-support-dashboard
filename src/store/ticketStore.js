import { create } from "zustand";
import {
  fetchTickets,
  updateTicketStatus as updateTicketStatusApi,
} from "../services/ticketApi";

const useTicketStore = create((set) => ({
  tickets: [],
  loading: false,
  error: null,

  searchQuery: "",
  statusFilter: "All",
  priorityFilter: "All",

  selectedTicket: null,

  updatingTicketId: null,
  statusUpdateError: null,

  setSearchQuery: (searchQuery) => {
    set({ searchQuery });
  },

  setStatusFilter: (statusFilter) => {
    set({ statusFilter });
  },

  setPriorityFilter: (priorityFilter) => {
    set({ priorityFilter });
  },

  setSelectedTicket: (ticket) => {
    set({ selectedTicket: ticket });
  },

  closeTicketDetails: () => {
    set({ selectedTicket: null });
  },

  setTickets: (tickets) => {
    set({ tickets });
  },

  setLoading: (loading) => {
    set({ loading });
  },

  setError: (error) => {
    set({ error });
  },

  loadTickets: async () => {
    try {
      set({
        loading: true,
        error: null,
      });

      const data = await fetchTickets();

      set({
        tickets: data,
      });
    } catch (error) {
      set({
        error: error.message || "Unable to load tickets.",
      });
    } finally {
      set({
        loading: false,
      });
    }
  },

  updateTicketStatus: async (ticketId, newStatus) => {
    try {
      set({
        updatingTicketId: ticketId,
        statusUpdateError: null,
      });

      const updatedTicket = await updateTicketStatusApi(
        ticketId,
        newStatus
      );

      set((state) => ({
        tickets: state.tickets.map((ticket) =>
          ticket.id === ticketId
            ? updatedTicket
            : ticket
        ),

        selectedTicket:
          state.selectedTicket?.id === ticketId
            ? updatedTicket
            : state.selectedTicket,

        updatingTicketId: null,
      }));
    } catch (error) {
      set({
        updatingTicketId: null,
        statusUpdateError:
          error.message || "Failed to update ticket status.",
      });
    }
  },
}));

export default useTicketStore;