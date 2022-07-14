import { useSearchParams } from "react-router-dom";
import { BsFillPencilFill } from "react-icons/bs";
import { Draggable } from "react-beautiful-dnd";
import { DELETE } from "../../store/Task/types";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Goal, userStateType } from "../../types/global";
import { lengthCheck } from "../../utils";
import { MdDelete } from "react-icons/md";
import NewTask from "../NewTask";
import Modal from "../Modal";
import "./style.scss";
import { useSelector } from "react-redux";

interface PropTypes {
  task: Goal;
  index: number;
}

const Element: React.FC<PropTypes> = (props) => {
  const { user,users } = useSelector((state: userStateType) => state.user);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { task, index } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState("");

  const title: string = lengthCheck(task.title, 13);
  const des: string = lengthCheck(task.description, 40);

  useEffect(() => {
    if (searchParams.get("task") === task.id.toString()) {
      setIsOpen(true);
      setType("view");
    }
  }, [searchParams]);

  const close = () => {
    setIsOpen(false);
    setSearchParams("");
  };

  return (
    <>
      <Draggable draggableId={task.id.toString()} index={index}>
        {(provided, snapshot) => (
          <div
            data-testid="task"
            className={snapshot.isDragging ? "goal goalDrag" : "goal"}
            onDoubleClick={(e) => {
              setIsOpen(true);
              setType("view");
              setSearchParams(`task=${task.id}`);
            }}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <h1 data-testid="title">{title}</h1>
            <h3>{des}</h3>
            {
              users.map((el:any,i)=>{
                if(el.id===task.userId){
                  return(
                    <p key={i} className="user">{el.username}</p>
                  )
                }
              })
            }
            {user.role === "manager" && (
              <button
                type="button"
                data-testid="close"
                className="x"
                onClick={() => {
                  dispatch({ id: task.id, type: DELETE });
                }}
              >
                <MdDelete />
              </button>
            )}
            {user.role === "manager" && (
              <button
                data-testid="edit_btn"
                onClick={() => {
                  setIsOpen(true);
                  setType("create");
                }}
                className="edit"
              >
                <BsFillPencilFill />
              </button>
            )}
          </div>
        )}
      </Draggable>
      <Modal isOpen={isOpen} close={() => close()}>
        <NewTask type={type} task={task} close={() => close()} />
      </Modal>
    </>
  );
};

export default Element;
