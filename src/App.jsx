import Home from "./screens/Home";
import Login from "./screens/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import Signup from "./screens/Signup.jsx";
import { CartProvider } from "./components/ContextReducer.jsx";
import MyOrder from "./screens/MyOrder.jsx";

function App() {

  return (
    <>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/myOrder" element={<MyOrder />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </>
  )
}

export default App
