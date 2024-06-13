import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../../axiosClient";

function TaskForm(){
    const {id} = useParams();
    const navigate = useNavigate();
    const [task, setTasks] = useState({
        id: null,
        description: '',
        due_date: '',
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);

    if(id)
    {

        useEffect(() => {
            setLoading(true)
            axiosClient.get(`/tasks/${id}`)
                .then(({data}) => {

                    setLoading(false)
                    setTasks(data)
                })
                .catch(() => {
                    setLoading(false)
                })
        }, [])
    }

    const onSubmit = e => {
        e.preventDefault()
        if (task.id) {
            axiosClient.put(`/tasks/${task.id}`, task)
                .then(() => {
                    navigate('/tasks')
                })
                .catch(err => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors)
                    }
                })
        } else {
            axiosClient.post('/tasks', task)
                .then(() => {
                    navigate('/tasks')
                })
                .catch(err => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors)
                    }
                })
        }
    }

    return(
        <>
            {task.id && <h1>Update Task: {task.name}</h1>}
            {!task.id && <h1>New Task</h1>}
            <div className="card animated fadeInDown">
                {loading && (
                    <div className="text-center">
                        Loading...
                    </div>
                )}
                {errors &&
                <div className="alert">
                    {Object.keys(errors).map(key => (
                        <p key={key}>{errors[key][0]}</p>
                    ))}
                </div>
                }
                {!loading && (

                    <form onSubmit={onSubmit}>

                        <input value={task.title} onChange={e => setTasks({...task, title: e.target.value})} placeholder="Name"/>
                        <textarea value={task.description} onChange={e => setTasks({...task, description: e.target.value})} placeholder="Description"/>
                        <input value={task.due_date} type="date" onChange={e => setTasks({...task, due_date: e.target.value})} placeholder="Due Date"/>
                        <button className="btn">Save</button>
                    </form>
                )}
            </div>
        </>
    )
}
export  default   TaskForm