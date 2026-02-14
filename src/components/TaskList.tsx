import { useMemo } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useTaskStore } from '@/store/useTaskStore'
import TaskItem from './TaskItem'
import EmptyState from './EmptyState'

export default function TaskList() {
  const tasks = useTaskStore((state) => state.tasks)
  const filter = useTaskStore((state) => state.filter)

  const filteredTasks = useMemo(() => {
    switch (filter) {
      case 'active':
        return tasks.filter((t) => !t.completed)
      case 'completed':
        return tasks.filter((t) => t.completed)
      default:
        return tasks
    }
  }, [tasks, filter])

  if (filteredTasks.length === 0) {
    return <EmptyState />
  }

  return (
    <div className="flex flex-col gap-2 px-6 pb-8">
      <AnimatePresence mode="popLayout">
        {filteredTasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </AnimatePresence>
    </div>
  )
}
