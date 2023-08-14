import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Toners from "./components/Toners/TonerGET/Toners";
import ServicesGet from "./components/Service/ServiceGet/ServicesGet";
import UserGet from "./components/User/User";
import Carga from "./components/Carga/Carga";
import ServicesPost from "./components/Service/ServicePost/ServicePost";
import TonerPOST from "./components/Toners/TonerPOST/TonerPOST";
import TonerID from "./components/Toners/TonerGET/TonerID";
import TonerDELETE from "./components/Toners/TonerDELETE/TonerDELETE";
import TonerPUT from "./components/Toners/TonerPUT/TonerPUT";
import TonerPage from "./components/Toners/TonerPages/TonerPages";
import '@fortawesome/fontawesome-svg-core/styles.css';
import UsersList from "./components/Login/Users/UsersList";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const App = () => {
  const router = createBrowserRouter([
    {
      path: "/login", element: <Login />
    },
    {
      path: "/usersList", element: <UsersList />
    },
    {
      path: "/", element: (
        <>
          <Carga />
          <ToastContainer />
        </>
      )
    },
    {
      path: "/home", element: <Home/>
    },
    { 
      path: "/login", element: <Login />
    },
    {
      path: "/toners", element: <Toners />
    },
    {
      path: "/addToner", element: <TonerPOST />
    },
    {
      path: "/editToner/:id", element: <TonerPUT />
    },
    {
      path: "/tonerList", element: <TonerPage />
    },
    {
      path: "/services", element: <ServicesGet />
    },
    {
      path: "/users", element: <UserGet />
    },
    {
      path: "/carga", element: <Carga />
    },
    {
      path: "/addService", element: <ServicesPost />
    }
  ])
  return( 
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}



export default App;
