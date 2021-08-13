let nodeaudiopeaks = require("./index.js");

const url = "https://www.kennethcaple.com/example.mp3";

const logData = (data) => console.log(data);

// processPeaks: Using with a callback
// const peaks = nodeaudiopeaks.processPeaks(url, 70, false, logData);
// const peaksAllChannels = nodeaudiopeaks.processPeaks(url, 70, true, logData);
// const peaksOneThousandSamples = nodeaudiopeaks.processPeaks(url, 1000, logData);

// getPeaks: Using in an async function
// async function getAllMyPeaks(url) {
//   let peaks = await nodeaudiopeaks.getPeaks(url, {
//     samples: 1000, 
//     allchannels: true
//   });
//   console.log(peaks);
// }

// getAllMyPeaks(url);

async function getMyPeaks(url) {
  let peaks = await nodeaudiopeaks.generatePeaks(url);
  console.log(peaks);
}

getMyPeaks(url);