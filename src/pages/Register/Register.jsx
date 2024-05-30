import React from "react";
import "./Register.css";
import { useState } from "react";
import { object, string } from 'yup';

export default function Register() {
  const [user, setUser] = useState({
    userName: "",
    email: "",
    password: "",
    image: "",
  });

  const [errors,setErrors] = useState([]);
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

  const validateData = async() => {
    //if (user.userName < 5) return false;
    const RegisyerSchema = object({
        userName: string().min(5).required(),
        email: string().email().required(),
        password: string().min(5).required(),
        image: string().required(),
    })
    try{
        await RegisyerSchema.validate(user, { abortEarly: false });
        return true;
    }catch(e){
        console.log("Validation Error",e.errors);
        setErrors(e.errors);
        return false;
    }
  };
  const handelSubmit = async (e) => {
    e.preventDefault();
    //const validate = await validateData();
    //console.log(validate);
    if(await validateData()){
    if (!validateData()) {
      console.log("error");
      return false;
    }
    const formData = new FormData();
    formData.append("userName", user.userName);
    formData.append("email", user.email);
    formData.append("password", user.password);
    formData.append("image", user.image);
    console.log(formData);

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
    console.log(data);
    alert("Register Successfully");
}
  };

  return (
    <>
      <h2>Register</h2>
      {errors.length > 0?errors.map(error=>
        <p>{error}</p>
      ):''}
      <form onSubmit={handelSubmit}>
      <div className="login-inputs">
        <label>user Name</label>
        <input
          type="text"
          className="form-control"
          value={user.userName}
          name="userName"
          onChange={handelChange}
        ></input>

        <label>email</label>
        <input
          type="email"
          value={user.email}
          name="email"
          onChange={handelChange}
        ></input>

        <label>password</label>
        <input
          type="password"
          value={user.password}
          name="password"
          onChange={handelChange}
        ></input>

        <label>Image</label>
        <input type="file" name="image" onChange={handelImageChange}></input>
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
