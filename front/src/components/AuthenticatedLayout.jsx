import {Outlet, Navigate, Link} from "react-router-dom";
import {useStateContext} from "../contexts/contextprovider";
import axiosClient from "../axiosClient";
import {useEffect} from "react";

function AuthenticatedLayout(){
    const {user, token ,setUser, setToken} = useStateContext();
    if(!token){
        return <Navigate to='/login'/>
    }
    useEffect(() => {
        axiosClient.get('/user')
            .then(({data}) => {
                setUser(data)
            })
    }, [])
    const onLogout =  (e) =>{
        e.preventDefault();
        axiosClient.get('/logout')
            .then(({}) => {
                setUser(null)
                setToken(null)
            })
    }

    return (
        <div id='authenticatedLayout'>
            <div className='content'>
                <header>
                    <div>
                        AuthenticatedLayout
                    </div>
                    <div className='menu'>
                        {/*{JSON.stringify(user)}*/}
                        <li> <Link  to="/tasks/">Tasks</Link></li>
                        { typeof  user.rule !== 'undefined' && user.rule.title ==="admin" &&
                        <li> <Link  to="/Users/">Users</Link></li>
                        }
                        <li className='user-current'> user: ( {user.name} )</li>
                        <li><Link to='#' onClick={onLogout} className='btn-edit'>LogOut </Link></li>

                    </div>
                </header>
                <main>
                    <Outlet />
                </main>
            </div>



        </div>
    );
}
export  default  AuthenticatedLayout