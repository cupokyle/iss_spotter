const request = require('request');

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const fetchMyIP = function(callback) {
  //use request to fetch IP from JSON API
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP.\nResponse: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const myIp = JSON.parse(body).ip;
    callback(null, myIp);
  });
};

const fetchCoordsByIP = function(ip, callback) {
  request(`https://freegeoip.app/json/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates from IP.\nResponse: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const { latitude, longitude } = JSON.parse(body);
    callback(null, { latitude, longitude });
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {

    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates from IP.\nResponse: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const flyTimes = JSON.parse(body).response;
    callback(null, flyTimes);
  });
};

const nextISSTimesForMyLocation = function(callback) {

  fetchMyIP((error, ip) => {
    if (error) {
      console.log(`Houston, we have a problem.\n${error}`);
    }
    
    fetchCoordsByIP(ip, (error, coordinates) => {
      if (error) {
        console.log(`Houston, we have a problem.\n${error}`);
      }
      
      fetchISSFlyOverTimes(coordinates, (error, passOverTimes) => {
        if (error) {
          console.log(`Houston, we have a problem.\n${error}`);
        }
        
        callback(null, passOverTimes);

      });

    });

  });
};


module.exports = {nextISSTimesForMyLocation};