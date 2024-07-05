import React, { useEffect, useState } from 'react'
import './style.css'
import { addTask, editTask } from '../Store/Todoslice';
import { useDispatch } from 'react-redux';

const EditForm = ({  task, isEdit, toggleForm }) => {
    const dispatch = useDispatch();
    console.log(task,"From edit");


    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(editTask({ id:task.id,title, description }))
            setTitle("");
            setDescription("");
            toggleForm();
        }
        catch (e) {
            console.log("Error in creating Task", e);
        }

    }
    const handleCancel = () => {
        setDescription('');
        setTitle('')
        toggleForm()
    }
    useEffect(() => {
        if (isEdit && task) {
            setTitle(task.title);
            setDescription(task.description);
        }
    }, [isEdit, task]);

    return (
        <>
            <form onSubmit={handleSubmit} className='form' style={{ display: 'flex', width: 710, flexDirection: 'column', height: '10rem', justifyContent: 'space-between', padding: '5px', borderRadius: '7px', marginLeft: '3rem', marginTop: 10, border: '1px solid gray' }}>
                <input type="text" id="name" name="name" value={title} placeholder='Name' onChange={(e) => { setTitle(e.target.value); console.log(e.target.value); }} style={{ display: 'flex', border: 'none', flexDirection: 'column', outline: 'none', height: '2rem', justifyContent: 'space-between', width: 690, fontSize: '15px' }} />
                <textarea placeholder='Description' value={description} onChange={(e) => { setDescription(e.target.value); console.log(e.target.value); }} style={{ border: 'none', outline: 'none' }} />
                <div className="buttons">
                    <button onClick={handleSubmit} className='addbutton'>{isEdit ? "Update Task" : "Add Task"}</button>
                    <button className='cancelbutton' onClick={handleCancel}>Cancel</button>
                </div>
            </form>
        </>
    );
};
export default EditForm
