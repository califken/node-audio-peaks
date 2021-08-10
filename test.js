let nodeaudiopeaks = require("./index.js");

const url =
  "https://www.kennethcaple.com/api/mp3/richinlovemutedguitarechoing.mp3";

const logData = (data) => console.log(data);

const peaks = nodeaudiopeaks.getPeaks(url, 70, false, logData);
const peaksAllChannels = nodeaudiopeaks.getPeaks(url, 70, true, logData);
const peaksOneThousandSamples = nodeaudiopeaks.getPeaks(url, 1000, logData);
