import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Layout from "../Layout/Layout";
import CreateTask from "../Pages/CreateTask/CreateTask";
import ViewTask from "../Pages/ViewTask/ViewTask";
import EditTask from "../Pages/ViewTask/EditTask/EditTask";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout></Layout>,
      children: [
        {
            path: "/",
            element: <ViewTask></ViewTask>
        },
        {
            path: "/create-task",
            element: <CreateTask></CreateTask>
        },
        {
          path: "/edit-task/:id",
          element: <EditTask></EditTask>
        }
      ]
    },
  ]);

export default router;