import React from "react";
import { useForm } from "react-hook-form";
import { inviteUser } from "../../store/User/action";
import "./style.scss";

interface propType {
  close: CallableFunction;
}

const InviteForm: React.FC<propType> = (props) => {
  const { close } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  return (
    <div className="invite">
      <h1>Invite User</h1>
      <form
        className="invite_form"
        onSubmit={handleSubmit(async (data) => {
          close();
          const res = await inviteUser(data);
          alert(res.message);
          reset();
        })}
      >
        <div className="invite_div">
          <label>Email</label>
          <input
            className="invite_input"
            type="email"
            {...register("email", { required: true })}
          />
          {errors.email && <p className="error">Email is not correct</p>}
        </div>
        <div className="invite_div">
          <label>Message</label>
          <input
            className="invite_input"
            type="text"
            {...register("message", { minLength: 3 })}
          />
          {errors.message && <p className="error">Message is not correct</p>}
        </div>
        <button className="invite_btn">Invite</button>
      </form>
    </div>
  );
};

export default InviteForm;
