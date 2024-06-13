
import {useRef, useState} from "react";
import {Link, useNavigate } from "react-router-dom";
 import axiosClient from "../../axiosClient";
import { useStateContext } from "../../contexts/contextprovider";

function Login(){

    const emailRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();
    const {setUser, setToken} = useStateContext();
    const [errors, setErrors] = useState(null);
    const [disableOrder ,setDisableOrder]  =useState(0);
    const Submit =  (e) =>{

        e.preventDefault();
        setDisableOrder(1)
        setErrors("")
        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }
        axiosClient.post("/login",payload).then(({data})=>{

            setDisableOrder(0)
            if(data.user && data.token ){
                setUser(data.user);
                setToken(data.token);
                return navigate("/tasks");
            }else{
                setErrors(data);
            }
        }).catch(err => {
            setDisableOrder(0)
            const response = err.response;
            if(response && response.status === 422){
                setErrors(response.data.errors);

            }

        });
    }
    return(
        <div className="login-signup-form animated fadeinDown">



            <div className="form">
                {errors &&
                <div className="alert">
                    {Object.keys(errors).map(key => (
                        <p key={key}>{errors[key]}</p>
                    ))}
                </div>
                }
                <h1 className="title">
                    Login To Your Account
                </h1>
                <form onSubmit={Submit}>
                    <input ref={emailRef} type="email" placeholder="Email" />
                    <input ref={passwordRef} type="password" placeholder="Password" />
                    <button disabled={disableOrder} className="btn btn-block">Login</button>
                    <p className="message">
                        Not Registered? <Link to= '/register'>Create a new account</Link>
                    </p>
                </form>
            </div>
        </div>

    )
}
export default Login