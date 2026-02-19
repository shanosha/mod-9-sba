import { v4 as uuidv4 } from 'uuid';
import type { Task, TaskFormProps } from "../../types"
import { useState } from 'react';
import { PlusCircleIcon } from '@heroicons/react/16/solid';

const initialFormData: Task = {
    id: "",
    title: "",
    description: "",
    status: "pending",
    priority: "low",
    dueDate: ""
}

const formLabelStyle = "dark:text-white text-gray-900 rounded mt-2 sm:p-2 sm:text-right font-semibold";
const formInputStyle = "border border-gray-300 rounded p-2";
const formButtonStyle = "shadow hover:shadow-md rounded p-4 hover:bg-blue-200 bg-blue-100 hover:text-blue-700 text-blue-600 mt-2 col-span-2";

function TaskForm({task, onAdd, onUpdate}:TaskFormProps) {

    const [formData,setFormData] = useState<Task> (task||{...initialFormData,id:uuidv4()});

    let addItem = true;
    if(task){
        addItem = false;
        console.log(task);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement|HTMLSelectElement>) => {
        const {name,value} = e.target;
        setFormData({...formData,[name]:value})
    }
    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newTask = {...formData};
    
        if(addItem){
            // setFormData({...initialFormData,id:uuidv4()});
            onAdd(newTask);
        }
        else{
            onUpdate(newTask);
        }
    }

    return (
        <>
        <div>
            <form
                className='flex flex-col sm:grid sm:grid-cols-[auto_1fr] sm:gap-y-2 p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white dark:bg-black dark:border-gray-700'
                onSubmit={handleSubmit}
            >
            <h2 className='text-2xl col-span-2 text-center my-4'>{addItem?"Add a New Task":"Update Task"}</h2>
                
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
                
                <button className={formButtonStyle} type='submit'><PlusCircleIcon className="size-6 text-blue-600 hover:text-blue-700 inline pr-1" />{addItem?"Add":"Update"}</button>

            </form>
        </div>
        </>
    )
}

export { TaskForm }