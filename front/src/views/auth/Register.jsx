import {useRef, useState} from "react";
import { Link } from "react-router-dom";
import axiosClient from "../../axiosClient";
import { useStateContext } from "../../contexts/contextprovider";

function Register(){

    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const [errors, setErrors] = useState(null);
    const {setUser, setToken} = useStateContext();
    const [disableOrder ,setDisableOrder]  =useState(0);
    const Submit =  (e) =>{
        e.preventDefault();
        setDisableOrder(1)
        setErrors("")
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }
        axiosClient.post("/register",payload).then(({data})=>{
            setDisableOrder(0)
            if(data.user && data.token){
                setUser(data.user);
                setToken(data.token);
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
                    Create A New Account
                </h1>
                <form onSubmit={Submit}>
                    <input ref={nameRef} type="name" placeholder="Name" />
                    <input ref={emailRef} type="email" placeholder="Email" />
                    <input ref={passwordRef} type="password" placeholder="Password" />
                    <button disabled={disableOrder} className="btn btn-block">Register</button>
                    <p className="message">
                        Already Have An Account? <Link to= '/login'>Login</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}
export default Register