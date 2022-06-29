import { useSearchParams } from "react-router-dom";
import { BsFillPencilFill } from "react-icons/bs";
import { Draggable } from "react-beautiful-dnd";
import { DELETE } from "../../store/Task/types";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Goal } from "../../types/global";
import { lengthCheck } from "../../utils";
import { MdDelete } from "react-icons/md";
import NewTask from "../NewTask";
import Modal from "../Modal";
import "./style.scss";

interface PropTypes {
  task: Goal;
  index: number;
}

const Element: React.FC<PropTypes> = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { task, index } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState("");

  const w = window.innerWidth>600?window.innerWidth:window.innerWidth+600
  const des: string = lengthCheck(task.description, w/25);
  const title: string = lengthCheck(task.title, w/100);
  
  useEffect(() => {
    if (searchParams.get("task") === task.id.toString()) {
      setIsOpen(true);
      setType("view");
    }
  }, [searchParams]);
  
  return (
    <>
      <Draggable draggableId={task.id.toString()} index={index}>
        {(provided) => (
          <div
            className="goal"
            onDoubleClick={(e) => {
              setIsOpen(true);
              setType("view");
              setSearchParams(`task=${task.id}`);
            }}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <h1>{title}</h1>
            <h3>{des}</h3>
            <button
              className="x"
              onClick={() => {
                dispatch({ id: task.id, type: DELETE });
              }}
            >
              <MdDelete />
            </button>
            <button
              onClick={() => {
                setIsOpen(true);
                setType("create");
              }}
              className="edit"
            >
              <BsFillPencilFill />
            </button>
          </div>
        )}
      </Draggable>
      <Modal
        isOpen={isOpen}
        close={() => {
          setIsOpen(false);
          setSearchParams("");
        }}
      >
        <NewTask
          type={type}
          task={task}
          close={() => {
            setIsOpen(false);
          }}
        />
      </Modal>
    </>
  );
};

export default Element;
