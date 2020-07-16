const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
// const util = require('util')
// const writeFileAsync = util.promisify(fs.writeFile());
// const readFileAsync = util.promisify(fs.readFile());

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employee= [];
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
function promptQs(){
    return inquirer.prompt([
        {
            type: 'input',
            message: 'What is the employee name?',
            name: 'name'
        },
        {
            type: 'input',
            message: 'What is the employee ID?',
            name: 'id'
        },
        {
            type: 'input',
            message: 'What is the employee email address?',
            name: 'email'
        },
        {
            type: 'list',
            message: 'What is the employee role in the company?',
            name: 'role',
            choices: ["Manager", "Engineer", "Intern"]
        }
    ])
};

async function generateProfile(){
    try {
        let wantsToCont = true;
        while (wantsToCont){
            const employeeProfile = await promptQs();
            const {name, id, email, role} = employeeProfile;
            console.log(employeeProfile);

            switch(role){
                case "Manager":
                    const officeNum = await inquirer.prompt({
                        type: "input",
                        message: "What's their office number?",
                        name: "officeNum"
                    })
                    const { office } =  officeNum ;
                    const manager = new Manager (name, id, email, office);
                    employee.push(manager);
                    console.log(employee)
                    break;

                case "Engineer":
                    const githubName = await inquirer.prompt({
                        type: "input",
                        message: "What's their github username?",
                        name: "github"
                    })
                    const { github } = githubName;
                    const engineer = new Engineer (name, id, email, github);
                    employee.push(engineer);
                    break;

                case "Intern":
                    const schoolName = await inquirer.prompt({
                        type: "input",
                        message: "Where did they go to school?",
                        name: "school"
                    })
                    const { school } = schoolName;
                    const intern = new Intern (name, id, email, school);
                    employee.push(intern);
                    break;
            }

            const addEmployee = await inquirer.prompt({
                type: 'list',
                message: "Add more empployee?",
                name: "add",
                choices: ["yes", "no"]
            });

            console.log(addEmployee)

            if(addEmployee.add === "no"){
                wantsToCont = false;
            }
        }
        
    //    const finalHTML = await render(employee);
    //    await writeFileAsync(outputPath, finalHTML, 'utf-8');
    }
    catch (err) {
        console.log(err);
    }
};

generateProfile();


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
