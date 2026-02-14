import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Sun, Moon, Languages } from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'
import { useCallback } from 'react'

export default function Header() {
  const { t, i18n } = useTranslation()
  const { theme, toggleTheme } = useTheme()

  const toggleLanguage = useCallback(() => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en'
    i18n.changeLanguage(newLang)
    localStorage.setItem('app-language', newLang)
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = newLang
  }, [i18n])

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-between px-6 py-5"
    >
      <div>
        <motion.h1
          className="text-2xl font-bold tracking-tight text-foreground md:text-3xl"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          {t('app.title')}
        </motion.h1>
        <motion.p
          className="mt-1 text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {t('app.subtitle')}
        </motion.p>
      </div>

      <div className="flex items-center gap-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleLanguage}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-foreground transition-colors hover:bg-accent"
          aria-label={t('language')}
        >
          <Languages className="h-4 w-4" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleTheme}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-foreground transition-colors hover:bg-accent"
          aria-label={t('theme')}
        >
          {theme === 'light' ? (
            <Moon className="h-4 w-4" />
          ) : (
            <Sun className="h-4 w-4" />
          )}
        </motion.button>
      </div>
    </motion.header>
  )
}
