import { useState } from "react";
import type { Task, TaskStatus } from "../../types";
import { TaskList } from "../TaskList/TaskList";
import { TaskForm } from "../TaskForm/TaskForm";
import { PlusCircleIcon } from "@heroicons/react/16/solid";

const initialTasks : Task[] = [
    {
        id: "001",
        title: "Task 1",
        description: "Description 1",
        status: "pending",
        priority: "low",
        dueDate: "2/19/2026"
    },
    {
        id: "002",
        title: "Task 2",
        description: "Description 2",
        status: "in-progress",
        priority: "medium",
        dueDate: "2/15/2026"
    },
    {
        id: "003",
        title: "Task 3",
        description: "Description 3",
        status: "completed",
        priority: "high",
        dueDate: "2/13/2026"
    }

];

function Dashboard() {

    const [tasks,setTasks] = useState<Task[]> (initialTasks);
    const [showForm,setShowForm] = useState<boolean> (false);

    function handleStatusChange (taskId: string, taskStatus: TaskStatus) {
        setTasks((prev) => 
            prev.map((task) => {
                if(task.id === taskId){
                    return {...task, status: taskStatus}; 
                }
                else{
                    return task
                };
            })
        );
    }

    function handleDelete (taskId: string) {
        setTasks((prev) =>
            prev.filter((task) =>
                task.id !== taskId
            )
        )
    }

    function handleAdd(task: Task) {
        setTasks((prev) =>[...prev,task]);
        setShowForm(!showForm)
    }

    function handleUpdate(task: Task) {
        console.log(task);
    }

    return (
        <div className='m-8'>
            <h1 className='text-3xl my-4'>Task Manager</h1>
            
            {!showForm && (
                <>
                <button onClick={()=>setShowForm(!showForm)} className="text-blue-600 bg-blue-100 px-2 py-1 rounded float-right"><PlusCircleIcon className="size-6 text-blue-600 inline pr-1" />Add Task</button>
                <div className="clear-right"><TaskList tasks={tasks} onStatusChange={handleStatusChange} onDelete={handleDelete} /></div>
                </>
            )}
            {showForm && (<TaskForm onAdd={handleAdd} onUpdate={handleUpdate} />)}
            
        </div>
    )

}

export { Dashboard }