import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { Theme } from "@radix-ui/themes";
import { authStore } from "./auth/store/authStore.ts";

createRoot(document.getElementById("root")!).render(
  <Provider store={authStore}>
    <Theme>
      <App />
    </Theme>
  </Provider>
);
