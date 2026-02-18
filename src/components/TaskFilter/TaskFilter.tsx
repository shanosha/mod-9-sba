import type { TaskFilterProps } from "../../types"

function TaskFilter({ onFilterChange }: TaskFilterProps) {

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;
        onFilterChange({[name]: value});
    }
    
    return (
        <div className="flex gap-4 p-4">
            <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                </label>
                <select name="status" id="status" onChange={handleChange} className="bg-white dark:bg-gray-800 px-2 py-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                    <option value="">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>
            </div>
            <div>
                <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
                    Priority
                </label>
                <select name="priority" id="priority" onChange={handleChange} className="bg-white dark:bg-gray-800 px-2 py-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                    <option value="">All Priorities</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </div>
        </div>
    )
}

export { TaskFilter };