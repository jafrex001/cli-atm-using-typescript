// An ATM Machine using Typescript accessed through the command line. Use the inquirer package to take userinput through the cli. The user can register an account and also login using a name and a pin. Account balance will be generated randomly. User can also withdraw and deposit money.
//Use the chalk library after the main project is complete to make the project look better.

import inquirer from "inquirer";
import * as fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";

let usersFilePath = "./users.json";

interface User {
  id: string;
  username: string;
  pin: number;
  balance: number;
}

async function readUsersFromFile(): Promise<User[]> {
  try {
    const userData: string = await fs.readFile(usersFilePath, "utf-8");
    return JSON.parse(userData) as User[];
  } catch (error) {
    console.log("Error reading file, returning empty array.", error);
    return [];
  }
}

async function writeUsersInFile(User: User): Promise<void> {
  try {
    const userData = JSON.stringify(User, null, 2);
    await fs.writeFile(usersFilePath, userData, "utf-8");
  } catch (error) {
    console.log("Error writing to file.", error);
  }
}

let mainMenuInput = await inquirer.prompt([
  {
    name: "mainOptions",
    type: "list",
    choices: ["Register", "Login"],
  },
]);

if (mainMenuInput.mainOptions === "Register") {
  let registerInput = await inquirer.prompt([
    {
      name: "registerOptions",
      type: "input",
      message: "Enter the username you would like to register with.",
    },
  ]);
} else if (mainMenuInput.mainOptions === "Login") {
  let loginInput = await inquirer.prompt([
    {
      name: "loginOptions",
      type: "input",
      message: "Enter your username.",
    },
  ]);
}
