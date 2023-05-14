import {createBrowserRouter, Outlet} from "react-router-dom";
import Home from "./pages/Home";
import Collaborations from "./pages/Collaborations";
import Brand from "./pages/Brand";
import Collaboration from "./pages/Collaboration";
import InfluencerProfile from "./pages/InfluencerProfile";
import CreateCollaboration from "./pages/CreateCollaboration";
import Header from "./widgets/Header";
import {MyProfile} from "./pages/MyProfile";


const router = createBrowserRouter([
  {
    element: <><Header/> <Outlet/></>,
    children: [
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/brand/:address",
        element: <Brand/>
      },
      {
        path: "/collaborations",
        element: <Collaborations/>
      }, {
        path: "/collaboration/new",
        element: <CreateCollaboration/>
      },
      {
        path: '/collaboration/:id',
        element: <Collaboration/>
      },
      {
        path: '/me',
        element: <MyProfile/>,
      }
    ]
  }
])

export default router
