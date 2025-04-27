import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import Profile from "./pages/Profile";
import Doubts from "./pages/Doubts";
import SingleDoubt from "./pages/SingleDoubt";
import Activity from "./pages/Activity";
import SingleActivity from "./pages/SingleActivity";
import Admin from "./pages/Admin";
import Footer from "./components/Footer";
import Chatboat from "./pages/Chatboat";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/doubts" element={<Doubts />} />
          <Route path="/doubts/:id" element={<SingleDoubt />} />
          <Route path="/activity" element={<Activity />} />
          <Route path="/activity/:id" element={<SingleActivity />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/chatboat" element={<Chatboat />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
