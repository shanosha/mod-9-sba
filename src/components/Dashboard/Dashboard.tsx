import { useEffect, useState } from "react";
import type { Task, TaskStatus } from "../../types";
import { TaskList } from "../TaskList/TaskList";
import { TaskForm } from "../TaskForm/TaskForm";
import { PlusCircleIcon } from "@heroicons/react/16/solid";
import { loadData } from "../../utils/taskUtils";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

const storedTasks = loadData();

const initialTasks : Task[] = [
    {
        id: "001",
        title: "Task 1",
        description: "Description 1",
        status: "pending",
        priority: "low",
        dueDate: "2026-02-19"
    },
    {
        id: "002",
        title: "Task 2",
        description: "Description 2",
        status: "in-progress",
        priority: "medium",
        dueDate: "2026-02-15"
    },
    {
        id: "003",
        title: "Task 3",
        description: "Description 3",
        status: "completed",
        priority: "high",
        dueDate: "2026-02-13"
    }

];

function Dashboard() {

    const [tasks,setTasks] = useState<Task[]> (storedTasks || initialTasks);
    const [showForm,setShowForm] = useState<boolean> (false);
    const [taskToUpdate,setTaskToUpdate] = useState<Task|undefined> (undefined);

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

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
        );
    }

    function handleAdd(task: Task) {
        setTasks((prev) =>[...prev,task]);
        setShowForm(!showForm)
    }

    function handleUpdate(task: Task) {
        setTasks((prev) =>
            prev.map((t)=>{
                return t.id === task.id ? task : t;
            })
        );
        setTaskToUpdate(undefined);
        setShowForm(!showForm);
    }
    
    function showEditForm(taskId: string) {
        const targetTask = tasks.filter((task)=>
            task.id == taskId
        )[0]
        setTaskToUpdate(targetTask);
        setShowForm(!showForm);
    }

    return (
        <div className='m-8'>
            <ThemeToggle />
            <h1 className='text-3xl my-4'>Task Manager</h1>
            
            {!showForm && (
                <>
                <button onClick={()=>setShowForm(!showForm)} className="cursor-pointer text-blue-600 hover:bg-blue-200 bg-blue-100 px-2 py-1 rounded float-right shadow"><PlusCircleIcon className="size-6 text-blue-600 hover:text-blue-700 inline pr-1" />Add Task</button>
                <div className="clear-right"><TaskList tasks={tasks} onStatusChange={handleStatusChange} onDelete={handleDelete} onUpdate={showEditForm} /></div>
                </>
            )}
            {showForm && (<TaskForm task={taskToUpdate} onAdd={handleAdd} onUpdate={handleUpdate} />)}
            
        </div>
    )

}

export { Dashboard }