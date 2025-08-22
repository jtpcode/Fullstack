import DiaryEntryComponent from './DiaryEntryComponent.tsx'
import { DiaryEntry } from '../types.ts'

interface DiaryEntriesProps {
  diaryEntries: DiaryEntry[];
}

const DiaryEntries= ({ diaryEntries }: DiaryEntriesProps) => {
  return (
    <div>
      <h2>Diary Entries</h2>
      <ul>
        {diaryEntries.map(entry => (
          <li key={entry.id}>
            <DiaryEntryComponent entry={entry} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default DiaryEntries