# Node Audio Peaks

Generate peak audio data from an audio file URL in a Node.js environment - without the browser.

## Demo

Try this out on [stackblitz](https://stackblitz.com/edit/node-fswsla?devtoolsheight=33&file=index.js) - (run the command **node index.js** in the terminal)

## Installation

Use your favorite package manager / [npm](https://www.npmjs.com/package/npm) to install.

```bash
npm install node-audio-peaks --save
```
## Usage
2 ways to get peak data: generatePeaks using async/await and getPeaks using a callback function

All examples assume there is a variable "url" with a value set.  You can use the following to test:

```
const url = "https://www.kennethcaple.com/example.mp3";
```


### **generatePeaks(url)**
**Use with async/await**

```
async function getMyPeaks(url) {
  let peaks = await nodeaudiopeaks.generatePeaks(url);
  console.log(peaks);
}

getMyPeaks(url);
```
#### Parameters

- **url** *string*  The URL of the audio file **(required)**
- **options** *object* **(optional)**
  - **samples**  *number* The number of samples to generate, the default  is 70.
  - **allchannels**  *boolean* Set this to true to return an array for each channel, the default is to only return an array for the first channel.

Example using the options object:
```
async function getAllMyPeaks(url) {
  let peaks = await nodeaudiopeaks.generatePeaks(url, {
    samples: 1000, 
    allchannels: true
  });
  console.log(peaks);
}

getAllMyPeaks(url);
```
<hr>

### **getPeaks(url, sample, allchannels, callback)**
**Providing a callback function**
#### Parameters
- **url**  *string*  The URL of the audio file
- **samples**  *number* The number of samples to generate
- **allchannels**  *boolean* Default is to generate peaks for the first channel.  Set this to true to return an array for each channel.
- **callback**  *string* Function to invoke once the peak data is available
```
const nodeaudiopeaks = require("node-audio-peaks");

const url = "https://www.kennethcaple.com/example.mp3";

const logData = (data) => console.log(data);

// Default parameters
const peaks = nodeaudiopeaks.generatePeaks(url, 70, false, logData);
const peaksAllChannels = nodeaudiopeaks.generatePeaks(url, 70, true, logData);
const peaksOneThousandSamples = nodeaudiopeaks.generatePeaks(url, 1000, logData);
```

### All channels
Generate peak data for all channels contained in the audio file, and console log the data:
```
const peaksAllChannels = nodeaudiopeaks.generatePeaks(url, 70, true, logData);
```
### Number of samples: 1000
Generate 1000 samples of peak data from the audio file, and console log the data:
```
const peaksOneThousandSamples = nodeaudiopeaks.generatePeaks(url, 1000, logData);
```
## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
This work is licensed under a [GNU General Public User License](https://github.com/califken/node-audio-peaks/blob/main/LICENSE).

## Author
Kenneth Caple