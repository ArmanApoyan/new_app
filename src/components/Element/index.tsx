import { Draggable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { DELETE } from "../../store/Task/types";
import { Goal, State } from "../../types/global";
import { getIds, lengthCheck, random } from "../../utils";
import "./style.scss";
import { BsFillPencilFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { useEffect, useMemo, useState } from "react";
import Modal from "../Modal";
import NewTask from "../NewTask";
import { useSearchParams } from "react-router-dom";

interface PropTypes {
  task: Goal;
  index: number;
}

const Element: React.FC<PropTypes> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState("");
  const dispatch = useDispatch();
  const goals = useSelector((state: State) => state.task.goals);
  const { task, index } = props;
  let ids = useMemo(getIds(goals), [goals]);
  let key = random(ids);
  let des: string = lengthCheck(task.description, 18);
  let title: string = lengthCheck(task.title, 10);
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    if (searchParams.get("task") === task.id.toString()) {
      setIsOpen(true);
      setType("view");
    }
  }, [searchParams]);
  return (
    <>
      <Draggable draggableId={task.id.toString()} index={index} key={key}>
        {(provided, snaspshot) => (
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
