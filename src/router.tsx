import {createBrowserRouter, Outlet} from "react-router-dom";
import Home from "./pages/Home";
import Collaborations from "./pages/Collaborations";
import Company from "./pages/Company";
import Collaboration from "./pages/Collaboration";
import InfluencerProfile from "./pages/InfluencerProfile";
import CreateCollaboration from "./pages/CreateCollaboration";
import Header from "./widgets/Header";


const router = createBrowserRouter([
  {
    element: <><Header /> <Outlet /></>,
    children: [
      {
        path: "/",
        element: <Home/>
      },
      {path: "/company", element: <Company/>},
      {
        path: "/collaborations",
        element: <Collaborations/>
      },{
        path: "/collaboration/new",
        element: <CreateCollaboration/>
      },
      {
        path: '/collaboration/:id',
        element: <Collaboration/>
      },
      {
        path: '/me',
        element: <InfluencerProfile />
      }
    ]
  }
])

export default router
