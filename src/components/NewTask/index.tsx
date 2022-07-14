import {
  getIds,
  handleBlur,
  handleChange,
  handleDblClick,
  random,
  validator,
} from "../../utils";
import React, { useEffect, useState, useMemo, memo } from "react";
import { Column, Goal, State, userStateType } from "../../types/global";
import { useDispatch, useSelector } from "react-redux";
import { action1, getTasks } from "../../store/Task/action";
import { BiArrowBack } from "react-icons/bi";
import "./style.scss";
import { notification } from "../../store/User/action";
import ImageForm from "../ImageForm";


interface Props {
  close: CallableFunction;
  type: string;
  task?: Goal;
}
const NewTask: React.FC<Props> = (props) => {
  const { close, type, task } = props;
  const dispatch = useDispatch();

  const [changeType, setChangeType] = useState("");
  const [compType, setcompType] = useState(type);

  const { columns, goals } = useSelector((state: State) => state.task);
  const { user, users } = useSelector((state: userStateType) => state.user);
  const newIds = useMemo(getIds(goals), [goals]);
  const [formData, setFormData] = useState({
    id: random(newIds),
    title: { value: "", error: false },
    description: { value: "", error: false },
    status: { value: "", error: false },
    userId: { value: "", error: false },
  });

  useEffect(() => {
    if (task) {
      setFormData({
        id: task.id,
        title: { value: task.title, error: false },
        description: { value: task.description, error: false },
        status: { value: task.status, error: false },
        userId: { value: task.userId, error: false },
      });
    }
  }, [task]);

  const clickBack = () => {
    setcompType("view");
    if (task) {
      setFormData({
        id: task.id,
        title: { value: task.title, error: false },
        description: { value: task.description, error: false },
        status: { value: task.status, error: false },
        userId: { value: task.userId, error: false },
      });
    }
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (formData.status.value === "default" || formData.status.value === "") {
      setFormData({ ...formData });
      formData.status.error = true;
      return;
    }
    if (formData.title.value === "") {
      formData.title.error = true;
      setFormData({ ...formData });
      return;
    }
    if (formData.title.error === true) return;
    let data = {
      id: formData.id,
      title: formData.title.value,
      description: formData.description.value,
      status: formData.status.value,
      userId: formData.userId.value,
    };
    // @ts-ignore
    dispatch(action1(compType, data));
    notification({ receiver: data.userId, sender: user.id });
    close();
  };
  return (
    <>
      {compType !== "view" && user.role === "manager" && (
        <form className="newTask" onSubmit={(e) => handleSubmit(e)}>
          {compType === "add" && (
            <select
              data-testid="select"
              name="userId"
              onBlur={(e) =>
                handleBlur(e, formData.userId, "default", setFormData, formData)
              }
              defaultValue={"default"}
              onChange={(e) => {
                handleChange(e, setFormData, formData);
              }}
            >
              <option disabled value="default">
                Select User
              </option>
              {users.map((el: any, i: number) => {
                return (
                  <option value={el.id} key={i}>
                    {el.username}
                  </option>
                );
              })}
            </select>
          )}
          {compType === "create" && changeType === "" && (
            <select
              name="userId"
              defaultValue={formData.userId.value}
              onChange={(e) => {
                handleChange(e, setFormData, formData);
              }}
            >
              {users.map((el: any, i: number) => {
                if (el.id === formData.userId.value) {
                  return (
                    <option selected value={el.id} key={i}>
                      {el.username}
                    </option>
                  );
                }
                return (
                  <option value={el.id} key={i}>
                    {el.username}
                  </option>
                );
              })}
            </select>
          )}
          {formData.userId.error === true && (
            <p className="error">Select User</p>
          )}
          {compType === "add" && (
            <select
              data-testid="select"
              name="status"
              onBlur={(e) =>
                handleBlur(e, formData.status, "default", setFormData, formData)
              }
              defaultValue={"default"}
              onChange={(e) => {
                handleChange(e, setFormData, formData);
              }}
            >
              <option disabled value="default">
                Select Column
              </option>
              {columns.map((el: Column, i: number) => {
                return (
                  <option value={el.title} key={i}>
                    {el.title}
                  </option>
                );
              })}
            </select>
          )}
          {compType === "create" && changeType === "" && (
            <select
              name="status"
              defaultValue={formData.status.value}
              onChange={(e) => {
                handleChange(e, setFormData, formData);
              }}
            >
              {columns.map((el: Column, i: number) => {
                if (el.title === formData.status.value) {
                  return (
                    <option selected value={el.title} key={i}>
                      {el.title}
                    </option>
                  );
                }
                return (
                  <option value={el.title} key={i}>
                    {el.title}
                  </option>
                );
              })}
            </select>
          )}
          {changeType === "select" && (
            <>
              <select
                name="status"
                data-testid="status"
                defaultValue={formData.status.value}
                onChange={(e) => {
                  handleChange(e, setFormData, formData);
                }}
              >
                {columns.map((el: Column, i: number) => {
                  return (
                    <option value={el.title} key={i}>
                      {el.title}
                    </option>
                  );
                })}
              </select>
              <p
                onDoubleClick={() => setChangeType("input")}
                className="view_title title"
              >
                {formData.title.value}
              </p>
              <p
                onDoubleClick={() => setChangeType("textarea")}
                className="view_description des"
              >
                {formData.description.value}
              </p>
            </>
          )}
          {formData.title.error === true && (
            <p className="error">Title is incorrect</p>
          )}
          {changeType === "" && (
            <input
              data-testid="inp"
              onBlur={(e) => {
                handleBlur(e, formData.title, "", setFormData, formData);
                if (!validator(/^\D[a-zA-Z0-9,.!? ]{2,}/, e.target.value)) {
                  formData.title.error = true;
                  setFormData({ ...formData });
                }
              }}
              type="text"
              name="title"
              placeholder="Title"
              value={formData.title.value}
              onChange={(e) => {
                handleChange(e, setFormData, formData);
              }}
            />
          )}
          {changeType === "input" && (
            <>
              <p
                onDoubleClick={() => setChangeType("select")}
                className="view_status"
              >
                {formData.status.value}
              </p>
              <input
                data-testid="inp"
                type="text"
                placeholder="Title"
                value={formData.title.value}
                name="title"
                onChange={(e) => {
                  handleChange(e, setFormData, formData);
                }}
              />
              <p
                onDoubleClick={() => setChangeType("textarea")}
                className="view_description des"
              >
                {formData.description.value}
              </p>
            </>
          )}
          {changeType === "" && (
            <textarea
              data-testid="textarea"
              name="description"
              onChange={(e) => {
                handleChange(e, setFormData, formData);
              }}
              value={formData.description.value}
              placeholder="Description"
            />
          )}
          {changeType === "textarea" && (
            <>
              <p
                onDoubleClick={() => setChangeType("select")}
                className="view_status"
              >
                {formData.status.value}
              </p>
              <p
                onDoubleClick={() => setChangeType("input")}
                className="view_title title"
              >
                {formData.title.value}
              </p>
              <textarea
                name="description"
                onChange={(e) => {
                  handleChange(e, setFormData, formData);
                }}
                value={formData.description.value}
                placeholder="Description"
              />
            </>
          )}
          {compType === "add" && (
            <button className="submit" type="submit">
              ADD
            </button>
          )}
          {compType === "create" && (
            <button className="submit" type="submit">
              Save
            </button>
          )}
          {compType === "create" && changeType !== "" && (
            <button
              data-testid="back"
              className="back"
              onClick={() => clickBack()}
            >
              <BiArrowBack />
            </button>
          )}
        </form>
      )}
      {compType === "view" && (
        <div className="view">
          <p data-testid="p" className="id">
            {task?.id}
          </p>
          <p
            data-testid="p"
            className="status"
            onDoubleClick={() =>
              handleDblClick("select", setcompType, setChangeType, user.role)
            }
          >
            {formData.status.value}
          </p>
          <p
            data-testid="p"
            className="title"
            onDoubleClick={() =>
              handleDblClick("input", setcompType, setChangeType, user.role)
            }
          >
            {formData.title.value}
          </p>
          <p
            data-testid="p"
            className="des"
            onDoubleClick={() =>
              handleDblClick("textarea", setcompType, setChangeType, user.role)
            }
          >
            {formData.description.value}
          </p>
          {
            user.role==="manager" &&
            <ImageForm id={task?.id}/>
          }
        </div>
      )}
    </>
  );
};
export default memo(NewTask);
