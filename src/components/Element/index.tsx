import { Draggable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { DELETE } from "../../store/Task/types";
import { Goal, State } from "../../types/global";
import { random } from "../../utils";
import "./style.scss";
import { BsFillPencilFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { useState } from "react";
import Modal from "../Modal";
import NewTask from "../NewTask";


interface PropTypes {
  task: Goal;
  index: number;
}

const Element: React.FC<PropTypes> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState("");
  const dispatch = useDispatch();
  const goals = useSelector((state: State) => state.task.goals);
  let ids: number[] = [];
  const { task, index } = props;
  goals.map((el: Goal) => {
    ids.push(el.id);
  });
  let key = random(ids);
  let des: string;
  if (task.description.length > 40) {
    des = task.description.substring(0, 45) + "...";
  } else {
    des = task.description;
  }

  return (
    <>
      <Draggable draggableId={task.id + ""} index={index} key={key}>
        {(provided, snaspshot) => (
          <div
            className="goal"
            onDoubleClick={(e) => {
              setIsOpen(true);
              setType("view");
            }}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <h1>{task.title}</h1>
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
