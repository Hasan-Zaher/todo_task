import { useState, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'
import { Plus, X } from 'lucide-react'
import { useTaskStore } from '@/store/useTaskStore'

interface FormData {
  title: string
  description: string
}

export default function AddTaskForm() {
  const { t } = useTranslation()
  const addTask = useTaskStore((state) => state.addTask)
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null)


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: { title: '', description: '' },
  })


  const onSubmit = useCallback(
    (data: FormData) => {
      addTask(data.title.trim(), data.description.trim() || undefined, selectedEmoji || undefined)
      toast.success(t('toast.taskAdded'))
      reset()
      setSelectedEmoji(null)
    },
    [addTask, reset, selectedEmoji, t]
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="px-6"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-xl border border-border bg-card p-5"
      >
        <div className="flex items-start gap-3">      
          {/* Title input */}
          <div className="flex-1">
            <input
              {...register('title', {
                required: t('form.titleRequired'),
                minLength: { value: 2, message: t('form.titleMinLength') },
              })}
              placeholder={t('form.titlePlaceholder')}
              className="h-11 w-full rounded-lg border border-border bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/20 focus:outline-none"
            />
            <AnimatePresence>
              {errors.title && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-1.5 text-xs text-destructive"
                >
                  {errors.title.message}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Submit button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={!isValid}
            className="flex h-11 shrink-0 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground transition-opacity disabled:opacity-40"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">{t('form.addTask')}</span>
          </motion.button>
        </div>

        {/* Description field */}
        <div className="mt-3">
          <textarea
            {...register('description')}
            placeholder={t('form.descriptionPlaceholder')}
            rows={2}
            className="w-full resize-none rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/20 focus:outline-none"
          />
        </div>

        {/* Clear emoji */}
        <AnimatePresence>
          {selectedEmoji && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-2 flex items-center gap-2"
            >
              <span className="text-xs text-muted-foreground">Selected:</span>
              <span className="text-lg">{selectedEmoji}</span>
              <button
                type="button"
                onClick={() => setSelectedEmoji(null)}
                className="text-muted-foreground hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </motion.div>
  )
}
