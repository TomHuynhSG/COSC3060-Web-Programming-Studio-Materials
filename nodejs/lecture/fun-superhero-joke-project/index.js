import joke from 'give-me-a-joke';
import {randomSuperhero} from 'superheroes';
import chalk from 'chalk';

// Adding color to terminal string output using chalk package
const coloredText = chalk.red('This is red text using chalk package');
console.log(coloredText);

// Generating a superhero name using superheroes package
const superheroName = randomSuperhero();
console.log(chalk.green('Superhero name of the day:'));
console.log(chalk.cyan(superheroName));

// Generating a joke using give-me-a-joke package
joke.getRandomDadJoke(function (joke) {
  console.log(chalk.green('Joke of the day:'));
  console.log(chalk.bold.red(joke));
});


