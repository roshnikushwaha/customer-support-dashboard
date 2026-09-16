import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import TicketDetails from "./components/TicketDetails";
import useTicketStore from "./store/ticketStore";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const loadTickets = useTicketStore(
    (state) => state.loadTickets
  );

  useEffect(() => {
    loadTickets();
  }, [loadTickets]);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex min-h-screen">
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <div className="min-w-0 flex-1">
          <Header
            onMenuClick={() => setSidebarOpen(true)}
          />

          <Dashboard />
        </div>
      </div>

      <TicketDetails />
    </div>
  );
}

export default App;