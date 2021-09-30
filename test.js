const nodeAudioPeaks = require("./index.js");

// Generate peaks for a local audio file
let filepath = 'sampleaudio.mp3';
let audioPeaksFromFile$ = nodeAudioPeaks.getAudioPeaks(filepath);
audioPeaksFromFile$.subscribe(console.log);

// Generate peaks for a remote audio file
let audioFileURL = 'https://www.kennethcaple.com/api/mp3/richinlovemutedguitarechoing.mp3';
let audioPeaksFromURL$ = nodeAudioPeaks.getAudioPeaks(audioFileURL);
audioPeaksFromURL$.subscribe(console.log);