import {createBrowserRouter, RouterProvider} from "react-router-dom";
import React, {Suspense} from "react";
import LoadingPage from "../Loading/LoadingPage";

const Home = React.lazy(() => import('../Home/Home'));
const Login = React.lazy(() => import('../Login/Login'));
const Register = React.lazy(() => import('../Login/Register'));
const $404 = React.lazy(() => import('../404/404'));
const NovelPage  = React.lazy(() => import('../Novel/NovelPage'));
const NovelReader = React.lazy(() => import('../Reader/NovelReader'));
const Test = React.lazy(() => import('../Test/Test'));
const SearchPage = React.lazy(() => import('../Search/SearchPage'));
const SpacePage = React.lazy(() => import('../Space/Space'));
const CategoryPage = React.lazy(() => import('../CategoryPage/CategoryPage'));

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
        path: '/search/:keyword/:p',
        element: <SearchPage/>,
    },
    {
        path: '/space',
        element: <SpacePage/>,
    },
    {
        path: '/space/:action',
        element: <SpacePage/>,
    },
    {
        path: '/category',
        element: <CategoryPage/>,
    },
    {
        path: '*',
        element:
            <$404/>,
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
