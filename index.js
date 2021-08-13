const fetch = require('node-fetch');
const decode = require('audio-decode');
const buffer = require('audio-lena/mp3');

/**
 * Filters the AudioBuffer retrieved from an external source
 * @param {AudioBuffer} audioBuffer the AudioBuffer from drawAudio()
 * @param {Number} samples the number of samples to generate data for
 * @param {Boolean} allchannels by default, generatePeaks only returns the first channel.  set this to true to return an array for each channel
 * @returns {Array} an array of floating point numbers
 */
const filterData = (audioBuffer, samples, allchannels) => {
    const channels = allchannels ? audioBuffer.numberOfChannels : 1;
    filteredDataChannels = [];
    for (currentchannel = 0; currentchannel < channels; currentchannel++) {
        const rawData = audioBuffer.getChannelData(currentchannel); // We only need to work with one channel of data
        const blockSize = Math.floor(rawData.length / samples); // the number of samples in each subdivision
        const filteredData = [];
        for (let i = 0; i < samples; i++) {
            let blockStart = blockSize * i; // the location of the first sample in the block
            let sum = 0;
            for (let j = 0; j < blockSize; j++) {
            sum = sum + Math.abs(rawData[blockStart + j]); // find the sum of all the samples in the block
            }
            filteredData.push(sum / blockSize); // divide the sum by the block size to get the average
        }
        filteredDataChannels[currentchannel] = filteredData;
    }
  return filteredDataChannels;
};

/**
 * Normalizes the audio data
 * @param {Array} filteredData the data from filterData()
 * @returns {Array} an normalized array of floating point numbers
 */
const normalizeData = filteredDataChannels => {
    let multipliers = [];
    let normalized = [];
    filteredDataChannels.map((c,i) => {
        multiplier = Math.pow(Math.max(...c), -1);
        normalized[i] = c.map(n => n * multiplier);
    });
    return normalized;
}

/**
 * @param {Array} data generated peaks data 
 * @param {Boolean} allchannels by default, generatePeaks only returns the first channel.  set this to true to return an array for each channel
 * @returns {Array} generated peak data
 */
const outputData = (data, allchannels) => {
    if (allchannels) {
        return data;
    } else {
        return data[0];
    }
}

/**
 * Retrieves audio from URL and generates peak data
 * @param {String} url the url of the audio we'd like to fetch
 * @param {Number} samples the number of samples to generate data for
 * @param {Boolean} allchannels by default, generatePeaks only returns the first channel.  set this to true to return an array for each channel
 * @param {String} callback the function to call on the peaks data once it has been generated
 */
 exports.getPeaks = (url, samples = 70, allchannels = false, callback) => {
    fetch(url)
    .then(response => response.arrayBuffer())
    .then(arrayBuffer => decode(arrayBuffer))
    .then(audioBuffer => normalizeData(filterData(audioBuffer, samples, allchannels)),allchannels)
    .then(callback);
}

/**
 * Retrieves audio from URL and generates peak data
 * @param {String} url the url of the audio we'd like to fetch
 * @param {Object} options Optional object with samples {Number} (default: 70) and allchannels {boolean} (default: false) properties
 */
exports.generatePeaks = async (url, options = {}) => {
    if (url == undefined || url.length < 6) {
        return 'Please provide a URL';
    }
    let allchannels = options.allchannels ? options.allchannels : false;
    let samples = options.samples ? options.samples : 70;
    let peaks = await fetch(url)
    .then(response => response.arrayBuffer())
    .then(arrayBuffer => decode(arrayBuffer))
    .then(audioBuffer => normalizeData(filterData(audioBuffer, samples, allchannels)),allchannels)
    .then(peaks => {return peaks[0]});
    return peaks;
}