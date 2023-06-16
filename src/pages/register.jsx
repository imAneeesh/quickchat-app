import React, { useState } from "react";
import Add from "../assets/addAvatar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e.target[0].value)
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      //Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          } catch (err) {
            console.log(err);
            setErr(true);
          }
        });
      });
    } catch (err) {
      setErr(true);
    }
  };

    return (
        <div className="formContainer">
            <div className="formWrapper">
                <div className="texts">
                    <span className="logo-text">Quick Chat</span>
                    <span className="form-text">Register</span></div>

                <form onSubmit={handleSubmit}>
                    <input className="inputs" type="text" name="name" id="name" placeholder="Jhone Doe" />
                    <input className="inputs" type="email" name="email" id="email" placeholder="jhone.doe@quickchat.com" />
                    <input className="inputs" type="password" name="password" id="password" placeholder="**********" />
                    <input style={{ display: "none" }} type="file" id="file" name="file" placeholder="" />
                    <label htmlFor="file">
                        <img src={Add} alt="" />
                        <span>Add Avatar</span>
                    </label>
                    <div className="myBtn">
                        <button className="btn"> Sign up </button>
                        {err && <span>Somthing went wrong </span>}
                        <p>Account already exists? <a href="../login">Login</a></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register