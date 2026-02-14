import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { useMemo } from 'react'
import { useTaskStore } from '@/store/useTaskStore'
import { ListTodo, CheckCircle2, Circle } from 'lucide-react'

export default function StatsBar() {
  const { t } = useTranslation()
  const tasks = useTaskStore((state) => state.tasks)

  const stats = useMemo(() => {
    const total = tasks.length
    const completed = tasks.filter((t) => t.completed).length
    const active = total - completed
    return { total, completed, active }
  }, [tasks])

  const items = [
    {
      label: t('stats.total'),
      value: stats.total,
      icon: ListTodo,
      color: 'text-primary',
      bg: 'bg-primary/10',
    },
    {
      label: t('stats.active'),
      value: stats.active,
      icon: Circle,
      color: 'text-orange-500',
      bg: 'bg-orange-500/10',
    },
    {
      label: t('stats.completed'),
      value: stats.completed,
      icon: CheckCircle2,
      color: 'text-success',
      bg: 'bg-success/10',
    },
  ]

  return (
    <div className="grid grid-cols-3 gap-3 px-6">
      {items.map((item, i) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 * i, duration: 0.4 }}
          className="flex items-center gap-3 rounded-xl border border-border bg-card p-4"
        >
          <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${item.bg}`}>
            <item.icon className={`h-5 w-5 ${item.color}`} />
          </div>
          <div>
            <motion.p
              key={item.value}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              className="text-xl font-bold text-foreground"
            >
              {item.value}
            </motion.p>
            <p className="text-xs text-muted-foreground">{item.label}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
