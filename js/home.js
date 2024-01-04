let logAut = document.getElementById("logAut");
logAut.addEventListener("click", function () {
  window.location = "endgame.html";
});
let userInfo = JSON.parse(localStorage.getItem("user"));
let userName = (document.getElementById("userName").innerHTML = userInfo.name);
// ------------------------------------------
let duration = 1000;
let memoryGameBlocks = document.querySelector(".memoryGame"); //mask al row
let blocks = Array.from(memoryGameBlocks.children); //mask al col
// let orderRange = [...Array(blocks.length).keys()]; //al3naser klha
let orderRange = Array.from(Array(blocks.length).keys()); //al3naser klha

// ---------
shuffle(orderRange);
// add order css property to game blocks
blocks.forEach((block, index) => {
  //forEach btloop 3l array blocks
  let firstChild = block.firstElementChild;
  block.style.order = orderRange[index]; //kda mwz3a al index 3l col
  //   add click event
  block.addEventListener("click", function () {
    // trigger flip block function
    flipBlock(firstChild);
  });
});

// flip block function
function flipBlock(selectedBlock) {
  // add class is-flipped
  selectedBlock.classList.add("is-flipped");
  // add index class
  selectedBlock.classList.add("flipped-index-");
  //   collect all flipped cards
  let allFlippedBlocks = blocks.filter((flippedBlock) =>
    flippedBlock.classList.contains("is-flipped")
  );
  // if theres two selected blooks
  if (allFlippedBlocks.length === 2) {
    console.log("Two blocks flipped");
  }
}

// shuffle function
function shuffle(array) {
  //settings vars
  let current = array.length, //
    temp, // alkema al m2kta al hn5zem feha kema m3yna 34an arg3 lha f ala5ir
    random; // alrkam al 34wa2y

  while (current > 0) {
    //get random number
    random = Math.floor(Math.random() * current);
    //Decrease length by one
    current--;
    //1 save current element in stash
    temp = array[current];
    //2 current element = random element
    array[current] = array[random];
    //3 random element= get element from stash
    array[random] = temp;
  }
  return array;
}
