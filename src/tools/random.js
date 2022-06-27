/**
 * Create a new random object that gets you unique random number
 * @param {number} min - minimum number to start from
 * @param {number} max - maximum
 * @returns {object} Random object with method next
 */
export const Random = function (min, max) {
  //Make an array with range max - min
  //map x to start everything from minimum
  //shuffle the entire array and set it to randArray
  let randArray = shuffle([...Array(max - min).keys()].map((x) => x + min));
  let currentIndex = 0;

  //Next function will return values of that array until out of range
  //Then it'll return undefined
  this.next = function () {
    if (currentIndex >= randArray.length) return;
    return randArray[currentIndex++];
  };
};

//Taken from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
//Shuffles an array efficiently
export function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
