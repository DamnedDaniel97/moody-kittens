let kittens = [];
let currentKitten = {};
let mood = "";
let affection = 5;

loadKittens();
drawKittens();

/**
 * Called when submitting the new Kitten Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * then add that data to the kittens list.
 * Then reset the form
 */

function addKitten(event) {
  event.preventDefault();
  let form = event.target;
  let kittenName = form.name.value;

  currentKitten = kittens.find((kitten) => kitten.name == kittenName);
  if (!currentKitten) {
    currentKitten = {
      id: generateId(),
      name: kittenName,
      mood: "Tolerant",
      affection: 5,
    };
    kittens.push(currentKitten);
    saveKittens();
  } else {
    alert("you already have a cat with this name");
  }
  drawKittens();
  setKittenMood(currentKitten);
  // NOTE setKittenMood() must have the id to draw correctly
  // this is letting me delete a cat without having to reload the page for a new cats image to appear

  form.reset();
  // console.log(currentKitten);
}

/**
 * Converts the kittens array to a JSON string then
 * Saves the string to localstorage at the key kittens
 */
function saveKittens() {
  window.localStorage.setItem("kittens", JSON.stringify(kittens));
  drawKittens();
}

/**
 * Attempts to retrieve the kittens string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the kittens array to the retrieved array
 */
function loadKittens() {
  let storedKittens = JSON.parse(window.localStorage.getItem("kittens"));
  if (storedKittens) {
    kittens = storedKittens;
  }
}

/**
 * Draw all of the kittens to the kittens element
 */
function drawKittens() {
  loadKittens();
  let kittenListElement = document.getElementById("kittens");
  let kittensTemplate = "";
  kittens.forEach((kitten) => {
    kittensTemplate += `
    <div class="p-2">
    <div id="kittens" class=" kittyBox d-flex space-around align-items-center flex-wrap">
    <span id= "meow" class="boots">
      <img src="/pngaaa.com-589681.png" alt="kitty" height 100px width="200x">
    </span>
    <div class="interact d-flex space-between align-items-center flex-wrap">
      <button id="pet" class="m-2" onclick = "pet('${kitten.id}')">pet</button>
      <button id="catnip" onclick = "catnip('${kitten.id}')">catnip</button>
      <button class="m-2" onclick = "feed('${kitten.id}')">feed</button>
    </div>
    <div class="change1">
      <p>Name:
        <span>${kitten.name}</span>
      </p>
      <p>Mood:
        <span id="mood">${kitten.mood}</span>
      </p>
      <p>Affection:
        <span>${kitten.affection}</span>
      </p>
    </div>
    <div class = "container">
    <button id = "delete" class = "deleteButton" type = "button" onclick = "clearKittens('${kitten.id}')">
    <i class="fa-solid fa-eraser"></i>
    </button>
    </div>
  </div>
  `;
  });
  kittenListElement.innerHTML = kittensTemplate;
}

/**
 * Find the kitten in the array by its id
 * @param {string} id
 * @return {Kitten}
 */
function findKittenById(id) {
  return kittens.find((kitten) => (kitten.id = id));
}

/**
 * Find the kitten in the array of kittens
 * Generate a random Number
 * if the number is greater than .5
 * increase the kittens affection
 * otherwise decrease the affection
 * @param {string} id
 */
function pet(id) {
  let currentKitten = findKittenById(id);
  let randomNum = Math.random();
  // console.log(randomNum);
  if (currentKitten.affection >= 10) {
    if (randomNum < 0.5) {
      currentKitten.affection--;
    }
    return;
  }

  if (randomNum > 0.5) {
    currentKitten.affection--;
    saveKittens();
  } else {
    currentKitten.affection--;
    saveKittens();
  }
  setKittenMood(currentKitten);
}

/**
 * Find the kitten in the array of kittens
 * Set the kitten's mood to tolerant
 * Set the kitten's affection to 5
 * @param {string} id
 */
function catnip(id) {
  let currentKitten = findKittenById(id);
  currentKitten.mood = "Tolerant";
  currentKitten.affection = 5;
  document.getElementById("kittens").className += "kitten tolerant";
  saveKittens();
}

// NOTE button for feed

function feed(id) {
  let currentKitten = findKittenById(id);
  let randomNum = Math.random();
  // console.log(randomNum);
  if (currentKitten.affection >= 10) {
    return;
  }

  if (randomNum > 0.5) {
    currentKitten.affection++;
    saveKittens();
  } else {
    currentKitten.affection++;
    saveKittens();
  }
  setKittenMood(currentKitten);
  saveKittens();
}

/**
 * Sets the kittens mood based on its affection
 * @param {Kitten} kitten
 */
function setKittenMood(kitten) {
  let currentKitten = findKittenById(kitten);

  switch (currentKitten.affection) {
    case 8:
      document.getElementById("kittens").className += "kitten happy";
      currentKitten.mood = "happy";
      break;
    case 5:
      document.getElementById("kittens").className += "kitten tolerant";
      currentKitten.mood = "tolerant";
      break;
    case 3:
      document.getElementById("kittens").className += "kitten angry";
      currentKitten.mood = "angry";
      break;
    case 0:
      document.getElementById("kittens").className += "kitten gone";
      currentKitten.mood = "gone";
      break;
    default:
      break;
  }
  saveKittens();
}

/**
 * Removes all of the kittens from the array
 * remember to save this change
 */
function clearKittens(id) {
  let kittenIndex = kittens.findIndex((kitten) => (kitten.id = id));

  kittens.splice(kittenIndex, 1);

  saveKittens();
}

/**
 * Removes the welcome content and should probably draw the
 * list of kittens to the page. Good Luck
 */
function getStarted() {
  document.getElementById("welcome").remove();
  console.log("Good Luck, Take it away");
}

// --------------------------------------------- No Changes below this line are needed

/**
 * Defines the Properties of a Kitten
 * @typedef {{name: string, mood: string, affection: number}} Kitten
 */

/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return (
    Math.floor(Math.random() * 10000000) +
    "-" +
    Math.floor(Math.random() * 10000000)
  );
}

loadKittens();
