import { BrowserRouter } from "react-router-dom";
import RouteComponent from "./pages";
import { ToastProvider } from "@heroui/react";

function App() {
  return (
    <BrowserRouter>
      <RouteComponent />
      <ToastProvider placement="top-right" />
    </BrowserRouter>
  );
}

export default App;
