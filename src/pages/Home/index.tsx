import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { Column, Goal, State } from "../../types/global";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE } from "../../store/Task/types";
import Element from "../../components/Element";
import { reorder } from "../../utils";
import { useCallback, useEffect } from "react";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import { action1, getTasks, reorderTasks } from "../../store/Task/action";

const Home: React.FC = () => {
  const navigate = useNavigate()
  useEffect(()=>{
    if(!localStorage.token){
      navigate("/log")
    }
    // @ts-ignore
    dispatch(getTasks())
  },[])
  
  const dispatch = useDispatch();
  const { goals, search, columns } = useSelector((state: State) => state.task);

  function dragEnd(res: any) {
    let data: Goal[] = reorder(
      goals,
      res.source.index,
      res.destination.index,
      res.source.droppableId,
      res.destination.droppableId
    );
     // @ts-ignore
    dispatch(reorderTasks("create", data));
  }

  const handleSearch = useCallback((search: string) => {
    return (elem: Goal) => {
      if(search.length <= 2) {
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
            {(provided,snapshot) => (
              <div
              data-testid = "column"
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={snapshot.isUsingPlaceholder?"columns dragColumn":"columns"}
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

export default Home;
