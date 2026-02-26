import type { TaskStatisticsProps } from "../../types"
import { calculateTaskStats } from "../../utils/taskUtils"

// Task statistics component, which displays statistics about the array of tasks.
function TaskStatistics({tasks}:TaskStatisticsProps){

    const [total,pending,inProgress,completed] = calculateTaskStats(tasks)

    return (
        <>
            <div>
                <h2 className="font-medium">Statistics</h2>
                <div className="flex gap-4 text-xs justify-center mt-2">
                    <div>
                        <p>Total Tasks: {total}</p>
                    </div>
                    <div>
                        <p>Pending: {pending}</p>
                    </div>
                    <div>
                        <p>In Progress: {inProgress}</p>
                    </div>
                    <div>
                        <p>Completed: {completed}</p>
                    </div>
                </div>
            </div>
        </>
    )

}

export default TaskStatistics
