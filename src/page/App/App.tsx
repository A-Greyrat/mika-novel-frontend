import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "../Home/Home.tsx";
import Test from "../Test/Test.tsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home/>,
    },
    {
        path: '/test',
        element: <Test/>,
    }
]);

const App = () => {
    return (
        <RouterProvider router={router}/>
    )
}

export default App
