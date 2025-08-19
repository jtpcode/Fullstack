/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from "express";
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from "./exerciseCalculator";

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;

  const heightNum = Number(height);
  const weightNum = Number(weight);

  if (!height || !weight || isNaN(heightNum) || isNaN(weightNum)) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  try {
    const bmi = calculateBmi(heightNum, weightNum);
    return res.json({
      weight: weightNum,
      height: heightNum,
      bmi
    });
  } catch (error: unknown) {
      let errorMessage = 'Something went wrong in BMI calculation.';
      if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
      }
      return res.status(500).json({ error: errorMessage });
  }
});

app.post('/exercises', (req, res) => {
  const exerciseData = req.body;

  if (!exerciseData || !exerciseData.daily_exercises || !exerciseData.target) {
    return res.status(400).json({ error: 'parameters missing' });
  }

  if (!Array.isArray(exerciseData.daily_exercises) || exerciseData.daily_exercises.length === 0 
      || exerciseData.daily_exercises.some(isNaN) || isNaN(exerciseData.target)) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  try {
    const result = calculateExercises(exerciseData.daily_exercises, exerciseData.target);
    return res.json(result);
  } catch (error: unknown) {
      let errorMessage = 'Something went wrong in exercise calculation.';
      if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
      }
      return res.status(500).json({ error: errorMessage });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
