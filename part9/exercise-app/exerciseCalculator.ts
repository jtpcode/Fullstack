interface ExerciseCalculatorValues {
  dailyExerciseHours: number[];
  targetHoursPerDay: number;
}

const parseArguments = (args: string[]): ExerciseCalculatorValues  => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const targetHours = Number(args[2]);
  const dailyHours = args.slice(3).map(Number);
  const hoursAreNumbers = dailyHours.every(num => !isNaN(num));

  if (hoursAreNumbers && !isNaN(targetHours)) {
    return {
      dailyExerciseHours: dailyHours,
      targetHoursPerDay: targetHours,
    }
  }

  throw new Error(
    'Given values are not numbers.',
  );
}

interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const exerciseCalculator = (dailyExerciseHours: number[], targetHoursPerDay: number): ExerciseResult => {
  const periodLength = dailyExerciseHours.length;
  const trainingDays = dailyExerciseHours.filter(hours => hours > 0).length;
  const success = dailyExerciseHours.every(hours => hours >= targetHoursPerDay);
  const target = targetHoursPerDay;
  const average = dailyExerciseHours.reduce((a, b) => a + b, 0) / periodLength;

  let rating: number;
  let ratingDescription: string;

  if (average >= targetHoursPerDay) {
    rating = 3;
    ratingDescription = 'Great, you met your target.';
  } else if (average >= targetHoursPerDay * 0.5) {
    rating = 2;
    ratingDescription = 'You are halfway there.';
  } else {
    rating = 1;
    ratingDescription = 'You need to put in more effort.';
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
}

try {
  const { dailyExerciseHours, targetHoursPerDay } = parseArguments(process.argv);
  const result = exerciseCalculator(
    dailyExerciseHours,
    targetHoursPerDay
  );
  console.log(result)
} catch (error: unknown) {
  let errorMessage = 'Something went wrong.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
