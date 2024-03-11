import {createBrowserRouter, RouterProvider} from "react-router-dom";
import React, {Suspense} from "react";
import LoadingPage from "../Loading/LoadingPage";

const Home = React.lazy(() => import('../Home/Home.tsx'));
const Login = React.lazy(() => import('../Login/Login.tsx'));
const Register = React.lazy(() => import('../Login/Register.tsx'));
const $404 = React.lazy(() => import('../404/404.tsx'));
const NovelPage = React.lazy(() => import('../Novel/NovelPage.tsx'));
const NovelReader = React.lazy(() => import('../Reader/NovelReader.tsx'));
const Test = React.lazy(() => import('../Test/Test.tsx'));
const SearchPage = React.lazy(() => import('../Search/SearchPage.tsx'));

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home/>,
    },
    {
        path: '/login',
        element: <Login/>,
    },
    {
        path: '/register',
        element: <Register/>,
    },
    {
        path: '/novel/:novelId',
        element: <NovelPage/>,
    },
    {
        path: '/novel/:novelId/:volumeId/:chapterId',
        element: <NovelReader/>,
    },
    {
        path: '/search/:keyword',
        element: <SearchPage/>,
    },
    {
        path: '/test',
        element: <Test/>,
    },
    {
        path: '*',
        element:
            <$404/>,
    },
]);

const App = () => {
    return (
        <Suspense fallback={<LoadingPage/>}>
            <RouterProvider router={router}/>
        </Suspense>
    )
};

export default App
