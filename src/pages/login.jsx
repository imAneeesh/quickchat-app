import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";


const Login = () => {
    const [err, setErr] = useState(false);
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const email = e.target[0].value;
      const password = e.target[1].value;
  
      try {
        await signInWithEmailAndPassword(auth, email, password);
        navigate("/")
      } catch (err) {
        setErr(true);
      }
    };

    return (
        <div className="formContainer">
            <div className="formWrapper">
                <div className="texts">
                    <span className="logo-text">Quick Chat</span>
                    <span className="form-text">Login</span></div>
                <form onSubmit={handleSubmit} action="">
                    <input className="inputs" type="email" name="email" id="email" placeholder="jhone.doe@quickchat.com" />
                    <input className="inputs" type="password" name="password" id="password" placeholder="**********" />
                    <div className="myBtn">
                        <input className="btn" type="submit" value="Sign in" />
                        <p>Don't have an Account? <a href="../register">Register</a></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login