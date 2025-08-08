import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { appStore } from "./app/store";
import { Toaster } from "sonner";
import { ThemeProvider } from "./components/theme-provider";
import { useLoadUserQuery } from "./features/api/authApi";
import LoadingSpinner from "./components/ui/LoadingSpinner";

// eslint-disable-next-line react-refresh/only-export-components
const Custom = ({ children }) => {
  const { isLoading } = useLoadUserQuery();
  return <>{isLoading ? <LoadingSpinner/> : <>{children}</>}</>;
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <Provider store={appStore}>
        <Custom>
          <App />
        </Custom>
        <Toaster />
      </Provider>
    </ThemeProvider>
  </StrictMode>
);

