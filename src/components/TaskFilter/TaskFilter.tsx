import type { TaskFilterProps } from "../../types"

function TaskFilter({ onFilterChange, filters = { status: "", priority: "", search: "" } }: TaskFilterProps) {

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement|HTMLInputElement>) => {
        const { name, value } = event.target;
        onFilterChange({[name]: value});
    }

    // Get active filters (non-empty values)
    const activeFilters = Object.entries(filters)
        .filter(([_, value]) => value !== "")
        .map(([key, value]) => ({
            key: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize key name
            value: value
        }));
    
    return (
        <>
            <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
                    Status
                </label>
                <select name="status" id="status" value={filters.status} onChange={handleChange} className="bg-white dark:bg-gray-800 px-2 py-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                    <option value="">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>
            </div>
            <div>
                <label htmlFor="priority" className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
                    Priority
                </label>
                <select name="priority" id="priority" value={filters.priority} onChange={handleChange} className="bg-white dark:bg-gray-800 px-2 py-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                    <option value="">All Priorities</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </div>
            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-white">Active Filters:</label>
                {activeFilters.length > 0 ? (
                    <ul className="flex flex-wrap gap-2">
                        {activeFilters.map(({ key, value }) => (
                            <li key={key} className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 px-3 py-1 rounded-full text-sm">
                                {key}: <strong>{value}</strong>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500 text-sm">No filters applied</p>
                )}
            </div>
        </>
    )
}

export { TaskFilter };