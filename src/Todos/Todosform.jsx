import React, { useEffect, useState } from 'react'
import './style.css'
import { addTask } from '../Store/Todoslice';
import { useDispatch } from 'react-redux';

const TaskForm = () => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(addTask({ title, description }))
            setTitle("");
            setDescription("");
        }
        catch (e) {
            console.log("Error in creating Task", e);
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit} className='form' style={{ display: 'flex', width: 710, flexDirection: 'column', height: '10rem', justifyContent: 'space-between', padding: '5px', borderRadius: '7px', marginLeft: '3rem', marginTop: 10, border: '1px solid gray' }}>
                <input type="text" id="name" name="name" value={title} placeholder='Name' onChange={(e) => { setTitle(e.target.value); console.log(e.target.value); }} style={{ display: 'flex', border: 'none', flexDirection: 'column', outline: 'none', height: '2rem', justifyContent: 'space-between', width: 690, fontSize: '15px' }} />
                <textarea placeholder='Description' value={description} onChange={(e) => { setDescription(e.target.value); console.log(e.target.value); }} style={{ border: 'none', outline: 'none' }} />
                <div className="buttons">
                    <button onClick={handleSubmit} className='addbutton'>Add Task</button>
                </div>
            </form>
        </>
    );
};
export default TaskForm
