import { AiFillFileAdd } from "react-icons/ai";
import { useState } from "react";
import NewTask from "../NewTask";
import Search from "../Search";
import Button from "../Button";
import Modal from "../Modal";
import "./style.scss";

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
