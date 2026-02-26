import { useState } from "react";
import type { TaskListProps } from "../../types";
import type { TaskStatus } from "../../types";
import { TaskItem } from "./TaskItem";
import { TaskFilter } from "../TaskFilter/TaskFilter";
import { filterTasks, sortTasks } from "../../utils/taskUtils";

// Component that displays a list of tasks.
function TaskList({ tasks, onStatusChange, onDelete, onUpdate}: TaskListProps){
    
    const [filters,setFilters] = useState({search: "", status: "", priority: ""});
    const [sort,setSort] = useState("");

    // Variable that uses a function to sort the list of tasks based on the sort dropdown controlled by the "sort" state variable.
    const sortedTasks = sortTasks(tasks,sort);

    // Variable that uses a function to filter the list of tasks based on the filter dropdowns controlled by the "filters" state variable.
    const filteredTasks = filterTasks(sortedTasks,filters);
    
    // Variable that takes the list of tasks (after they have been sorted and filtered), and converts to array to a list of elements with unique keys assigned.
    const taskElements = filteredTasks.map((task) =>
        <TaskItem
            key={task.id}
            task={task}
            onStatusChange={handleStatusChange}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
        />
    );

    // Callback function assigned to TaksItem components. Parent component updates a task status.
    function handleStatusChange (taskId: string, taskStatus: TaskStatus): void {
        onStatusChange(taskId,taskStatus);
    }

    // Callback function assigned to TaksItem components. Parent component updates a task details.
    function handleUpdate (taskId: string): void {
        onUpdate(taskId);
    }

    // Callback function assigned to TaksItem components. Parent component deletes a task.
    function handleDelete (taskId: string): void {
        onDelete(taskId);
    }

    // Callback function assigned to the TaksFilter component. Updates the "filters" state variable.
    function handleFilterChange(changedFilter: object): void {
        Object.entries(changedFilter).forEach(([key, value]) => {
            setFilters({...filters, [key]: value});
        });
    }

    // Function assigned to the sort dropdown. Updates the "sort" state variable.
    function handleSortChange(e: React.ChangeEvent<HTMLSelectElement>): void {
        const value = e.target.value;
        setSort(value);
    }

    return (
        <div className="space-y-4">
            <div className="flex flex-wrap gap-4 p-4">
                <div>
                    <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
                        Search For A Word In Title
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