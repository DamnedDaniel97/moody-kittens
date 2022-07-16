let kittens = [];
let currentKitten = {};
let mood = "";
let affection = 5;

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

  findKittenById();
  currentKitten = kittens.find((kitten) => kitten.name == kittenName);
  if (!currentKitten) {
    currentKitten = {
      id: generateId(),
      name: kittenName,
      mood: "tolerant",
      affection: 5,
    };
    kittens.push(currentKitten);
    saveKittens();
  }
  drawKittens();
  form.reset();
  console.log(currentKitten);
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
    <span class="boots">
      <img src="/pngaaa.com-589681.png" alt="kitty" height 100px width="200x">
    </span>
    <div class="interact d-flex space-between align-items-center flex-wrap">
      <button id="pet" class="m-2">pet</button>
      <button id="catnip">catnip</button>
      <button class="m-2">feed</button>
    </div>
    <div class="change1">
      <p>Name:
        <span>${kitten.name}</span>
      </p>
      <p>Mood:
        <span>${kitten.mood}</span>
      </p>
      <p>Affection
        <span>${kitten.affection}</span>
      </p>
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
  let find = kittens.find((kitten) => kitten.id == id);
}

/**
 * Find the kitten in the array of kittens
 * Generate a random Number
 * if the number is greater than .5
 * increase the kittens affection
 * otherwise decrease the affection
 * @param {string} id
 */
function pet(id) {}

/**
 * Find the kitten in the array of kittens
 * Set the kitten's mood to tolerant
 * Set the kitten's affection to 5
 * @param {string} id
 */
function catnip(id) {}

/**
 * Sets the kittens mood based on its affection
 * @param {Kitten} kitten
 */
function setKittenMood(kitten) {}

/**
 * Removes all of the kittens from the array
 * remember to save this change
 */
function clearKittens() {}

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
