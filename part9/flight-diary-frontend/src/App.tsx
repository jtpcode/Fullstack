import { useState, useEffect } from 'react'

import DiaryEntries from './components/DiaryEntries'
import DiaryForm from './components/DiaryForm'
import Notification from './components/Notification'
import { DiaryEntry } from './types'
import { getAllDiaries } from './diaryService'

function App() {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([])
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    getAllDiaries().then(data => {
      setDiaryEntries(data)
    })
  }, [])

  const notify = (message: string) => {
    setMessage(message)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  return (
    <div>
      <h1>Flight diary</h1>

      <h2>Add new diary entry</h2>
      <Notification message={message} />
      <DiaryForm
        diaryEntries={diaryEntries}
        setDiaryEntries={setDiaryEntries}
        notify={notify}
      />
      <DiaryEntries diaryEntries={diaryEntries} />
    </div>
  )
}

export default App
