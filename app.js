let kittens = [];
let kitten = {};
let mood = "";
let affection = 5;

loadKittens();
drawKittens();
setKittenMood(kitten);

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
  let currentKitten = kittens.find((kitten) => kitten.name == kittenName);
  let kitten = {
    id: generateId(),
    name: kittenName,
    mood: "tolerant",
    affection: 5,
  };
  if (kittens.length >= 4) {
    alert("don't take on more kittens than you can handle");
    return;
  }

  if (currentKitten) {
    alert("why would you name two cats the same thing?");
    return;
  } else {
    kittens.push(kitten);
    saveKittens();
    form.reset();
    drawKittens();
  }
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
  let kittenListElement = document.getElementById("kittens");
  let kittensTemplate = "";
  kittens.forEach((kitten) => {
    kittensTemplate += `
    <div class="p-2 d-flex flex-wrap">
    <div id="kittens" class=" kittyBox d-flex justify-content-center align-items-center flex-wrap kitten ${kitten.mood}">
    <span id= "meow" class="boots">
      <img src="./img/pngaaa.com-589681.png" alt="kitty" height 100px width="200x">
    </span>
    <div class="interact d-flex m-5">
      <button id="pet" class="m-2 btn-7 action d-flex" onclick = "pet('${kitten.id}')">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      pet
    </button>
      <button id="catnip" class= "btn-7 action d-flex" onclick = "catnip('${kitten.id}')">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      catnip
      <button class="m-2 btn-7 action d-flex" onclick = "feed('${kitten.id}')">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      feed
    </div>

    <div class="change1">
      <p>
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
    <button id = "delete" class = "deleteButton btn-7" type = "button" onclick = "clearKittens('${kitten.id}')">
    <span></span>
    <span></span>
    <span></span>
    <span></span>
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
  return kittens.find((kitten) => kitten.id === id);
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
  if (currentKitten.affection == 10) {
    return;
  }
  if (currentKitten.affection == 0) {
    return;
  }

  if (randomNum > 0.3) {
    currentKitten.affection--;
  } else {
    currentKitten.affection++;
  }

  setKittenMood(currentKitten);
  saveKittens();
}

/**
 * Find the kitten in the array of kittens
 * Set the kitten's mood to tolerant
 * Set the kitten's affection to 5
 * @param {string} id
 */
function catnip(id) {
  let currentKitten = findKittenById(id);
  currentKitten.mood = "tolerant";
  currentKitten.affection = 5;
  saveKittens();
}

// NOTE button for feed

function feed(id) {
  let currentKitten = findKittenById(id);
  let randomNum = Math.random();
  if (currentKitten.affection == 10) {
    return;
  }
  if (currentKitten.affection == 0) {
    return;
  }

  if (randomNum > 0.7) {
    currentKitten.affection--;
  } else {
    currentKitten.affection++;
  }
  setKittenMood(currentKitten);
  saveKittens();
}

/**
 * Sets the kittens mood based on its affection
 * @param {Kitten} kitten
 */
function setKittenMood(kitten) {
  document.getElementById("kittens").classList.remove(kitten.mood);
  if (kitten.affection >= 8) {
    kitten.mood = "happy";
  }
  if (kitten.affection <= 7) {
    kitten.mood = "tolerant";
  }
  if (kitten.affection <= 3) {
    kitten.mood = "angry";
  }
  if (kitten.affection == 0) {
    kitten.mood = "gone";
  }
  document.getElementById("kittens").classList.add(kitten.mood);
  saveKittens();
}

/**
 * Removes all of the kittens from the array
 * remember to save this change
 */
function clearKittens(id) {
  let kittenIndex = kittens.findIndex((kitten) => kitten.id === id);

  kittens.splice(kittenIndex, 1);

  saveKittens();
  drawKittens();
}

/**
 * Removes the welcome content and should probably draw the
 * list of kittens to the page. Good Luck
 */
function getStarted() {
  document.getElementById("welcome").classList.add("hidden");
  console.log("Good Luck, Take it away");
  document.getElementById("nameInput").classList.remove("hidden");
  document.getElementById("kittens").classList.toggle("hidden");
}

// --------------------------------------------- No Changes below this line are needed

/**
 * Defines the Properties of a currentKitten
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
