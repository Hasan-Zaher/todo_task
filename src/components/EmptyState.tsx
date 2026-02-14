import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { useTaskStore } from '@/store/useTaskStore'
import { ClipboardList, CheckCircle2, Inbox } from 'lucide-react'

export default function EmptyState() {
  const { t } = useTranslation()
  const filter = useTaskStore((state) => state.filter)

  const config = {
    all: {
      icon: ClipboardList,
      title: t('task.noTasks'),
      desc: t('task.noTasksDesc'),
    },
    completed: {
      icon: CheckCircle2,
      title: t('task.noCompleted'),
      desc: t('task.noCompletedDesc'),
    },
    active: {
      icon: Inbox,
      title: t('task.noActive'),
      desc: t('task.noActiveDesc'),
    },
  }

  const { icon: Icon, title, desc } = config[filter]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center py-16"
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted"
      >
        <Icon className="h-8 w-8 text-muted-foreground" />
      </motion.div>
      <h3 className="mt-4 text-base font-semibold text-foreground">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
    </motion.div>
  )
}
