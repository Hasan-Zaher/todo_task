import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Task, FilterType } from '@/types/task'

interface TaskStore {
  tasks: Task[]
  filter: FilterType
  setFilter: (filter: FilterType) => void
  addTask: (title: string, description?: string, emoji?: string) => void
  toggleTask: (id: string) => void
  deleteTask: (id: string) => void
  getFilteredTasks: () => Task[]
}

export const useTaskStore = create<TaskStore>()(
  persist(
    (set, get) => ({
      tasks: [],
      filter: 'all',

      setFilter: (filter: FilterType) => set({ filter }),

      addTask: (title: string, description?: string, emoji?: string) => {
        const newTask: Task = {
          id: crypto.randomUUID(),
          title,
          description: description || undefined,
          completed: false,
          createdAt: new Date().toISOString(),
          emoji: emoji || undefined,
        }
        set((state) => ({ tasks: [newTask, ...state.tasks] }))
      },

      toggleTask: (id: string) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, completed: !task.completed } : task
          ),
        }))
      },

      deleteTask: (id: string) => {
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        }))
      },

      getFilteredTasks: () => {
        const { tasks, filter } = get()
        switch (filter) {
          case 'active':
            return tasks.filter((t) => !t.completed)
          case 'completed':
            return tasks.filter((t) => t.completed)
          default:
            return tasks
        }
      },
    }),
    {
      name: 'task-22-storage',
    }
  )
)
