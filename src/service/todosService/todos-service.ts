import { Goal } from "../../types/global";
import { axiosPost } from "../../config/axios";

function addTask(todo: Goal) {
    return axiosPost('/addTask', todo)
}

function read(todo: Goal[]) {
    return axiosPost('/create', todo)
}

// function update({name: ''}) {

// }

export const TodosService = {
    addTask,
    read,
    // update
} 