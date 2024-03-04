const readlineSync = require('readline-sync');
const xlsx = require('xlsx');
const axios = require('axios');
require('dotenv').config()
const password = process.env.PASSWORD;
const excelFilePath = './mygigUsers.xlsx';


console.log('Пароль из переменной окружения:', password);

const inputSheetName = readlineSync.question('sheetname?: ');
console.log(`Вы ввели: ${inputSheetName}`);

const workbook = xlsx.readFile(excelFilePath);
const worksheet = workbook.Sheets[workbook.SheetNames[inputSheetName]];
const excelData = xlsx.utils.sheet_to_json(worksheet);


const jiraUrl = 'https://sm.mygig.tech/rest/api/latest/user/';

const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Basic ' + Buffer.from(`a.cherkashchenko:${password}`).toString('base64')
};
async function createUser(userData) {
    try {
        const response = await axios.post(jiraUrl, userData, { headers });
        console.log('Пользователь успешно создан: ', response.data);
    } catch (error) {
        console.error('Ошибка при создании пользователя: ' + userData.name, error.response.data.errors);
    }
}


async function processUsersData() {
    for (const userData of excelData) {
        await createUser({
            name: userData['name'],
            password: userData['password'],
            emailAddress: userData['emailAddress'],
            displayName: userData['displayName']
        });
    }
}

processUsersData();
