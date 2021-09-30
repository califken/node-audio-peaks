# Node Audio Peaks
Generate peak audio data from a local filepath or remote file URL in a Node.js environment - without the browser.

## Demo
Try this out on [stackblitz](https://stackblitz.com/edit/node-fswsla?devtoolsheight=33&file=index.js) - (run the command **node index.js** in the terminal)
## Installation
Use your favorite package manager / [npm](https://www.npmjs.com/package/npm) to install.

```bash
npm install node-audio-peaks --save
```
## Usage
Version 2.0.1 uses RxJS, and returns the audio peak data as an observable.
### **getAudioPeaks(url, samples)**
```
const nodeAudioPeaks = require("node-audio-peaks");

// Generate peaks for a local audio file
let filepath = 'sampleaudio.mp3';
let audioPeaksFromFile$ = nodeAudioPeaks.getAudioPeaks(filepath);
audioPeaksFromFile$.subscribe(console.log);

// Generate peaks for a remote audio file
let audioFileURL = 'https://www.kennethcaple.com/api/mp3/richinlovemutedguitarechoing.mp3';
let audioPeaksFromURL$ = nodeAudioPeaks.getAudioPeaks(url);
audioPeaksFromURL$.subscribe(console.log);
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
This work is licensed under a [GNU General Public User License](https://github.com/califken/node-audio-peaks/blob/main/LICENSE).

## Author
Kenneth Caple