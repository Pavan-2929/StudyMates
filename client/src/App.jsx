import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import Profile from "./pages/Profile";
import Doubts from "./pages/Doubts";
import SingleDoubt from "./pages/SingleDoubt";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/doubts" element={<Doubts/>} />
          <Route path="/doubts/:id" element={<SingleDoubt/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
