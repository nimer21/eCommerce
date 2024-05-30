import React from "react";
import "./Login.css";
import { assets } from "../../assets/assets";
import { useState, useContext } from "react";
import { object, string } from "yup";
import axios from "axios";
import { Slide, Zoom, Flip, Bounce ,toast } from 'react-toastify';
import {useNavigate} from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { UserContext } from "../../context/User";


export const Login = ({ setShowLogin }) => {
  const {setUserToken} = useContext(UserContext);
  const navigate = useNavigate();
  const [currState, setCurrentState] = useState("Login");
  const [loader,setLoader] = useState(false);
  /******************************************************************************** */
  const [user, setUser] = useState({
    userName: "",
    email: "",
    password: "",
    image: "",
  });

  const [errors, setErrors] = useState([]);
  const handelChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handelImageChange = (e) => {
    const { name, files } = e.target;
    setUser({
      ...user,
      [name]: files[0],
    });
  };

  const validateData = async () => {
    //if (user.userName < 5) return false;
    const RegisterSchema = object({
      userName: string().min(5).required(),
      email: string().email().required(),
      password: string().min(5).required(),
      image: string().required(),
    });

    const LoginSchema = object({
      email: string().email().required(),
      password: string().min(5).required(),
    });

    try {
      if (currState === "Login") {
        await LoginSchema.validate(user, { abortEarly: false });
        return true;
      }
      if (currState === "Sign Up") {
        await RegisterSchema.validate(user, { abortEarly: false });
        return true;
      }
    } catch (e) {
      //console.log("Validation Error", e.errors);
      setErrors(e.errors);
      setLoader(false);
      return false;
    }
  };

  const handelSubmit = async (e) => {
    e.preventDefault();    
    setLoader(true);  
//    currState === "Login" ? (console.log("Login Tiger")) : (console.log("Sign Up Tiger"));
if (currState === "Sign Up"){
  if(await validateData()){
  if (!validateData()) {
    return false;
  }
    const formData = new FormData();
    formData.append("userName", user.userName);
    formData.append("email", user.email);
    formData.append("password", user.password);
    formData.append("image", user.image);
    //console.log(formData);
try{
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}/auth/signup`,
      formData
    );
    setUser({
      userName: "",
      email: "",
      password: "",
      image: "",
    });
    //console.log(data);
    //alert("Register Successfully");
    if(data.message=='success'){
      setShowLogin(false);
      //toast("Register Successfully");
      toast.success('Account Created Successfully', {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Zoom,
        });
      //navigate('/');
      setCurrentState('Login');
      setShowLogin(true);
    }
  }catch(e){
    //console.log("Validation Error",e.response);
    //setErrors(e.errors);
    //return false;

    if(e.response.status === 409){
      toast.error('🦄 '+e.response.data.message, {
        position: "bottom-center",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Flip,
        });
    }
  }
  finally{
    setLoader(false);
  }
}
}else if(currState ==="Login"){
  if(await validateData()){
    if (!validateData()) {
      return false;
    }
  try{
  const { data } = await axios.post(
    `${import.meta.env.VITE_API_URL}/auth/signin`,
    {
      email:user.email,password:user.password  
      //JSON.stringify(user) // in case of fetch but axios convert it automatically    
    }
  );
  setUser({
    email: "",
    password: "",
  });
    //alert("Register Successfully");
    //localStorage.setItem('userTooken', data.token);
    //console.log(data);
    if(data.message=='success'){
      setShowLogin(false);
      //toast("Login Successfully");
      toast.success('Login Successfully', {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
        });
        //console.log('Data from Login: '+data.token);
        localStorage.setItem('userToken', data.token);
        setUserToken(data.token);
        //console.log(jwtDecode(data.token));
        //console.log('From Login Log: '+localStorage.getItem('userToken'));
      navigate('/');
}
}catch(e){
  if(e.response.status === 400){
    toast.error('🦄 '+e.response.data.message, {
      position: "bottom-center",
      autoClose: false,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Flip,
      });
  }
  if(e.response.status === 404){
    toast.error('🦄 '+e.response.data.message, {
      position: "bottom-center",
      autoClose: false,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Flip,
      });
  }
}
finally{
  setLoader(false);
}
  }
};
};
  /****************************************************************************** */
  return (
    <>
      <h2>{currState}</h2>
      {errors.length > 0 ? errors.map((error) => <p>{error}</p>) : ""}
      <div className="login">
        <form onSubmit={handelSubmit} action="" className="login-container">
          <div className="login-title">
            <h2>{currState}</h2>
            <img
              onClick={() => setShowLogin(false)}
              src={assets.cross_icon}
              alt=""
            />
          </div>
          <div className="login-inputs">
            {currState === "Login" ? (
              <></>
            ) : (
              <>
                <input
                  type="text"
                  value={user.userName}
                  name="userName"
                  onChange={handelChange}
                  placeholder="Your name"
                  required
                />
              </>
            )}
            <label>email</label>
            <input
              type="email"
              value={user.email}
              name="email"
              onChange={handelChange}
              placeholder="Your email"
              required
            />

            <label>password</label>
            <input
              type="password"
              value={user.password}
              name="password"
              onChange={handelChange}
              placeholder="Password"
              required
            />
         

          {currState === "Login" ? (
              <></>
            ) : (
              <>                
                <label>Image</label>
                <input
                  type="file"
                  name="image"
                  onChange={handelImageChange}
                ></input>
              </>
            )}
             </div>

          <button className="btn btn-outline-success" disabled={loader?'disabled':null} type="submit">
            {currState === "Sign Up" ? "Create account " : "Login"}
            {!loader?null:', wait....'}
          </button>

          <div className="login-condition">
            <input type="checkbox" required />
            <p>By continuing, i agree to the terms of use & privacy policy</p>
          </div>
          {currState === "Login" ? (
            <p>
              Create a new account?{" "}
              <span onClick={() => setCurrentState("Sign Up")}>Click here</span>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <span onClick={() => setCurrentState("Login")}>Login here</span>
            </p>
          )}
        </form>
      </div>
    </>
  );

}
export default Login;
