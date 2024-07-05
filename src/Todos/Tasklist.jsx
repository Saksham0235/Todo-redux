import React, { useEffect, useState } from 'react'
import './style.css'
import { Flex, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import Tasks from './Tasks';


const contentStyle = {
    padding: 50,
    background: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 4,
};

const content = <div style={contentStyle} />;

const TaskList = () => {
    const todos = useSelector((state) => state.tasks.tasks);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000)
    }, [])
    console.log(todos, "From tasks");
    return (
        <>
            {
                loading ? (<center>
                    <Spin tip="Loading" size="large">
                        {content}
                    </Spin>
                </center>) : (
                    <div className='home'>
                        <center><h1>Task  List</h1></center>
                        <Tasks />
                    </div>)
            }
        </>
    )
}

export default TaskList
