import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { useTaskStore } from '@/store/useTaskStore'
import type { FilterType } from '@/types/task'
import { cn } from '@/lib/utils'

const FILTERS: FilterType[] = ['all', 'active', 'completed']

export default function FilterBar() {
  const { t } = useTranslation()
  const filter = useTaskStore((state) => state.filter)
  const setFilter = useTaskStore((state) => state.setFilter)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.4 }}
      className="flex items-center gap-1 px-6"
    >
      <div className="inline-flex rounded-lg border border-border bg-card p-1">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              'relative rounded-md px-4 py-2 text-sm font-medium transition-colors',
              filter === f
                ? 'text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {filter === f && (
              <motion.div
                layoutId="activeFilter"
                className="absolute inset-0 rounded-md bg-primary"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">{t(`filter.${f}`)}</span>
          </button>
        ))}
      </div>
    </motion.div>
  )
}
