const fs = require("fs");
const fetch = require('node-fetch');
const { of, map, from, switchMap } = require('rxjs');
const decode = require('audio-decode');
const Blob = require('buffer');

/**
 * Filters the AudioBuffer
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
    filteredDataChannels.map((c, i) => {
        multiplier = Math.pow(Math.max(...c), -1);
        normalized[i] = c.map(n => n * multiplier);
    });
    return normalized;
}

/**
 * Generate audio peaks from a local filepath
 * @param {string} audiofile Local filepath
 * @param {samples} samples The number of "peaks" to return
 * @returns {Array} a normalized array of peaks from the first channel of audio
 */
function audioPeaksFromFile(audiofile, samples) {
    return of(audiofile).pipe(
        switchMap(filepath => {
            return from(fs.promises.readFile(filepath))
        }),
        map(filedata => new Blob.Blob([filedata.buffer])),
        switchMap(blob => from(blob.arrayBuffer())),
        switchMap(arrayBuffer => from(decode(arrayBuffer))),
        map(audioBuffer => filterData(audioBuffer, samples ? samples : 70, false)),
        map(filteredData => normalizeData(filteredData, false)),
        map(normalizedData => normalizedData[0])
    );
}

/**
 * Generate audio peaks from remote file URL
 * @param {string} audiofileurl Remote file URL
 * @param {samples} samples The number of "peaks" to return
 * @returns {Array} a normalized array of peaks from the first channel of audio
 */
function audioPeaksFromURL(audiofileurl, samples) {
    return of(audiofileurl).pipe(
        switchMap(audiofileurl => {
            return from(fetch(audiofileurl))
        }),
        switchMap(file => from(file.arrayBuffer())),
        switchMap(arrayBuffer => from(decode(arrayBuffer))),
        map(audioBuffer => filterData(audioBuffer, samples ? samples : 70, false)),
        map(filteredData => normalizeData(filteredData, false)),
        map(normalizedData => normalizedData[0])
    );
}

/**
 * Generate audio peaks from local filepath or remote file URL
 * @param {string} audio Local filepath or remote file URL
 * @param {samples} samples The number of "peaks" to return
 * @returns {Array} a normalized array of peaks from the first channel of audio
 */
exports.getAudioPeaks = (audio, samples) => {
    if (audio.substr(0,4)=='http') {
        return audioPeaksFromURL(audio, samples);
    } else {
        return audioPeaksFromFile(audio, samples);
    }
}