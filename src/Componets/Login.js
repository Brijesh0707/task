import React, { useState } from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../Config/Firebaseconfig';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import '../Componets/Allcss.css';

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: ""
  });

  const { email, password } = values;
  const [field, setField] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
      setField(true);
      return;
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((res) => {
          alert("Login successfully");
          navigate('/task');
        })
        .catch((err) => {
          console.log(err);
          alert("Email and password not found");
        });
    }
  };

  return (
    <>
      <section id="main1">
        <div className="container justify-content-center" id='main2'>
          <div className="row text-center" id="login1">
            <div className="col-md-10 mt-5" id="login">
              <h1>LOGIN</h1>
              <form onSubmit={handleLogin}>
                <label id="email">Email:</label><br/>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setValues({ ...values, email: e.target.value })}
                /><br/>
                <label>Password</label><br/>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setValues({ ...values, password: e.target.value })}
                /><br/>
                <br/>
                <button type="submit" id="loginbtn">Login</button>
                <br/>
                <br/>
                <NavLink to="/register">
                  <button id="register01">Don't have an account? Click here!</button>
                </NavLink>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
