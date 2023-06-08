import { auth, firestore } from '../Config/Firebaseconfig';
import '../Componets/Allcss.css';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore'; 

const Register = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: ""
  });

  const { name, email, password } = values;
  const [field, setField] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (name === "" || email === "" || password === "") {
      setField(true);
      return;
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then(async (res) => {
          const user = res.user;
          await updateProfile(user, {
            displayName: name
          });

         
          const userDocRef = doc(firestore, "users", user.uid);
          const userData = {
            displayName: name,
            email: user.email
          };
          await setDoc(userDocRef, userData);

          console.log(user);
          alert("Register successfully");
          navigate('/');
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      <section id="main-register">
        <div className='register'>
          <h2>Register</h2>
          <form onSubmit={handleRegister}>
            <label>Name</label><br/>
            <input
              type="text"
              placeholder="Display Name"
              value={name}
              onChange={(e) => setValues({ ...values, name: e.target.value })}
              autoComplete="off"
            /><br/>
            <label>Email</label><br/>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setValues({ ...values, email: e.target.value })}
              autoComplete="off"
            /><br/>
            <label>Password</label><br/>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setValues({ ...values, password: e.target.value })}
              autoComplete="off"
            /><br/>
            <br/>
            <button type="submit" id="register-btn">Register</button>
            <br/>
            <br/>
            <NavLink to="/">
              <button type='button' id="login-btn">Login!</button>
            </NavLink>
            <br/>
            <br/>
            {field && <h6>Please fill in all fields</h6>}
          </form>
        </div>
      </section>
    </>
  );
};

export default Register;
