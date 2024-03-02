import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "../Home/Home.tsx";
import Login from "../Login/Login.tsx";
import Register from "../Login/Register.tsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home/>,
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/register',
        element: <Register/>,
    }
]);

const App = () => {
    return (
        <RouterProvider router={router}/>
    )
}

export default App
