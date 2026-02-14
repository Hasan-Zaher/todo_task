import { useState, useCallback, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { toast } from 'sonner'
import { Check, Trash2, Calendar } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { useTaskStore } from '@/store/useTaskStore'
import type { Task } from '@/types/task'
import ConfirmDialog from './ConfirmDialog'
import { cn } from '@/lib/utils'
import { ar, enUS } from 'date-fns/locale'


interface TaskItemProps {
  task: Task
}

export default function TaskItem({ task }: TaskItemProps) {
  const { t ,i18n } = useTranslation()
  const toggleTask = useTaskStore((state) => state.toggleTask)
  const deleteTask = useTaskStore((state) => state.deleteTask)
  const [showConfirm, setShowConfirm] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const checkRef = useRef<HTMLButtonElement>(null)


  const getDateFnsLocale = () => {
    switch (i18n.language) {
      case 'ar':
        return ar
      case 'en':
      default:
        return enUS
    }
  }

  const handleToggle = useCallback(() => {
    if (checkRef.current) {
      gsap.fromTo(
        checkRef.current,
        { scale: 0.5, rotation: -45 },
        { scale: 1, rotation: 0, duration: 0.4, ease: 'back.out(2)' }
      )
    }
    toggleTask(task.id)
    toast.success(task.completed ? t('toast.taskIncomplete') : t('toast.taskCompleted'))
  }, [task.id, task.completed, toggleTask, t])

  const handleDelete = useCallback(() => {
    setShowConfirm(true)
  }, [])

  const confirmDelete = useCallback(() => {
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        x: -200,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          deleteTask(task.id)
          toast.success(t('toast.taskDeleted'))
        },
      })
    } else {
      deleteTask(task.id)
      toast.success(t('toast.taskDeleted'))
    }
    setShowConfirm(false)
  }, [task.id, deleteTask, t])

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
      )
    }
  }, [])


  const timeAgo = formatDistanceToNow(new Date(task.createdAt), {
    addSuffix: true,
    locale: getDateFnsLocale()
  })

  return (
    <>
      <motion.div
        ref={cardRef}
        layout
        whileHover={{ y: -2 }}
        transition={{ layout: { duration: 0.3 } }}
        className={cn(
          'group flex items-start gap-4 rounded-xl border bg-card p-4 transition-all',
          task.completed
            ? 'border-success/20 bg-success/5'
            : 'border-border hover:border-primary/30 hover:shadow-sm'
        )}
      >
        {/* Checkbox */}
        <motion.button
          ref={checkRef}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.85 }}
          onClick={handleToggle}
          aria-label={task.completed ? t('task.markIncomplete') : t('task.markComplete')}
          className={cn(
            'mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-all',
            task.completed
              ? 'border-success bg-success text-success-foreground'
              : 'border-border hover:border-primary'
          )}
        >
          {task.completed && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
        </motion.button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            {task.emoji && <span className="text-lg">{task.emoji}</span>}
            <h3
              className={cn(
                'text-sm font-medium leading-relaxed text-foreground transition-all',
                task.completed && 'text-muted-foreground line-through'
              )}
            >
              {task.title}
            </h3>
          </div>
          {task.description && (
            <p
              className={cn(
                'mt-1 text-xs leading-relaxed text-muted-foreground',
                task.completed && 'line-through opacity-60'
              )}
            >
              {task.description}
            </p>
          )}
          <div className="mt-2 flex items-center gap-1.5 text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span className="text-[11px]">{timeAgo}</span>
          </div>
        </div>

        {/* Delete button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleDelete}
          aria-label={t('task.delete')}
          className="shrink-0 rounded-lg p-2 text-muted-foreground opacity-0 transition-all hover:bg-destructive/10 hover:text-destructive group-hover:opacity-100"
        >
          <Trash2 className="h-4 w-4" />
        </motion.button>
      </motion.div>

      <ConfirmDialog
        open={showConfirm}
        onConfirm={confirmDelete}
        onCancel={() => setShowConfirm(false)}
      />
    </>
  )
}
