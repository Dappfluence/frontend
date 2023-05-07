import {createBrowserRouter} from "react-router-dom";
import Home from "./pages/Home";
import Collaborations from "./pages/Collaborations";


const router = createBrowserRouter([
	{
		path: "/",
		element: <Home/>
	},
  {path: "/collabs", element: <Collaborations />}
])

export default router
