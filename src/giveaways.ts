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
      console.log(`\n¡Te has logueado correctamente, bienvenido/a!`);
    } else {
      console.log(`\nError: contraseña inválida`);
      process.exit();
    }
  } else {
    console.log(`\nError: usuario y/o contraseña inválidos`);
    process.exit();
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
  console.log(`\nSorteo registrado correctamente`);
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
    saveData();
    console.log(`\nEl sorteo ${position} ha sido borrado.`);
  }
};

export const enterGiveaway = (position: number): void => {
  const giveawaysCount = programData.giveaways.length;
  const giveawaysIndex = position - 1;
  const loggedUserEmail = programData.userEmail;
  const loggedUser = programData.users.find(
    (user) => user.email === loggedUserEmail
  );

  if (giveawaysCount <= giveawaysIndex) {
    console.log(`\nEl sorteo seleccionado no existe.`);
  } else if (loggedUser) {
    programData.giveaways[giveawaysIndex].participants.push(loggedUser);
    saveData();
    console.log(
      `\nHas sido inscrito al sorteo ${position}: ${programData.giveaways[giveawaysIndex].name} en ${programData.giveaways[giveawaysIndex].socialNetwork}`
    );
  }
};

export const listUserGiveaways = (): void => {
  let loggedUserGiveaways: Giveaway[] = [];
  const loggedUserEmail = programData.userEmail;

  programData.giveaways.forEach((giveaway, index) => {
    const giveawayPosition = index + 1;

    if (
      giveaway.participants.find(
        (participant) => participant.email === loggedUserEmail
      )
    ) {
      loggedUserGiveaways.push({
        name: giveaway.name,
        socialNetwork: giveaway.socialNetwork,
        participants: [],
      });
    }
  });

  console.log(
    `\nEstás inscrito en los siguientes ${loggedUserGiveaways.length} sorteos:`
  );
  loggedUserGiveaways.forEach((giveaway, index) => {
    const giveawayPosition = index + 1;
    console.log(
      `${giveawayPosition}.  Sorteo de ${giveaway.name} en ${giveaway.socialNetwork}`
    );
  });
};
