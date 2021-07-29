const {nextISSTimesForMyLocation} = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log(`Houston, we have a problem.\n${error}`);
//     return;
//   }
//   console.log("Your IP address is:", ip);
// });

// fetchCoordsByIP("99.239.237.120", (error, data) => {
//   if (error) {
//     console.log(error);
//   }
//   console.log(data);
// });

// fetchISSFlyOverTimes({ latitude: 43.648, longitude: -79.4141 }, (error, data) => {
//   if (error) {
//     console.log(error);
//   }
//   console.log(data);
// });

nextISSTimesForMyLocation((error, passOverTimes) => {
  if (error) {
    return console.log("Houston, we have a problem.", error);
  }
  passOverTimes.forEach((time) => {
    const datetime = new Date(0);
    datetime.setUTCSeconds(time.risetime);
    const duration = time.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  });
});