// Types and interfaces used for "TaskList" component.
  export type TaskStatus = 'pending' | 'in-progress' | 'completed';
  
  export interface Task {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
    priority: 'low' | 'medium' | 'high';
    dueDate: string;
  }
  
  export interface TaskListProps {
    tasks: Task[];
    onStatusChange: (taskId: string, newStatus: TaskStatus) => void;
    onDelete: (taskId: string) => void;
    onUpdate: (taskId: string) => void;
  }

// Interface used for "TaskItem" component.
  export interface TaskItemProps {
    task: Task;
    onStatusChange: (taskId: string, newStatus: TaskStatus) => void;
    onDelete: (taskId: string) => void;
    onUpdate: (taskId: string) => void;
  }

// Interface used for "TaskFilter" component.
  export interface TaskFilterProps {
    onFilterChange: (filters: {
      status?: TaskStatus;
      priority?: 'low' | 'medium' | 'high';
      search?: string;
    }) => void;
    filters?: {
      status: string;
      priority: string;
      search: string;
    };
  }

// Interfaces used for "TaskForm" component.
  export interface TaskFormProps {
    task?: Task,
    onAdd: (task: Task) => void;
    onUpdate: (task: Task) => void;
  }

  export interface FormErrors {
    title: string;
    description: string;
    dueDate: string;
  }

  // Interface used for "TaskStatistics" component.
  export interface TaskStatisticsProps {
    tasks:Task[]
  }