import { useState } from "react";
import type { TaskListProps } from "../../types";
import type { TaskStatus } from "../../types";
import { TaskItem } from "./TaskItem";
import { TaskFilter } from "../TaskFilter/TaskFilter";

function TaskList({ tasks, onStatusChange, onDelete, onUpdate}: TaskListProps){
    
    const [filters,setFilters] = useState({status: "", priority: "", search: ""});

    const filteredTaskElements = tasks.filter((task) => {
        let filteredTasks = false;
        if(task.status.includes(filters.status) && task.priority.includes(filters.priority) && task.title.includes(filters.search)) {filteredTasks = true}
        return filteredTasks;
    });

    const taskElements = filteredTaskElements.map((task) =>
        <TaskItem
            key={task.id}
            task={task}
            onStatusChange={handleStatusChange}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
        />
    );

    function handleStatusChange (taskId: string, taskStatus: TaskStatus): void {
        onStatusChange(taskId,taskStatus);
    }

    function handleUpdate (taskId: string): void {
        onUpdate(taskId);
    }

    function handleDelete (taskId: string): void {
        onDelete(taskId);
    }

    function handleFilterChange(changedFilter: object): void {
        Object.entries(changedFilter).forEach(([key, value]) => {
            setFilters({...filters, [key]: value});
        });
    }

    return (
        <div className="space-y-4">
            <TaskFilter onFilterChange={handleFilterChange} />
            <div className="space-y-4">
                {taskElements}
            </div>
        </div>
    )
}

export { TaskList };