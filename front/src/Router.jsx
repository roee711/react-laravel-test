import {createBrowserRouter} from 'react-router-dom';
import Login from './views/auth/Login'
import Register from './views/auth/Register'
import Users from './views/auth/Users'
import Tasks from './views/task/Tasks'
import UserFrom from './views/auth/UserFrom'
import TaskFrom from './views/task/TaskFrom'
import GuestLayout from './components/GuestLayout'
import AuthenticatedLayout from './components/AuthenticatedLayout'

const router = createBrowserRouter ([
    {
        path: '/',
        element: <AuthenticatedLayout />,
        children: [
            {
                path: '/tasks',
                element: <Tasks />,
            },
            {
                path: '/users',
                element: <Users />,
            },
            {
                path: '/users/new',
                element: <UserFrom key="userCreate"/>
            },
            {
                path: '/users/:id',
                element: <UserFrom key="userUpdate" />
            },
            {
                path: '/tasks/new',
                element: <TaskFrom key="taskCreate"/>
            },
            {
                path: '/tasks/:id',
                element: <TaskFrom key="taskUpdate" />
            },
        ]
    },

    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: '/login',
                element: <Login />,
            },
            {
                path: '/register',
                element:  <Register />,
            }
        ]
    },
]);

export default router;