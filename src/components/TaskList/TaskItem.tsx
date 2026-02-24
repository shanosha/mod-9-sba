import type { ChangeEvent } from "react";
import type { TaskItemProps, TaskStatus } from "../../types";
import { PencilSquareIcon, XMarkIcon } from "@heroicons/react/16/solid";
import { formatDate } from "../../utils/taskUtils";

function TaskItem({ task, onStatusChange, onDelete, onUpdate }: TaskItemProps){

    function handleStatusChange (e: ChangeEvent<HTMLSelectElement>) {
        onStatusChange(task.id, e.target.value as TaskStatus)
    }

    function handleDelete () {
        onDelete(task.id)
    }

    const statusStyling = (): string => {
        let str = "";
        if(task.status == "pending") {str="bg-yellow-100 text-yellow-800"}
        if(task.status == "in-progress") {str="text-blue-800"}
        if(task.status == "completed") {str="text-green-800"}
        return str;
    }

    const priorityStyling = (): string => {
        let str = "";
        if(task.priority == "low") {str="text-green-600"}
        if(task.priority == "medium") {str="text-yellow-600"}
        if(task.priority == "high") {str="text-red-600"}
        return str;
    }

    return (
        <>
            <div className="p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white dark:bg-black dark:border-gray-700">
                <div className="flex justify-between items-start flex-col sm:flex-row">
                    <div>
                        <h3 className="text-lg font-semibold">
                            {task.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            {task.description}
                        </p>
                    </div>
                    <div className="flex gap-2 items-end">
                        <select
                            name="itemStatus"
                            defaultValue={task.status}
                            onChange={(e)=>handleStatusChange(e)}
                            className={`shadow px-2 py-1 rounded bg-white dark:bg-blue-100 sm:mx-2 sm:border-none border border-gray-300 sm:mt-0 mt-2 ${statusStyling()}`}
                        >
                            <option value="pending">Pending</option>
                            <option value="in-progress">In Progress</option>
                            <option value="completed">Completed</option>
                        </select>
                        <button aria-label="Edit" title="Edit" onClick={()=>onUpdate(task.id)} className="h-8 border border-gray-200 hover:bg-blue-200 bg-blue-100 rounded shadow text-blue-600 hover:text-blue-700">
                            <PencilSquareIcon className="size-6 inline p-0.5" />
                        </button>
                        <button aria-label="Delete" title="Delete" onClick={handleDelete} className="h-8 border border-gray-200 hover:bg-blue-200 bg-blue-100 rounded shadow text-blue-600 hover:text-blue-700 ">
                            <XMarkIcon className="size-6 inline p-0.5" />
                        </button>
                    </div>
                </div>
                <div className="mt-2 flex gap-4 text-sm">
                    <div>
                        Priority: <span className={priorityStyling()}>{task.priority.charAt(0).toUpperCase() + task.priority.slice(1).toLowerCase()}</span>
                    </div>
                    <div className="text-gray-500 dark:text-gray-400">
                        Due: {formatDate(task.dueDate)}
                    </div>
                </div>
            </div>
        </>
    )
}

export { TaskItem }