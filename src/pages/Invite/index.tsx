import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { checkToken, newUserReg } from "../../store/User/action";

const Invite: React.FC = () => {
  console.log('test');
  const [searchParams, setSearchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  useEffect(() => {
    checkToken(token).then((res) => {
      if (!res.status) {
        navigate("/log");
      }
    });
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  return (
    <div className="reg">
      <h1>Sign Up</h1>
      <form
        className="reg_form"
        onSubmit={handleSubmit(async (data) => {
          try {
            const res = await newUserReg(data);
            if (!res.error) {
              navigate("/log");
            } else {
              alert(res.error);
            }
          } catch (error) {
            alert("Password is not confirmed");
          }
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
          {errors.username && <p className="error">Username is not correct</p>}
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
          {errors.password && <p className="error">Password is not correct</p>}
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
        <button className="reg_btn">Sign Up</button>
      </form>
    </div>
  );
};

export default Invite;
