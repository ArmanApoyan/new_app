import reportWebVitals from "./reportWebVitals";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { myStore } from "./store";
import App from "./App";
import "./index.css";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

Sentry.init({
  dsn: "https://3dc656afb31a4eb3b8bfacdf0f6f2e01@o1315454.ingest.sentry.io/6567288",
  integrations: [new BrowserTracing()],
  tracesSampleRate: 0,
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={myStore}>
    <App />
  </Provider>
);


reportWebVitals();
