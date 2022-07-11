import { AiFillFileAdd } from "react-icons/ai";
import { useRef, useState } from "react";
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
import { RiMenuLine } from "react-icons/ri";
import useOutsideClick from "../../hooks/outSideClick";

const Head: React.FC = () => {
  const { user } = useSelector((state: userStateType) => state.user);
  const { users } = useSelector((state: userStateType) => state.user);
  const [isOpen, setIsOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const [buttonsMenu, setButtonsMenu] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const menuBody = useRef(null);
  const buttonsBody = useRef(null);

  useOutsideClick(menuBody,()=>{setMenu(false)})
  useOutsideClick(buttonsBody,()=>{setButtonsMenu(false)})

  return (
    <>
      <div className="menu" ref={menuBody}>
          <p onClick={() => {
              if (menu) {
                setMenu(false);
              } else {
                setMenu(true);
              }
            }}><RiMenuLine className="menu_icon"/></p>
        <ul className={menu === true ? "openList" : "closeList"}>
          <li
            className="name">
            {user.organization}
          </li>
          {users.map((el: any, i) => {
            if(el.id === user.id ){
              return
            }
            if(el.role === "manager"){
              return (
                <li className="users"  key={i}>
                  {el.username} - manager
                </li>
              );  
            }
            return (
              <li className="users"  key={i}>
                {el.username}
              </li>
            );
          })}
         
        </ul>
      </div>
      <nav>
        <div className="head">
          <div className="search">
            <Search />
          </div>
          <div ref={buttonsBody}  className="buttons">
            <p onClick={() => {
              if (buttonsMenu) {
                setButtonsMenu(false);
              } else {
                setButtonsMenu(true);
              }
            }}><RiMenuLine className="buttons_open"/></p>            
              <ul className={buttonsMenu?"buttons_list isOpen":"buttons_list isClose"}>
              {user.role === "manager" && (
                <li className="menu_button">
                  <Button
                    className="add"
                    onClick={() => {
                      setIsOpen(true);
                    }}
                  >
                    <AiFillFileAdd />
                  </Button>
                </li>
              )}
              <li className="menu_button">
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
              </li>
              {user.role === "manager" && (
                <li className="menu_button">
                  <Button
                    className="invite_btn"
                    onClick={() => {
                      setIsOpen2(true);
                    }}
                  >
                    INVITE
                  </Button>
                </li>
              )}
            </ul>            
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
    </>
  );
};

export default Head;
