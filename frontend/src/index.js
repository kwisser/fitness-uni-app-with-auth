import ReactDOM from "react-dom/client";
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import { AuthProvider } from './AuthContext';

import App from "./App";
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Exercises from "./pages/Exercises";
import Food from "./pages/Food";
import NoPage from "./pages/NoPage";
import Register from "./pages/Auth/Register/Register";
import Logout from "./pages/Auth/Logout";
import CalendarOverview from "./pages/Calendar/CalendarOverview";
import Day from "./pages/Day";
import Profiles from "./pages/Profiles";
import AddExercise from "./components/FitnessExercises/AddExercise";
import AddFood from "./components/FitnessFood/AddFood";
import FoodEdit from "./components/FitnessFood/FoodEdit";
import AddProfile from "./components/FitnessProfile/AddProfile";

import store from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
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
    </Provider>
  </AuthProvider>
);