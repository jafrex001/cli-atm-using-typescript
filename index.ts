import inquirer from "inquirer";
import * as fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";

interface User {
  id: string;
  username: string;
  pin: number;
  balance: number;
}

let usersFilePath: string = "./users.json";

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
      name: "registrationUsernameInput",
      type: "input",
      message: "Enter the username you would like to register with:",
    },
    {
      name: "registrationPinInput",
      type: "number",
      message: "Create a 4 digit pin for your account:",
    },
  ]);

  async function createUser(): Promise<User | null> {
    const usersData: User[] = await readUsersFromFile();
    let registrationUsername: string = registerInput.registrationUsernameInput;
    let registrationPin: number = registerInput.registrationPinInput;

    if (usersData.some((user) => user.username === registrationUsername)) {
      console.log("User with this name already exists");
      return null;
    } else {
      let newUser: User = {
        id: uuidv4(),
        username: registrationUsername,
        pin: registrationPin,
        balance: Math.floor(Math.random() * 10000000),
      };
      return newUser;
    }
  }

  if (registerInput.registrationUsernameInput != "" && registerInput.registrationPinInput != "") {
    const newUser = await createUser();
    console.log(newUser, "This message is in the user registration code block.");

    async function writeUsersInFile(newUser: User | null): Promise<void> {
      try {
        const usersData: User[] = await readUsersFromFile();

        if (newUser) {
          usersData.push(newUser);
        }
        const userData: string = JSON.stringify(usersData, null, 2);
        await fs.writeFile(usersFilePath, userData, "utf-8");
      } catch (error) {
        console.log("Error writing to file.", error);
      }
    }
    await writeUsersInFile(newUser);
  }
} else if (mainMenuInput.mainOptions === "Login") {
  // login functionality
}

async function readUsersFromFile(): Promise<User[]> {
  try {
    const userData: string = await fs.readFile(usersFilePath, "utf-8");
    console.log(userData, "This message is in the readUsersFromFile async function.");
    const parsedData = JSON.parse(userData);
    return Array.isArray(parsedData) ? parsedData : [];
  } catch (error) {
    console.log("Error reading file, returning empty array.", error);
    return [];
  }
}
