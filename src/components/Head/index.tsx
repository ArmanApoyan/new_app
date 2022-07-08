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
import { useSelector } from "react-redux";
import { userStateType } from "../../types/global";
import InviteForm from "../InviteForm";
import { becomeManager } from "../../store/User/action";

const Head: React.FC = () => {
  const { user } = useSelector((state: userStateType) => state.user);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <nav>
      <div className="head">
        <div className="search">
          <Search />
        </div>
        <div className="buttons">
          {user.role === "manager" && (
            <Button
              className="add"
              onClick={() => {
                setIsOpen(true);
              }}
            >
              <AiFillFileAdd />
            </Button>
          )}
          <Button
            className="login"
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("userId");
              localStorage.removeItem("refresh");
              navigate("/log");
              dispatch({ type: CLEAR });
            }}
          >
            LOG OUT
          </Button>
          {user.role === "manager" && (
            <Button
              className="invite_btn"
              onClick={() => {
                setIsOpen2(true);
              }}
            >
              INVITE
            </Button>
          )}
          {user.role === "user" && (
            <Button
              className="invite_btn"
              onClick={() => {
                becomeManager(user.id)
                window.location.reload()
              }}
            >
              Become Manager
            </Button>
          )}
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
      
      <Modal
        isOpen={isOpen2}
        close={() => {
          setIsOpen2(false);
        }}
      >
          <InviteForm
            close={() => {
              setIsOpen2(false);
            }}
          />
      </Modal>
    </nav>
  );
};

export default Head;
