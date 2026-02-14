import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle } from 'lucide-react'

interface ConfirmDialogProps {
  open: boolean
  onConfirm: () => void
  onCancel: () => void
}

export default function ConfirmDialog({ open, onConfirm, onCancel }: ConfirmDialogProps) {
  const { t } = useTranslation()

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 backdrop-blur-sm"
          onClick={onCancel}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="mx-4 w-full max-w-sm rounded-xl border border-border bg-card p-6 shadow-lg"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10">
                <AlertTriangle className="h-5 w-5 text-destructive" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">{t('confirm.title')}</h3>
            </div>

            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {t('confirm.message')}
            </p>

            <div className="mt-5 flex items-center justify-end gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onCancel}
                className="rounded-lg border border-border bg-secondary px-4 py-2.5 text-sm font-medium text-secondary-foreground transition-colors hover:bg-accent"
              >
                {t('confirm.cancel')}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onConfirm}
                className="rounded-lg bg-destructive px-4 py-2.5 text-sm font-medium text-destructive-foreground transition-colors hover:opacity-90"
              >
                {t('confirm.delete')}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
