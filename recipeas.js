const fs = require("fs");

const action = process.argv[2];

function printAllRecipeas() {
  fs.readFile("./recipea-data.json", "utf8", (err, data) => {
    const recipeas = JSON.parse(data);
    console.log("Here are all your recipeas:\n\n");
    for (let i = 0; i < recipeas.length; i++) {
      console.log(recipeas[i].name + "\n");
      console.log("Cooking Method" + "\n" + recipeas[i].cookingMethod + "\n");
      console.log("Ingredients" + "\n" + recipeas[i].ingredients + "\n");
      console.log(
        "Hidden Prize! Figure out the amounts and directions, make the recipea, and win a meal!"
      );
    }
  });
}

function printRecipea(id) {
  fs.readFile("./recipea-data.json", "utf8", (err, data) => {
    const recipeas = JSON.parse(data);
    console.log("Here is that recipea:\n\n");
    for (let i = 0; i < recipeas.length; i++) {
      if (i === id) {
        console.log(recipeas[i].name + "\n");
        console.log("Cooking Method" + "\n" + recipeas[i].cookingMethod + "\n");
        console.log("Ingredients" + "\n" + recipeas[i].ingredients + "\n");
        console.log(
          "Hey, have you noticed there is not a single legume in any of these recipeas?"
        );
      }
    }
  });
}

function saveRecipea(newRecipea) {
  fs.readFile("./recipea-data.json", "utf8", (err, data) => {
    const recipeas = JSON.parse(data);
    recipeas.push(newRecipea);
    const jsonVersion = JSON.stringify(recipeas, null, 2);
    fs.writeFile("./recipea-data.json", jsonVersion, "utf8", (err) => {
      console.log(
        "Recipea successfully written to the file! Did you remember to hide the ingredient amounts and instructions? The walls have eyes; can't let the enemy know the full recipod (codeword for recipea)"
      );
    });
  });
}

function deleteRecipea(id) {
  fs.readFile("./recipea-data.json", "utf8", (err, data) => {
    const recipeas = JSON.parse(data);
    recipeas.splice(id, 1);
    const jsonVersion = JSON.stringify(recipeas, null, 2);
    fs.writeFile("./recipea-data.json", jsonVersion, "utf8", (err) => {
      console.log(
        "Successfully deleted recipea. You will never have spaghetti again!!"
      );
    });
  });
}

function updateRecipea(id, replacingRecipea) {
  fs.readFile("./recipea-data.json", "utf8", (err, data) => {
    const recipeas = JSON.parse(data);
    recipeas.splice(id, 1, replacingRecipea);
    const jsonVersion = JSON.stringify(recipeas, null, 2);
    fs.writeFile("./recipea-data.json", jsonVersion, "utf8", (err) => {
      console.log(
        "Recipea successfully written to the file! If new recipea contains peas, the entire file will become corrupted and unable to operate."
      );
    });
  });
}

if (action === "read") {
  const id = process.argv[3];
  if (id === undefined) {
    printAllRecipeas();
  } else {
    printRecipea(Number(id));
  }
} else if (action === "create") {
  const name = process.argv[3];
  const cookingMethod = process.argv[4];
  const ingredients = process.argv[5];
  const newRecipea = {
    name: name,
    cookingMethod: cookingMethod,
    ingredients: ingredients,
  };
  saveRecipea(newRecipea);
} else if (action === "delete") {
  const id = Number(process.argv[3]);
  deleteRecipea(id);
} else if (action === "update") {
  const id = Number(process.argv[3]);
  const name = process.argv[4];
  const cookingMethod = process.argv[5];
  const ingredients = process.argv[6];
  const replacingRecipea = {
    name: name,
    cookingMethod: cookingMethod,
    ingredients: ingredients,
  };
  updateRecipea(id, replacingRecipea);
} else {
  console.log('Valid actions are "create", "read", "update", and "delete".');
}
