import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./style.scss";

const Log: React.FC = () => {
  const [type, setType] = useState("reg");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  return (
    <>
      {type == "reg" && (
        <div className="reg">
            <h1>Sign Up</h1>
          <form
            className="reg_form"
            onSubmit={handleSubmit((data) => {
              console.log(data);
              reset()
            })}
          >
            <div className="reg_div">
              <label>Username</label>
              <input
                className="reg_input"
                type="text"
                {...register("username", { required: true })}
              />
            </div>
            <div className="reg_div">
              <label>Email</label>
              <input
                className="reg_input"
                type="email"
                {...register("email", { required: true })}
              />
            </div>
            <div className="reg_div">
              <label>Password</label>
              <input
                className="reg_input"
                type="password"
                {...register("password", { required: true })}
              />
            </div>
            <div className="reg_div">
              <label>Confirm Password</label>
              <input
                className="reg_input"
                type="password"
                {...register("confirm", { required: true })}
              />
            </div>
            <button className="reg_btn">Sign Up</button>
          </form>
          <p
            className="type"
            onClick={() => {
              setType("log");
            }}
          >
            Log In
          </p>
        </div>
      )}
      {type == "log" && (
        <div className="reg">
            <h1>Log In</h1>
          <form
            className="reg_form"
            onSubmit={handleSubmit((data) => {
                if(type=="log") {
                    delete data.confirm
                    delete data.email
                }                
              console.log(data);
              reset()
            })}
          >
            <div className="reg_div">
              <label>Username</label>
              <input
                className="reg_input"
                type="text"
                {...register("username", { required: true })}
              />
            </div>
            <div className="reg_div">
              <label>password</label>
              <input
                className="reg_input"
                type="password"
                {...register("password", { required: true })}
              />
            </div>
            <button className="reg_btn">Log In</button>
          </form>
          <p
            className="type"
            onClick={() => {
              setType("reg");
            }}
          >
            Sign Up
          </p>
        </div>
      )}
    </>
  );
};

export default Log;
