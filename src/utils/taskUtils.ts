import type { Task } from "../types";

export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit' 
    });
}

export const loadData = () => {
    try {
        const storedValue = localStorage.getItem("tasks");
        if (storedValue === null) {
            return null;
        }
        return JSON.parse(storedValue);
    } catch (error) {
        console.warn(`Could not get or parse item "tasks" from localStorage:`, error);
        return null;
    }
}

export const calculateTaskStats = (tasks:Task[]) => {
    const total = tasks.length
    const pending = tasks.filter((t)=>t.status == "pending").length
    const inProgress = tasks.filter((t)=>t.status == "in-progress").length
    const completed = tasks.filter((t)=>t.status == "completed").length
    return [total,pending,inProgress,completed];
}

export const filterTasks = (tasks:Task[],filters:{status:string,priority:string,search:string}) => {
    return tasks.filter((task) => {
        let filteredTasks = false;
        if(task.status.includes(filters.status) && task.priority.includes(filters.priority) && task.title.includes(filters.search)) {filteredTasks = true}
        return filteredTasks;
    });
}

export const sortTasks = (tasks:Task[],sort:string):Task[] => {
    if(sort == "title-asc"){
        return [...tasks].sort((a, b) => a.title.localeCompare(b.title));
    }
    if(sort == "title-desc"){
        return [...tasks].sort((a, b) => b.title.localeCompare(a.title));
    }
    else{
        return tasks;
    }
}

export const fieldInvalid = (fieldValue: string) => {
    return fieldValue.trim() == "";
}