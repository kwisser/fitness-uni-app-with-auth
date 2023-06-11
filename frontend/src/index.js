import ReactDOM from "react-dom/client";
import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Exercises from "./pages/Exercises";
import Food from "./pages/Food";
import NoPage from "./pages/NoPage";
import Register from "./pages/Register/Register";
import Logout from "./components/Logout";
import CalendarOverview from "./pages/Calendar/CalendarOverview";
import Day from "./pages/Day";
import Profiles from "./pages/Profiles";
import AddExercise from "./components/Exercises/AddExercise";
import AddFood from "./components/Food/AddFood";
import FoodEdit from "./components/Food/FoodEdit";
import AddProfile from "./components/Profile/AddProfile";

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="exercises" element={<Exercises />} />
          <Route path="exercises/:id" element={<Exercises />} />
          <Route path="exercises/add" element={<AddExercise />} />
          <Route path="food" element={<Food />} />
          <Route path="food/add" element={<AddFood />} />
          <Route path="food/edit/:id" element={<FoodEdit />} />
          <Route path="login" element={<Login />} />
          <Route path="calendar" element={<CalendarOverview />} />
          <Route path="day" element={<Day />} />
          <Route path="profiles" element={<Profiles />} />
          <Route path="profiles/add" element={<AddProfile />} />
          <Route path="profiles/:id" element={<Profiles />} />
          <Route path="register" element={<Register />} />
          <Route path="logout" element={<Logout />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Provider store={store}>
  <App />
</Provider>);