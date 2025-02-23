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

export const createGiveaway = (): void => {
  const askUser = askUserNewGiveawayData();

  programData.giveaways.push({
    name: askUser.giveawayName,
    socialNetwork: askUser.giveawaySocialNetwork,
    participants: [],
  });

  saveData();
};

export const listGiveaways = (): void => {
  const giveawaysCount = programData.giveaways.length;

  if (giveawaysCount === 0) {
    console.log(`\nNo hay sorteos disponibles.`);
  } else {
    console.log(`\nÉstos son los ${giveawaysCount} sorteos disponibles:\n`);

    programData.giveaways.forEach((giveaway, index) => {
      const giveawaysPosition = index + 1;
      console.log(
        `${giveawaysPosition}. Sorteo de ${giveaway.name} en ${giveaway.socialNetwork}`
      );
    });
  }
};

export const deleteGiveaway = (position: number): void => {
  const giveawaysCount = programData.giveaways.length;
  const giveawaysIndex = position - 1;

  if (giveawaysCount <= giveawaysIndex) {
    console.log(`\nEl sorteo seleccionado no existe.`);
  } else {
    programData.giveaways.splice(giveawaysIndex, 1);
    console.log(`\nEl sorteo ${position} ha sido borrado.`);
    saveData();
  }
};
