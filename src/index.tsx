import reportWebVitals from "./reportWebVitals";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { myStore } from "./store";
import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={myStore}>
    <App />
  </Provider>
);


reportWebVitals();
