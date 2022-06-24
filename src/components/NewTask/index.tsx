import React, { useEffect, useMemo, useState } from "react";
import { set, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { action1 } from "../../store/Task/action";
import { ADD_TASK } from "../../store/Task/types";
import { Column, Goal, State } from "../../types/global";
import { random } from "../../utils";
import "./style.scss";

interface Props {
  close: CallableFunction;
  type: string;
  task?: Goal;
}

const NewTask: React.FC<Props> = (props) => {
  const { close, type, task } = props;
  const [compType, setcompType] = useState(type);
  const { columns, goals } = useSelector((state: State) => state.task);
  const newIds = useMemo(() => {
    let ids: number[] = [];
    goals.map((el: Goal) => {
      ids.push(el.id);
    });
    return ids;
  }, [goals]);
  const [formData, setFormData] = useState({
    id: random(newIds),
    title: { value: "", error: false },
    description: { value: "", error: false },
    status: { value: "", error: false },
  });
  useEffect(() => {
    if (task) {
      setFormData({
        id: task.id,
        title: { value: task.title, error: false },
        description: { value: task.description, error: false },
        status: { value: task.status, error: false },
      });
    }
  }, [task]);
  const dispatch = useDispatch();
  return (
    <>
      {compType != "view" && (
        <form
          className="newTask"
          onSubmit={(e) => {
            e.preventDefault();
            if (
              formData.status.value == "default" ||
              formData.status.value == ""
            ) {
              setFormData({ ...formData });
              formData.status.error = true;
              return;
            }
            if (formData.title.value == "") {
              formData.title.error = true;
              setFormData({ ...formData });
              return;
            }
            let data = {
              id: formData.id,
              title: formData.title.value,
              description: formData.description.value,
              status: formData.status.value,
            };
            // dispatch({ data: { ...data, id: random(newIds) }, type: ADD_TASK });
            // @ts-ignore
            dispatch(action1(compType, data));
            close?.();
          }}
        >
          {formData.status.error == true && <p className="error">Select Column</p>}
          {compType == "add" && (
            <select
              defaultValue={"default"}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  status: { value: e.target.value, error: false },
                });
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
          {compType == "create" && <p>{formData.status.value}</p>}
          {formData.title.error == true && <p className="error">Title is required</p>}
          <input
            // className={formData.title.error == true?"redborder":""}
            type="text"
            placeholder="Title"
            value={formData.title.value}
            onChange={(e) => {
              setFormData({
                ...formData,
                title: { value: e.target.value, error: false },
              });
            }}
          />
          
          <textarea
            onChange={(e) => {
              setFormData({
                ...formData,
                description: { value: e.target.value, error: false },
              });
            }}
            value={formData.description.value}
            placeholder="Description"
          />
          {compType == "add" && <button type="submit">ADD</button>}
          {compType == "create" && <button type="submit">Save</button>}
        </form>
      )}
      {compType == "view" && (
        <div className="view">
          <p className="status">{formData.status.value}</p>
          <p
            onClick={() => {
              setcompType("create");
            }}
          >
            {formData.title.value}
          </p>
          <p
            onClick={() => {
              setcompType("create");
            }}
          >
            {formData.description.value}
          </p>
        </div>
      )}
    </>
  );
};

export default NewTask;
