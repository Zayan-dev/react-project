import { BrowserRouter } from "react-router-dom";
import RouteComponent from "./pages";
import { ToastProvider } from "@heroui/react";
import { AuthProvider } from "./contexts/AuthContext";
import { QueryProvider } from "./providers/QueryProvider";

function App() {
  return (
    <QueryProvider>
      <AuthProvider>
        <BrowserRouter>
          <RouteComponent />
          <ToastProvider placement="top-right" />
        </BrowserRouter>
      </AuthProvider>
    </QueryProvider>
  );
}

export default App;
