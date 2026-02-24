import { useState } from "react";
import type { TaskListProps } from "../../types";
import type { TaskStatus } from "../../types";
import { TaskItem } from "./TaskItem";
import { TaskFilter } from "../TaskFilter/TaskFilter";
import { filterTasks, sortTasks } from "../../utils/taskUtils";

function TaskList({ tasks, onStatusChange, onDelete, onUpdate}: TaskListProps){
    
    const [filters,setFilters] = useState({search: "", status: "", priority: ""});
    const [sort,setSort] = useState("");

    const sortedTasks = sortTasks(tasks,sort);

    const filteredTasks = filterTasks(sortedTasks,filters);

    const taskElements = filteredTasks.map((task) =>
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

    function handleSortChange(e: React.ChangeEvent<HTMLSelectElement>): void {
        const value = e.target.value;
        setSort(value);
    }

    return (
        <div className="space-y-4">
            <div className="flex flex-wrap gap-4 p-4">
                <div>
                    <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
                        Search For A Word
                    </label>
                    <input name="search" id="search" type="text" onChange={(e)=>handleFilterChange({search: e.target.value})} className="bg-white dark:bg-gray-800 px-2 py-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                </div>
                <div>
                    <label htmlFor="sort" className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
                        Sort By
                    </label>
                    <select name="sort" id="sort" onChange={(e)=>handleSortChange(e)} className="bg-white dark:bg-gray-800 px-2 py-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                        <option value="">Default</option>
                        <option value="title-asc">Title (Asc)</option>
                        <option value="title-desc">Title (Desc)</option>
                    </select>
                </div>
                <TaskFilter onFilterChange={handleFilterChange} filters={filters} />
            </div>
            <div className="space-y-4">
                {taskElements}
            </div>
        </div>
    )
}

export { TaskList };