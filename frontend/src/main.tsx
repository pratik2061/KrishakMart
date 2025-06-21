import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { Theme } from "@radix-ui/themes";
import { authStore } from "./auth/store/authStore.ts";
import { PrimeReactProvider } from 'primereact/api';

createRoot(document.getElementById("root")!).render(
  <Provider store={authStore}>
    <Theme>
      <PrimeReactProvider>
        <App/>
      </PrimeReactProvider>
    </Theme>
  </Provider>
);
