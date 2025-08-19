interface BmiCalculatorValues {
  height: number;
  weight: number;
}

const parseBmiInputs = (args: string[]): BmiCalculatorValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  }

  throw new Error(
    'Given values are not numbers. Please provide valid numbers for height and weight.',
  );
};

export const calculateBmi = (height: number, weight: number) => {
  const bmi = weight / (height / 100) ** 2;
  if (bmi < 25) {
    return 'Normal range';
  }
  return 'Overweight';
};

if (require.main === module) {
  try {
    const { height, weight } = parseBmiInputs(process.argv);
    const result = calculateBmi(
      height,
      weight
    );
    console.log(result);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
  }
}
