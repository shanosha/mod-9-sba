import { v4 as uuidv4 } from 'uuid';
import type { FormErrors, Task, TaskFormProps } from "../../types"
import { useState } from 'react';
import { PlusCircleIcon } from '@heroicons/react/16/solid';
import { fieldInvalid } from '../../utils/taskUtils';

// Initial form data, used unless a specific task has been specified in the props.
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
const errorStyle = "col-span-2 text-center text-red-600 text-sm mb-1"

// Component that shows a form. The Form adds a new task, or updates an existing task if task data has been supplied in the props.
function TaskForm({task, onAdd, onUpdate}:TaskFormProps) {

    const [formData,setFormData] = useState<Task> (task||{...initialFormData,id:uuidv4()});
    const [errors,setErrors] = useState<FormErrors>({ title: "", description: "", dueDate: ""});

    // Checks for task dat in props, if none the form will add new task. If a specific task is provided, the form will update that task.
    let addItem = true;
    if(task){
        addItem = false;
    }

    // Updates the formData stat variable as form fields are changed.
    const handleChange = (e: React.ChangeEvent<HTMLInputElement|HTMLSelectElement>) => {
        const {name,value} = e.target;
        setFormData({...formData,[name]:value})
    }

    // Handles form submition and checks the validity of form fields.
    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        let errorsFound = false;

        if(fieldInvalid(formData.title)){
            errorsFound = true;
            setErrors((prev)=>{
                return {...prev,title:"Please enter a title."}
            }
        )} else {
            setErrors((prev)=>{
                return {...prev,title:""}
            }
        )}

        if(fieldInvalid(formData.description)){
            errorsFound = true;
            setErrors((prev)=>{
                return {...prev,description:"Please enter a description."}
            }
        )} else {
            setErrors((prev)=>{
                return {...prev,description:""}
            }
        )}

        if(fieldInvalid(formData.dueDate)){
            errorsFound = true;
            setErrors((prev)=>{
                return {...prev,dueDate:"Please enter a due date."}
            }
        )} else {
            setErrors((prev)=>{
                return {...prev,dueDate:""}
            }
        )}

        if(!errorsFound){
            
            const newTask = {...formData};
        
            if(addItem){
                // setFormData({...initialFormData,id:uuidv4()});
                onAdd(newTask);
            }
            else{
                onUpdate(newTask);
            }

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
                {errors.title && (<p className={errorStyle}>{errors.title}</p>)}

                <label className={formLabelStyle} htmlFor='description'>Description</label>
                <input className={formInputStyle} type="text" name="description" value={formData.description} onChange={handleChange} />
                {errors.description && (<p className={errorStyle}>{errors.description}</p>)}

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
                {errors.dueDate && (<p className={errorStyle}>{errors.dueDate}</p>)}

                <button className={formButtonStyle} type='submit'><PlusCircleIcon className="size-6 text-blue-600 hover:text-blue-700 inline pr-1" />{addItem?"Add":"Update"}</button>

            </form>
        </div>
        </>
    )
}

export { TaskForm }