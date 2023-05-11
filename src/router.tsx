import {createBrowserRouter} from "react-router-dom";
import Home from "./pages/Home";
import Collaborations from "./pages/Collaborations";
import Company from "./pages/Company";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>
  },
  {path: "/collabs", element: <Collaborations/>},
  {path: "/company", element: <Company/>}
])

export default router
