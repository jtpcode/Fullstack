import { useState } from "react"
import { createDiaryEntry } from "../diaryService"
import { DiaryEntry } from "../types"

interface DiaryFormProps {
  diaryEntries: DiaryEntry[]
  setDiaryEntries: (diaryEntries: DiaryEntry[]) => void
  notify: (message: string) => void
}

const DiaryForm = ({ diaryEntries, setDiaryEntries, notify }: DiaryFormProps) => {
  const [date, setDate] = useState<string>('')
  const [visibility, setVisibility] = useState<string>('great')
  const [weather, setWeather] = useState<string>('sunny')
  const [comment, setComment] = useState<string>('')

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault()
    if (!date) {
      notify('Error: Date is required.')
      return
    }
    createDiaryEntry({ date, visibility, weather, comment })
      .then((data) => {
        notify(`Diary entry for ${data.date} created successfully.`)
        setDiaryEntries(diaryEntries.concat(data))
      })
      .catch((error: unknown) => {
        let errorMessage = 'Diary entry creation failed.'
        if (error instanceof Error) {
          errorMessage += ' Error: ' + error.message;
        }
        console.log(errorMessage);
      })
    
    setComment('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Date:{' '}
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
      </div>
        <div>
          <label>Visibility: </label>
          <label>
            <input
              type="radio"
              name="visibility"
              value="great"
              checked={visibility === 'great'}
              onChange={() => setVisibility('great')}
            />
            great
          </label>
          <label>
            <input
              type="radio"
              name="visibility"
              value="good"
              checked={visibility === 'good'}
              onChange={() => setVisibility('good')}
            />
            good
          </label>
          <label>
            <input
              type="radio"
              name="visibility"
              value="ok"
              checked={visibility === 'ok'}
              onChange={() => setVisibility('ok')}
            />
            ok
          </label>
          <label>
            <input
              type="radio"
              name="visibility"
              value="poor"
              checked={visibility === 'poor'}
              onChange={() => setVisibility('poor')}
            />
            poor
          </label>
        </div>
        <div>
          <label>Weather: </label>
          <label>
            <input
              type="radio"
              name="weather"
              value="sunny"
              checked={weather === 'sunny'}
              onChange={() => setWeather('sunny')}
            />
            sunny
          </label>
          <label>
            <input
              type="radio"
              name="weather"
              value="rainy"
              checked={weather === 'rainy'}
              onChange={() => setWeather('rainy')}
            />
            rainy
          </label>
          <label>
            <input
              type="radio"
              name="weather"
              value="cloudy"
              checked={weather === 'cloudy'}
              onChange={() => setWeather('cloudy')}
            />
            cloudy
          </label>
          <label>
            <input
              type="radio"
              name="weather"
              value="stormy"
              checked={weather === 'stormy'}
              onChange={() => setWeather('stormy')}
            />
            stormy
          </label>
          <label>
            <input
              type="radio"
              name="weather"
              value="windy"
              checked={weather === 'windy'}
              onChange={() => setWeather('windy')}
            />
            windy
          </label>
        </div>
      <div>
        Comment:{' '}
        <input
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      </div>
      
      <button type="submit">Add</button>
    </form>
  )
}

export default DiaryForm