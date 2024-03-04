// const readline = require('readline');

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

// let test = '';

// rl.question('Введите слово: ', (answer) => {
//   console.log(`Вы ввели: ${answer}`);
//   test = answer; 
//   rl.close();
  
//   setTimeout(() => {
//     console.log('вы получили:'+ test);
//   }, 5000);
// });

const readlineSync = require('readline-sync');
const input = readlineSync.question('Введите что-то с клавиатуры: ');
console.log(`Вы ввели: ${input}`);