const API_URL = "/api/tickets";

export const fetchTickets = async () => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch tickets");
  }

  return response.json();
};

export const updateTicketStatus = async (ticketId, status) => {
  const response = await fetch(`${API_URL}/${ticketId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      status,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to update ticket status");
  }

  return response.json();
};