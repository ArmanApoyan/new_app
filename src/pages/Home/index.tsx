import { useEffect, useMemo, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import Element from "../../components/Element";
import { UPDATE } from "../../store/Task/types";
import { Column, Goal, State } from "../../types/global";
import { random, getIds } from "../../utils";
import "./style.scss";

const ToDo: React.FC<{ onclick?: CallableFunction }> = (props) => {
  const dispatch = useDispatch();
  const { goals } = useSelector((state: State) => state.task);
  const { search } = useSelector((state: State) => state.task);
  const [tasks, setTasks] = useState([...goals]);
  useEffect(() => {
    search.length > 2
      ? setTasks([
          ...goals.filter((el) =>
            el.title.toLowerCase().includes(search.toLowerCase())
          ),
        ])
      : setTasks([...goals]);
  }, [goals, search]);
  const ids = useMemo(getIds(goals), [goals]);
  const columns = useSelector((state: State) => state.task.columns);
  const reorder = (
    tasks: Goal[],
    start: number,
    end: number,
    startCol: string,
    endCol: string
  ): Goal[] => {
    const result = Array.from(tasks);
    result.map((el, i) => {
      if (i == start && el.status == startCol) {
        el.status = endCol;
      }
    });
    const [replaced] = result.splice(start, 1);
    result.splice(end, 0, replaced);
    return result;
  };
  function dragEnd(res: any) {
    let data = reorder(
      goals,
      res.source.index,
      res.destination.index,
      res.source.droppableId,
      res.destination.droppableId
    );
    dispatch({ data, type: UPDATE });
  }
  return (
    <DragDropContext onDragEnd={dragEnd}>
      {columns.map((elm: Column, index: number) => {
        let key = random(ids);
        return (
          <Droppable droppableId={elm.title} key={key}>
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="toDo"
              >
                <h2>{elm.title}</h2>
                {tasks.map((el: Goal, i: number) => {
                  if (el.status == elm.title) {
                    let key = random(ids);
                    return <Element key={key} task={el} index={i} />;
                  }
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        );
      })}
    </DragDropContext>
  );
};

export default ToDo;
