import { useState } from "react";
import Button from "../Button";
import Modal from "../Modal";
import NewTask from "../NewTask";
import Search from "../Search";
import "./style.scss";
import { AiFillFileAdd } from "react-icons/ai";

const Head: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
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
