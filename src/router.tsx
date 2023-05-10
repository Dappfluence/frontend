import {createBrowserRouter} from "react-router-dom";
import Home from "./pages/Home";
import Collaborations from "./pages/Collaborations";
import Collaboration from "./pages/Collaboration";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>
  },
  {
    path: "/collabs",
    element: <Collaborations/>
  },
  {
    path: '/collabs/123',
    element: <Collaboration />
  }
])

export default router
