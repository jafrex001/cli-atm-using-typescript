// An ATM Machine using Typescript accessed through the command line. Use the inquirer package to take userinput through the cli. The user can register an account and also login using a name and a pin. Account balance will be generated randomly. User can also withdraw and deposit money. 
//Use the chalk library after the main project is complete to make the project look better.
import inquirer from "inquirer";
let mainMenuInput = await inquirer.prompt([
    {
        name: 'mainOptions',
        type: 'list',
        choices: ['Register', 'Login']
    }
]);
if (mainMenuInput.mainOptions === 'Register') {
    console.log("Register working");
}
else if (mainMenuInput.mainOptions === 'Login') {
    console.log("Login working");
}
