import React, { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { recover, userLog, userReg } from "../../store/User/action";
import env from "react-dotenv";
import "./style.scss";
import { axiosRecaptcha } from "../../config/axios";

const Log: React.FC = () => {
  const SITE_KEY = "6LdcD-ogAAAAAD8jzXuJd4EtS4DMiDHVqA3wKnQv"
  const SECRET_KEY = "6LdcD-ogAAAAAOzeqrs4h6YBLiq3imJI7de1PGDp"
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [type, setType] = useState("log");
  const [captcha, setCaptcha] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onChange = async (value:any) =>{
    const res = await axiosRecaptcha("/recaptcha",`https://www.google.com/recaptcha/api/siteverify?secret=${SECRET_KEY}&response=${value}`)
    if(res.response){
      setCaptcha(true)
    }
  }
  return (
    <>
      {type == "reg" && (
        <div className="reg">
          <h1>Sign Up</h1>
          <form
            className="reg_form"
            onSubmit={handleSubmit((data) => {
              if(captcha){
                userReg(data);
                setType("log");
                reset();
              }
            })}
          >
            <div className="reg_div">
              <label>Organization</label>
              <input
                className="reg_input"
                type="text"
                {...register("organization", { required: true })}
              />
              {errors.organization && (
                <p className="error">Organization name is required</p>
              )}
            </div>
            <div className="reg_div">
              <label>Username</label>
              <input
                className="reg_input"
                type="text"
                {...register("username", { required: true, minLength: 3 })}
              />
              {errors.username && (
                <p className="error">Username is not correct</p>
              )}
            </div>
            <div className="reg_div">
              <label>Email</label>
              <input
                className="reg_input"
                type="email"
                {...register("email", { required: true })}
              />
              {errors.email && <p className="error">Email is not correct</p>}
            </div>
            <div className="reg_div">
              <label>Password</label>
              <input
                className="reg_input"
                type="password"
                {...register("password", { required: true, minLength: 6 })}
              />
              {errors.password && (
                <p className="error">Password is not correct</p>
              )}
            </div>
            <div className="reg_div">
              <label>Confirm Password</label>
              <input
                className="reg_input"
                type="password"
                {...register("confirm", { required: true, minLength: 6 })}
              />
              {errors.confirm && (
                <p className="error">Confirm Password is not correct</p>
              )}
            </div>

            <ReCAPTCHA
              theme="dark"
              sitekey={SITE_KEY}
              onChange={onChange}
            />
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
              if (type == "log") {
                delete data.confirm;
                delete data.email;
              }
              // @ts-ignore
              dispatch(userLog(data));
              setTimeout(() => {
                navigate("/");
              }, 500);
              reset();
            })}
          >
            <div className="reg_div">
              <label>Username</label>
              <input
                className="reg_input"
                type="text"
                {...register("username", { required: true, minLength: 3 })}
              />
              {errors.username && (
                <p className="error">Username is not correct</p>
              )}
            </div>
            <div className="reg_div">
              <label>password</label>
              <input
                className="reg_input"
                type="password"
                {...register("password", { required: true, minLength: 6 })}
              />
              {errors.password && (
                <p className="error">Password is not correct</p>
              )}
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
          <p
            className="type"
            onClick={() => {
              setType("recover");
            }}
          >
            Forgot Password?
          </p>
        </div>
      )}
      {type == "recover" && (
        <div className="reg">
          <h1>Recover Password</h1>
          <form
            className="reg_form"
            onSubmit={handleSubmit((data) => {
              console.log(data);
              recover(data);
              delete data.confirm;
              delete data.organization;
              delete data.password;
              delete data.username;
              alert("Email for password recavery sent to your email");
              reset();
            })}
          >
            <div className="reg_div">
              <label>Email</label>
              <input
                className="reg_input"
                type="email"
                {...register("email", { required: true, minLength: 3 })}
              />
              {errors.emai && <p className="error">Email is not correct</p>}
            </div>
            <button className="reg_btn">Continue</button>
          </form>
          <p
            className="type"
            onClick={() => {
              setType("reg");
            }}
          >
            Sign Up
          </p>
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
    </>
  );
};

export default Log;
