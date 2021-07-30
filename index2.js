const {nextISSTimesForMyLocation} = require('./iss_promised.js');
const {printTimes} = require('./iss');

nextISSTimesForMyLocation()
  .then((passTimes) => {
    printTimes(passTimes);
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });


