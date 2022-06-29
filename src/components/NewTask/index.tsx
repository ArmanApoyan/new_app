import { getIds, handleBlur, handleChange, handleDblClick, random, validator } from "../../utils";
import React, { useEffect, useState, useMemo, memo } from "react";
import { Column, Goal, State } from "../../types/global";
import { useDispatch, useSelector } from "react-redux";
import { action1 } from "../../store/Task/action";
import { BiArrowBack } from "react-icons/bi";
import "./style.scss";

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
  const newIds = useMemo(getIds(goals), [goals]);
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

  const clickBack = () =>{
    setcompType("view");
    if (task) {
      setFormData({
        id: task.id,
        title: { value: task.title, error: false },
        description: { value: task.description, error: false },
        status: { value: task.status, error: false },
        })}
  }
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (formData.status.value == "default" || formData.status.value == "") {
      setFormData({ ...formData });
      formData.status.error = true;
      return;
    }
    if (formData.title.value == "") {
      formData.title.error = true;
      setFormData({ ...formData });
      return;
    }
    if (formData.title.error == true) {
      return;
    }
    let data = {
      id: formData.id,
      title: formData.title.value,
      description: formData.description.value,
      status: formData.status.value,
    };
    // @ts-ignore
    dispatch(action1(compType, data));
    close();
  };
  return (
    <>{compType != "view" && (
        <form
          className="newTask"
          onSubmit={(e) => {
            handleSubmit(e);
          }}>
          {formData.status.error == true && (
            <p className="error">Select Column</p>
          )}
          {compType == "add" && (
            <select
              name="status"
              onBlur={(e) => handleBlur(e, formData.status, "default", setFormData, formData)}
              defaultValue={"default"}
              onChange={(e) => {handleChange(e,setFormData,formData)}}>
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
          {compType == "create" && changeType == "" && (
            <select
              name="status"
              defaultValue={formData.status.value}
              onChange={(e) => {handleChange(e, setFormData, formData)}}>
              {columns.map((el: Column, i: number) => {
                if (el.title == formData.status.value) {
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
          {changeType == "select" && (
            <><select
                name="status"
                defaultValue={formData.status.value}
                onChange={(e) => {handleChange(e, setFormData, formData)}}>
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
                className="view_title title">
                {formData.title.value}
              </p>
              <p
                onDoubleClick={() => setChangeType("textarea")}
                className="view_description des">
                {formData.description.value}
              </p></>
          )}
          {formData.title.error == true && (
            <p className="error">Title is incorrect</p>
          )}
          {changeType == "" && (
            <input
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
              onChange={(e) => {handleChange(e, setFormData, formData)}}/>
          )}
          {changeType == "input" && (
            <><p
                onDoubleClick={() => setChangeType("select")}
                className="view_status">
                {formData.status.value}
              </p>
              <input
                type="text"
                placeholder="Title"
                value={formData.title.value}
                name="title"
                onChange={(e) => {handleChange(e, setFormData, formData)}}/>
              <p
                onDoubleClick={() =>setChangeType("textarea")}
                className="view_description des">
                {formData.description.value}
              </p></>
          )}
          {changeType == "" && (
            <textarea
              name="description"
              onChange={(e) => {handleChange(e, setFormData, formData)}}
              value={formData.description.value}
              placeholder="Description"/>
          )}
          {changeType == "textarea" && (
            <><p
                onDoubleClick={() =>setChangeType("select")}
                className="view_status">
                {formData.status.value}
              </p>
              <p
                onDoubleClick={() =>setChangeType("input")}
                className="view_title title">
                {formData.title.value}
              </p>
              <textarea
              name="description"
              onChange={(e) => {handleChange(e, setFormData, formData)}}
                value={formData.description.value}
                placeholder="Description"/></>)}
          {compType == "add" && (
            <button className="submit" type="submit">
              ADD
            </button>)}
          {compType == "create" && (
            <button className="submit" type="submit">
              Save
            </button>)}
          {compType == "create" && changeType != "" && (
            <button
              className="back"
              onClick={() => clickBack()}>
              <BiArrowBack />
            </button>)}
        </form>
      )}
      {compType == "view" && (
        <div className="view">
            <p className="id">{task?.id}</p>
          <p
            className="status"
            onDoubleClick={() =>handleDblClick("select",setcompType,setChangeType)}>
            {formData.status.value}
          </p>
          <p
            className="title"
            onDoubleClick={() =>handleDblClick("input",setcompType,setChangeType)}>
            {formData.title.value}
          </p>
          <p
            className="des"
            onDoubleClick={() =>handleDblClick("textarea",setcompType,setChangeType)}>
            {formData.description.value}
          </p>
        </div>)}
      </>)}
export default memo(NewTask);