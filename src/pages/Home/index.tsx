import { useEffect, useMemo, useState, useCallback } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import Element from "../../components/Element";
import { UPDATE } from "../../store/Task/types";
import { Column, Goal, State } from "../../types/global";
import { reorder } from "../../utils";
import "./style.scss";

const ToDo: React.FC = () => {
  const dispatch = useDispatch();
  const { goals, search, columns } = useSelector((state: State) => state.task);

  const [tasks, setTasks] = useState(structuredClone(goals));

  useEffect(() => {
    setTasks(goals)
  }, [goals])

  useEffect(() => {
    search.length > 2
      ? setTasks([
          ...goals.filter((el) =>
            el.title.toLowerCase().includes(search.toLowerCase())
          ),
        ])
      : setTasks([...goals]);
  }, [search]);

  function dragEnd(res: any) {
    let data: Goal[] = reorder(
      tasks,
      res.source.index,
      res.destination.index,
      res.source.droppableId,
      res.destination.droppableId
    );
    dispatch({ data, type: UPDATE });
  }
  const handleSearch = useCallback((search: string) => {
    return (elem: Goal) => {
      if(search.length < 2) {
        return elem
      }
      else if(elem.title.toLowerCase().includes(search.toLowerCase())) {
        return elem
      }
      return false
    }
  }, [])
  return (
    <DragDropContext onDragEnd={dragEnd}>
      {columns.map((elm: Column, index: number) => {
        return (
          <Droppable droppableId={elm.title} key={index}>
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="columns"
              >
                <h2>{elm.title}</h2>
                {goals.filter(handleSearch(search)).map((el: Goal, i: number) => {
                  if (el.status == elm.title) {
                    return <Element key={`${el.id}/${elm.title}`} task={el} index={i} />;
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
