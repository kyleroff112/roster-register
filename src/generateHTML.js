const fs = require('fs');
const path = require('path');

function generateManagerCard(manager) {
  return `
    <div class="card">
      <h2>${manager.getName()}</h2>
      <h3>Manager</h3>
      <p>ID: ${manager.getId()}</p>
      <p>Email: <a href="mailto:${manager.getEmail()}">${manager.getEmail()}</a></p>
      <p>Office Number: ${manager.getOfficeNumber()}</p>
    </div>
  `;
}

function generateEngineerCard(engineer) {
  return `
    <div class="card">
      <h2>${engineer.getName()}</h2>
      <h3>Engineer</h3>
      <p>ID: ${engineer.getId()}</p>
      <p>Email: <a href="mailto:${engineer.getEmail()}">${engineer.getEmail()}</a></p>
      <p>GitHub: <a href="https://github.com/${engineer.getGithub()}" target="_blank">${engineer.getGithub()}</a></p>
    </div>
  `;
}

function generateInternCard(intern) {
  return `
    <div class="card">
      <h2>${intern.getName()}</h2>
      <h3>Intern</h3>
      <p>ID: ${intern.getId()}</p>
      <p>Email: <a href="mailto:${intern.getEmail()}">${intern.getEmail()}</a></p>
      <p>School: ${intern.getSchool()}</p>
    </div>
  `;
}

function generateHTML(teamMembers) {
  const managerCard = teamMembers
    .filter(member => member.getRole() === 'Manager')
    .map(manager => generateManagerCard(manager))
    .join('\n');
  const engineerCards = teamMembers
    .filter(member => member.getRole() === 'Engineer')
    .map(engineer => generateEngineerCard(engineer))
    .join('\n');
  const internCards = teamMembers
    .filter(member => member.getRole() === 'Intern')
    .map(intern => generateInternCard(intern))
    .join('\n');

  const teamHTML = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Team Profile</title>
  <!-- Bootstrap CSS -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
</head>

    <body>
      <header>
        <h1>Team Profile</h1>
      </header>
      <main>
        <div class="team-members">
          ${managerCard}
          ${engineerCards}
          ${internCards}
        </div>
      </main>
    </body>
    </html>
  `;

  fs.writeFile('output/team.html', teamHTML, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('Successfully generated team.html');
  });
}

module.exports = generateHTML;
