import { askUser } from "./askUser.js";
import { programData, saveData } from "./storage.js";

import { Giveaway } from "./types.js";
import { askUserNewGiveawayData } from "./ui.js";

export const loginUser = (email: string, password: string): void => {
  const isEmailFound = programData.users.some((user) => email === user.email);
  const isPasswordFound = programData.users.some(
    (user) => password === user.password
  );

  if (isEmailFound === true) {
    if (isPasswordFound === true) {
      programData.userEmail = email;
      programData.users.find((user) => {
        if (email === user.email) {
          programData.isAdmin = user.isAdmin;
        }
      });
      saveData();
      console.log("\n¡Te has logueado correctamente, bienvenido/a!");
    } else {
      process.exit(9);
    }
  } else {
    process.exit(9);
  }
};
