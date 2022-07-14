import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { checkToken, passRecover } from "../../store/User/action";

const Recover: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  useEffect(() => {
    checkToken(token).then((res) => {
      if (!res.status) {
        navigate("/log");
        alert("Email is not confirmed")
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
      <h1>Recover Password</h1>
      <form
        className="reg_form"
        onSubmit={handleSubmit(async (data) => { 
          try {
            const res = await passRecover(data)
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
        <button className="reg_btn">Continue</button>
      </form>
    </div>
  );
};

export default Recover;
