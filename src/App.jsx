// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/home.component";
import HotelForm from "./pages/hotel-form/hotel-form.component";

function App() {
  return (
    <Routes>
      <Route path="/" index element={<Home />} />
      <Route path="/hotel-form" element={<HotelForm />} />
    </Routes>
  );
}

export default App;
