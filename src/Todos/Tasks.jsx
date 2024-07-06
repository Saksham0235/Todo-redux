import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteTask, editTask, checkboxTaskTodo } from '../Store/Todoslice'
import TaskForm from './Todosform'
import EditForm from './EditForm'
import { DeleteOutlined } from '@ant-design/icons'
import { Checkbox } from 'antd'
import { useSnackbar } from 'notistack';

const Tasks = () => {

    const { enqueueSnackbar } = useSnackbar();

    const dispatch = useDispatch();
    const todos = useSelector((state) => state.tasks.tasks);
    const [selectedTask, setSelectedTask] = useState(null);
    const [selectedTaskID, setSelectedTaskID] = useState(null);
    const [completed, setCompleted] = useState(false)
    const [isEdit, setIsEdit] = useState(false)

    const handleEdit = (id) => {
        const data = todos.find((task) => task.id === id);
        console.log(data, "From selectedtask");
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
    const handleChecbox = async (taskId) => {
        setCompleted(true)
        try {
            console.log("Before updating", completed);
            dispatch(checkboxTaskTodo(taskId))
            console.log(completed, "State of complete in checkbox");
            enqueueSnackbar(<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: 200 }}><span style={{ fontSize: '15px', fontWeight: 550 }}>1 task completed </span></div>, { variant: 'info' })
        } catch (error) {
            console.log('Error in checkboxTask', error);
        }
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
                                                    <div style={{width:'25rem'}}>
                                                        <Checkbox
                                                            style={{
                                                                paddingRight: '1rem', marginTop: '-5px'
                                                            }}
                                                            onChange={() => {
                                                                handleChecbox(task.id)
                                                            }}
                                                        ></Checkbox>
                                                        <span style={{ fontSize: '20px', fontWeight: '550' }}>{task.title}</span>
                                                        <span style={{marginLeft:'3rem'}}>Status: {task.completed ? 'Completed' : "InComplete"}</span>
                                                    </div>
                                                    <span style={{ fontSize: '13px',width:'10rem', color: 'gray', marginTop: '2px',marginLeft:'2rem' }}>{task.description}</span>
                                                </div>
                                                <div className='taskbtns'>
                                                    <button className='btn1' onClick={() => handleEdit(task.id)} >Edit</button>
                                                    <button className='btn2' onClick={() => handleDelete(task.id)} ><DeleteOutlined twoToneColor="red" /></button>
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
