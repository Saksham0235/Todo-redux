import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

const initialState = {
    tasks: []
}

const todosSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action) => {
            state.tasks.push({ ...action.payload, id: uuidv4() });
        },
        editTask: (state, action) => {
            const { id, title, description } = action.payload;
            const existingTask = state.tasks.find(task => task.id === id);
            if (existingTask) {
                existingTask.title = title;
                existingTask.description = description;
            }
        },
        deleteTask: (state, action) => {
            return {
                ...state,
                tasks: state.tasks.filter((task) => task.id !== action.payload)
            }
        },
        checkboxTaskTodo: (state, action) => {
            const existingTask = state.tasks.find(task => task.id === action.payload);
            if (existingTask) {
                existingTask.completed = !existingTask.completed;
            }

        }

    }
})


export const { addTask, deleteTask, editTask, checkboxTaskTodo } = todosSlice.actions;
export default todosSlice.reducer

