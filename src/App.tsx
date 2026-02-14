import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Toaster } from 'sonner'
import Header from '@/components/Header'
import StatsBar from '@/components/StatsBar'
import AddTaskForm from '@/components/AddTaskForm'
import FilterBar from '@/components/FilterBar'
import TaskList from '@/components/TaskList'

export default function App() {
  const { i18n } = useTranslation()

  useEffect(() => {
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = i18n.language
  }, [i18n.language])

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-2xl pb-10">
        <Header />

        <div className="flex flex-col gap-5">
          <StatsBar />
          <AddTaskForm />
          <FilterBar />
          <TaskList />
        </div>
      </div>

      <Toaster
        position="top-center"
        toastOptions={{
          className:
            'bg-card text-card-foreground border-border shadow-lg',
        }}
      />
    </div>
  )
}
