const readline = require('readline');
const url = "https://jsonplaceholder.typicode.com/todos";
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

const fetchData = async () => (await fetch(url)).json();
const printList = (title, data) => console.log(`List of ${title}: `, data);

const options = [
  response => printList('Pending IDs', response.map(element => element.id)),
  response => printList('Titles and IDs', response.map(element => ({ id: element.id, title: element.title }))),
  response => printList('Unresolved IDs and Titles', response.filter(element => !element.completed).map(element => ({ id: element.id, title: element.title }))),
  response => printList('Resolved IDs and Titles', response.filter(element => element.completed).map(element => ({ id: element.id, title: element.title }))),
  response => printList('Pending IDs and UserIDs', response.map(element => ({ id: element.id, userId: element.userId }))),
  response => printList('Resolved IDs and UserIDs', response.filter(element => element.completed).map(element => ({ id: element.id, userId: element.userId }))),
  response => printList('Unresolved IDs and UserIDs', response.filter(element => !element.completed).map(element => ({ id: element.id, userId: element.userId }))),
];

const showMenu = () => {
  console.log("\n--- Menu ===");
  for (let i = 1; i <= 8; i++) console.log(`${i}. Show ${i === 5 ? 'all ' : ''}elements ${i > 4 && i < 8 ? 'resolved ' : ''}(ID${i !== 5 ? ' and Title' : ''}${i > 4 ? ' and UserID' : ''})`);
  console.log("8. Exit");
};

const runApp = async () => {
  const data = await fetchData();
  let option;

  const askOption = () => rl.question('Select an option between 1 and 8: ', input => {
    option = parseInt(input);
    if (option >= 1 && option <= 8) options[option - 1](data);
    else console.log("Invalid option. Please enter a number within the range of values.");
    if (option !== 8) askOption();
    else rl.close();
  });

  showMenu();
  askOption();
};

runApp();
