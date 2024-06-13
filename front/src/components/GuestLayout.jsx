import {Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../contexts/contextprovider";
function GuestLayout(){
    const { token} = useStateContext();
    if(token){
        return <Navigate to='/'/>
    }
    return (
        <div id='guestLayout'>

             <Outlet />
        </div>
    );
}
export  default  GuestLayout