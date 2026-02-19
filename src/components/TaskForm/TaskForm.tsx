import { v4 as uuidv4 } from 'uuid';
import type { Task, TaskFormProps } from "../../types"
import { useState } from 'react';



const initialFormData: Task = {
    id: "",
    title: "",
    description: "",
    status: "pending",
    priority: "low",
    dueDate: ""
}

const formLabelStyle = "text-gray-900 rounded mt-2 sm:p-2 sm:text-right font-semibold";
const formInputStyle = "border border-gray-300 rounded p-2";
const formButtonStyle = "border border-gray-300 rounded p-4 bg-blue-600 text-white mt-2 col-span-2";

function TaskForm({task, onAdd, onUpdate}:TaskFormProps) {

    const [formData,setFormData] = useState<Task> ({...initialFormData,id:uuidv4()});

    const temp = () => {
        if(task){
            console.log(task);
            onAdd(task);
            onUpdate(task);
            setFormData(formData)
        }
    }

    temp();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement|HTMLSelectElement>) => {
        const {name,value} = e.target;
        setFormData({...formData,[name]:value})
    }
    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newTask = {...formData};
        setFormData({...initialFormData,id:uuidv4()});
        onAdd(newTask);
    }

    return (
        <>
        <div>
            <form
                className='flex flex-col sm:grid sm:grid-cols-[auto_1fr] sm:gap-y-2 p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white dark:bg-black dark:border-gray-700'
                onSubmit={handleSubmit}
            >
            <h2 className='text-2xl col-span-2 text-center my-4'>Add a New Task</h2>
                
                {/* <label className={formLabelStyle} htmlFor='id'>ID</label> */}
                <input className={formInputStyle} type="hidden" name="id" value={formData.id} disabled />
                
                <label className={formLabelStyle} htmlFor='title'>Title</label>
                <input className={formInputStyle} type="text" name="title" value={formData.title} onChange={handleChange} />
                
                <label className={formLabelStyle} htmlFor='description'>Description</label>
                <input className={formInputStyle} type="text" name="description" value={formData.description} onChange={handleChange} />
                
                <label className={formLabelStyle} htmlFor='status'>Status</label>
                <select className={formInputStyle} name="status" value={formData.status} onChange={handleChange}>
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>
                
                <label className={formLabelStyle} htmlFor='priority'>Priority</label>
                <select className={formInputStyle} name="priority" value={formData.priority} onChange={handleChange}>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
                
                <label className={formLabelStyle} htmlFor='dueDate'>Due Date</label>
                <input className={formInputStyle} type="date" name="dueDate" value={formData.dueDate} onChange={handleChange} />
                
                <button className={formButtonStyle} type='submit'>Add</button>

            </form>
        </div>
        </>
    )
}

export { TaskForm }