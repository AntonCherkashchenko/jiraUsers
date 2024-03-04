require('dotenv').config();
const axios = require('axios');
const xlsx = require('xlsx');
const readlineSync = require('readline-sync');
const password = process.env.PASSWORD;


const inputSheetName = readlineSync.question('sheetname?: ');
console.log(`Вы ввели: ${inputSheetName}`);
const groupName = readlineSync.question('groupname?: ');
console.log(`Вы ввели: ${groupName}`);

const excelFilePath = './mygigUsers.xlsx';

const workbook = xlsx.readFile(excelFilePath);
const worksheet = workbook.Sheets[workbook.SheetNames[inputSheetName]];
const excelData = xlsx.utils.sheet_to_json(worksheet);

const jiraUrl = `https://sm.mygig.tech/rest/api/latest/group/user?groupname=${groupName}`;

const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Basic ' + Buffer.from(`a.cherkashchenko:${password}`).toString('base64')
};

async function addUserToGroup(userData) {
    try {
        const response = await axios.post(jiraUrl, { name: userData.name }, { headers });
        console.log('Пользователь успешно добавлен в группу ' + userData.name);
    } catch (error) {
        console.error('Ошибка при добавлении пользователя в группу: ' + userData.name, error.response.data);
    }
}

async function processUsersData() {
    for (const userData of excelData) {
        await addUserToGroup(userData);
    }
}

processUsersData();
