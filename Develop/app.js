const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const util = require('util')
const writeFileAsync = util.promisify(fs.writeFile);
// const readFileAsync = util.promisify(fs.readFile());

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employees= [];

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
                        type: "number",
                        message: "What's their office number?",
                        name: "office"
                    })
                    const { office } = officeNum ;
                    console.log(officeNum)
                    const manager = new Manager (name, id, email, office);
                    employees.push(manager);
                    console.log(employees)
                    break;

                case "Engineer":
                    const githubName = await inquirer.prompt({
                        type: "input",
                        message: "What's their github username?",
                        name: "github"
                    })
                    const { github } = githubName;
                    const engineer = new Engineer (name, id, email, github);
                    employees.push(engineer);
                    break;

                case "Intern":
                    const schoolName = await inquirer.prompt({
                        type: "input",
                        message: "Where did they go to school?",
                        name: "school"
                    })
                    const { school } = schoolName;
                    const intern = new Intern (name, id, email, school);
                    employees.push(intern);
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
        
        function createTeam() {
            if(!fs.existsSync(OUTPUT_DIR)){
                fs.mkdirSync(OUTPUT_DIR)
            }
            fs.writeFileSync(outputPath, render(employees), "utf-8")
        }
        createTeam()
    }
    catch (err) {
        console.log(err);
    }
};

generateProfile();


