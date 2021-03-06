const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');

const OUTPUT_DIR = path.resolve(__dirname, 'output');
const outputPath = path.join(OUTPUT_DIR, 'team.html');

const render = require('./lib/htmlRenderer');

let employeeData = []

const initialQuestion = () => {
  inquirer.prompt([
    {
      type: 'list',
      name: 'role',
      message: 'What is this persons role?',
      choices: [Manager, Engineer, Intern]
    }
  ])
    .then(answer => {
      if (answer.role === 'Manager') {
        managerData()
      } else if (answer.role === 'Engineer') {
        engineerData()
      } else if (answer.role === 'Intern') {
        internData()
      }
      else {
        console.log('Done')
        return
      }
    })
}

initialQuestion()

const internData = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'internName',
      message: 'What is the name of the intern?'
    },
    {
      type: 'input',
      name: 'id',
      message: 'What is their employee ID?'
    },
    {
      type: 'input',
      name: 'email',
      message: 'What is their email address?'
    },
    {
      type: 'input',
      name: 'school',
      message: 'What school does the intern go too?'
    },
    {
      type: 'confirm',
      name: 'addCheck',
      message: 'Do you have any other employees to add?'
    }
  ])
    .then(answers => {
      const intern = new Intern(answers.interName, answers.id, answers.email, answers.school)
      employeeData.push(intern)
      console.log(employeeData)

      if (answers.addCheck) {
        initialQuestion()
      } else {
        let data = render(employeeData)
        fs.writeFile(outputPath, data, (err) => {
          if (err) throw err
          console.log('The File Has Been Saved')
        })
      }
    })
}

const engineerData = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'engineerName',
      message: 'What is the name of the engineer?'
    },
    {
      type: 'input',
      name: 'id',
      message: 'What is the engineers employee ID?'
    },
    {
      type: 'input',
      name: 'email',
      message: 'What is their email?'
    },
    {
      type: 'input',
      name: 'github',
      message: 'What is their Github username?'
    },
    {
      type: 'confirm',
      name: 'addCheck',
      message: 'Do you have any other employees to add?'
    }
  ])
    .then(answers => {
      const engineer = new Engineer(answers.engineerName, answers.id, answers.email, answers.github)
      employeeData.push(engineer)

      console.log(employeeData)

      if (answers.addCheck) {
        initialQuestion()
      } else {
        let data = render(outputPath, data, (err) => {
          if (err) throw err
          console.log('File has been saved')
        })
      }
    })
}

const managerData = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'managerName',
      message: 'What is the managers name?'
    },
    {
      type: 'input',
      name: 'id',
      message: 'What is the managers employee ID?'
    },
    {
      type: 'input',
      name: 'email',
      message: 'What is their email address?'
    },
    {
      type: 'input',
      name: 'officeNumber',
      message: 'What is the managers office number?'
    },
    {
      type: 'confirm',
      name: 'addCheck',
      message: 'Do you have any other employees to add?'
    }
  ])
    .then(answers => {
      const manager = new Manager(answers.managerName, answers.id, answers.email, answers.officeNumber)
      employeeData.push(manager)

      console.log(employeeData)

      if (answers.addCheck) {
        initialQuestion()
      } else {
        let data = render(employeeData)
        fs.writeFile(outputPath, data, (err) => {
          if (err) throw err
          console.log('File has been saved')
        })
      }
    })
}


// {
//   type: '',
//     name: '',
//       message: ''
// }
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
