interface BmiCalculatorValues {
  height: number;
  weight: number;
}

const parseArguments = (args: string[]): BmiCalculatorValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    }
  }

  throw new Error(
    'Given values are not numbers. Please provide valid numbers for height and weight.',
  );
}

const bmiCalculator = (height: number, weight: number, printText: string) => {
  const bmi = weight / (height / 100) ** 2;
  if (bmi < 25) {
    printText = 'Normal range';
  } else {
    printText = 'Overweight';
  }
  console.log(printText);
}

try {
  const { height, weight } = parseArguments(process.argv);
  bmiCalculator(
    height,
    weight,
    `BMI for height ${height}cm and weight ${weight}kg is:`,
  );
} catch (error: unknown) {
  let errorMessage = 'Something went wrong.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
