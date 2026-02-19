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