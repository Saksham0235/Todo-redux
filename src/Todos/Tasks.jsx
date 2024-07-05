import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteTask, editTask } from '../Store/Todoslice'
import TaskForm from './Todosform'
import EditForm from './EditForm'
import {  DeleteOutlined } from '@ant-design/icons'

const Tasks = () => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("");
    const todos = useSelector((state) => state.tasks.tasks);
    const [selectedTask, setSelectedTask] = useState(null);
    const [selectedTaskID, setSelectedTaskID] = useState(null);
    const [isEdit, setIsEdit] = useState(false)

    const handleEdit = (id) => {
        const data = todos.find((task) => task.id === id);
        console.log(data,"From selectedtask");
        setSelectedTask(data);
        setSelectedTaskID(id);
        setIsEdit(true)
    }
    const handleDelete = (id) => {
        console.log('Task Deleted');
        dispatch(deleteTask(id));
    }
    const toggleForm = () => {
        setSelectedTaskID(null);
    }
    return (
        <>
            {
                todos?.length > 0 && todos.map((task) => {
                    return (
                        <>
                            {
                                selectedTaskID === task.id ? (
                                    <EditForm isEdit={isEdit} toggleForm={toggleForm} task={selectedTask} />
                                ) : (
                                    <>
                                        <ul className='taskdiv'>
                                            <li className='task' style={{ listStyle: 'none', display: 'flex', justifyContent: 'space-between' }}>
                                                <div className='taskdisplay'>
                                                    <span style={{ fontSize: '20px', fontWeight: '550' }}>{task.title}</span>
                                                    <span style={{ fontSize: '13px', color: 'gray', marginTop: '2px' }}>{task.description}</span>
                                                </div>
                                                <div className='taskbtns'>
                                                    <button className='btn1' onClick={() => handleEdit(task.id)} >Edit</button>
                                                    <button className='btn2' onClick={() => handleDelete(task.id)} ><DeleteOutlined  twoToneColor= "red" /></button>
                                                </div>
                                            </li>
                                        </ul>
                                    </>
                                )}
                        </>)
                }
                )}
            <TaskForm />
        </>
    )
}

export default Tasks
