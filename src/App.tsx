import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import ToDo from "./pages/Home";
import Log from "./pages/login";
import Invite from "./pages/Invite";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<ToDo />} />
          <Route path="/log" element={<Log />} />
          <Route path="/inviteUser" element={<Invite />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
