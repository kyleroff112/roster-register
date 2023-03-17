const inquirer = require('inquirer');
const generateHTML = require('./generateHTML');
const Manager = require('../lib/Manager');
const Engineer = require('../lib/Engineer');
const Intern = require('../lib/Intern');

const teamMembers = [];

function promptManager() {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: "Enter the team manager's name:",
    },
    {
      type: 'input',
      name: 'id',
      message: "Enter the team manager's ID:",
    },
    {
      type: 'input',
      name: 'email',
      message: "Enter the team manager's email:",
    },
    {
      type: 'input',
      name: 'officeNumber',
      message: "Enter the team manager's office number:",
    },
  ]).then(answers => {
    const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
    teamMembers.push(manager);
    promptAddMember();
  });
}

function promptAddMember() {
  return inquirer.prompt([
    {
      type: 'list',
      name: 'memberType',
      message: 'Add a team member:',
      choices: ['Engineer', 'Intern', 'Finish building my team'],
    },
  ]).then(answers => {
    if (answers.memberType === 'Engineer') {
      promptEngineer();
    } else if (answers.memberType === 'Intern') {
      promptIntern();
    } else {
      generateHTML(teamMembers);
    }
  });
}

function promptEngineer() {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: "Enter the engineer's name:",
    },
    {
      type: 'input',
      name: 'id',
      message: "Enter the engineer's ID:",
    },
    {
      type: 'input',
      name: 'email',
      message: "Enter the engineer's email:",
    },
    {
      type: 'input',
      name: 'github',
      message: "Enter the engineer's GitHub username:",
    },
  ]).then(answers => {
    const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
    teamMembers.push(engineer);
    promptAddMember();
  });
}

function promptIntern() {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: "Enter the intern's name:",
    },
    {
      type: 'input',
      name: 'id',
      message: "Enter the intern's ID:",
    },
    {
      type: 'input',
      name: 'email',
      message: "Enter the intern's email:",
    },
    {
      type: 'input',
      name: 'school',
      message: "Enter the intern's school:",
    },
  ]).then(answers => {
    const intern = new Intern(answers.name, answers.id, answers.email, answers.school);
    teamMembers.push(intern);
    promptAddMember();
  });
}

promptManager();
