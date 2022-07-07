import { AiFillFileAdd } from "react-icons/ai";
import { useState } from "react";
import NewTask from "../NewTask";
import Search from "../Search";
import Button from "../Button";
import Modal from "../Modal";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { CLEAR } from "../../store/Task/types";

const Head: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate()
  const dispatch = useDispatch() 

  return (
    <nav>
      <div className="head">
        <div className="search">
          <Search />
        </div>
        <div className="buttons">
          <Button
            className="add"
            onClick={() => {
              setIsOpen(true);
            }}
          >
            <AiFillFileAdd />
          </Button>
          <Button
            className="login"
            onClick={() => {
              localStorage.removeItem("token")
              localStorage.removeItem("userId")
              navigate("/log")
              dispatch({type:CLEAR})
            }}
          >
            LOG OUT
          </Button>
        </div>
      </div>
      <Modal
        isOpen={isOpen}
        close={() => {
          setIsOpen(false);
        }}
      >
        <NewTask
          type={"add"}
          close={() => {
            setIsOpen(false);
          }}
        />
      </Modal>
    </nav>
  );
};

export default Head;
