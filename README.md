# Node Audio Peaks

Generate peak audio data from an audio file URL in a Node.js environment - without the browser.

## Demo

Try this out on [stackblitz](https://node-fswsla.stackblitz.io)

## Installation

Use your favorite package manager / [npm](https://www.npmjs.com/package/npm) to install.

```bash
npm install node-audio-peaks --save
```
## Usage
### getPeaks()

```nodeaudiopeaks.getPeaks(url, 70, false, console.log)```

The Node Audio Peaks getPeaks function takes 4 parameters:

- **url**  *string*  The URL of the audio file
- **samples**  *number* The number of samples to generate
- **allchannels**  *boolean* Default is to generate peaks for the first channel.  Set this to true to return an array for each channel.
- **callback**  *string* Function to invoke once the peak data is available

```
const nodeaudiopeaks = require("node-audio-peaks");

const url =
  "https://www.kennethcaple.com/api/mp3/richinlovemutedguitarechoing.mp3";

```
### Default parameters
Generate peak data using default parameters, and console log the data:
```
const peaks = nodeaudiopeaks.getPeaks(url, 70, false, logData);
```
### All channels
Generate peak data for all channels contained in the audio file, and console log the data:
```
const peaksAllChannels = nodeaudiopeaks.getPeaks(url, 70, true, logData);
```
### Number of samples: 1000
Generate 1000 samples of peak data from the audio file, and console log the data:
```
const peaksOneThousandSamples = nodeaudiopeaks.getPeaks(url, 1000, logData);

```
## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
This work is licensed under a [GNU General Public User License](https://github.com/califken/node-audio-peaks/blob/main/LICENSE).
