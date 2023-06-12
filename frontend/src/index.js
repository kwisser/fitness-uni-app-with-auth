import ReactDOM from "react-dom/client";
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import { AuthProvider } from './AuthContext';

import Layout from "./components/Layout/Layout";
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Exercises from "./pages/Exercises";
import Food from "./pages/Food";
import NoPage from "./pages/NoPage";
import Register from "./pages/Register/Register";
import Logout from "./pages/Auth/Logout";
import CalendarOverview from "./pages/Calendar/CalendarOverview";
import Day from "./pages/Day";
import Profiles from "./pages/Profiles";
import AddExercise from "./components/FitnessExercises/AddExercise";
import AddFood from "./components/Food/AddFood";
import FoodEdit from "./components/Food/FoodEdit";
import AddProfile from "./components/FitnessProfile/AddProfile";

import store from './store';

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
root.render(
  <AuthProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </AuthProvider>
);