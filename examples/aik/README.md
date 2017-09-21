# Example using HOC on [Aik](https://github.com/d4rkr00t/aik)
Displays a list of records held on deepstream server.

The example uses the HOC export from the react-deesptream-rp-hoc package.
## Get Started
Install Aik globally
``` bash
npm install -g aik
```
In index.js replace \<YOUR DEEPSTREAM APP URL\> and \<YOUR LIST NAME\> and add auth params if needed.
``` javascript
let config = {
  "appUrl": "<YOUR DEEPSTREAM APP URL>", 
  "authParams": {},
  "listName": "<YOUR LIST NAME>"
}
```
Run Aik
``` bash
aik index.js -r
```
See [DeepstreamHub](https://deepstreamhub.com) to create lists and records.


