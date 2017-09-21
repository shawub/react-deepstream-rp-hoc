# react-deepstream-rp-hoc
A deepstream React wrapper that exports Classes supporting [Render Props](https://cdb.reacttraining.com/use-a-render-prop-50de598f11ce) and HOCs.

## Usage 
HOCs are actually implemented with Render Props so it is possible to use either depeneding on your preference.

### Using HOCs
Application Component which logs into deepstream.
``` javascript
import {withDeepstream} from 'react-deepstream-rp-hoc';
class AppBase extends React.Component {
  render () {
    if (this.props.connected) {
      return <List key={listName} listName={listName} />
    } else {
      return <div>Loading</div>
    }
  }
}
let App = withDeepstream(AppBase)
```
Returns Base App Class wrapped with deepstream client. ```this.props.connected``` indicates client connection status. E.g. 
```javascript
  <App appUrl={<YOUR APP URL} authParams={AUTH PARAMS} >
```

List Component loads Deepstream List of given 'ListName'.
``` javascript
import {withDeepstreamList} from 'react-deepstream-rp-hoc';
class ListBase extends React.Component {
  render() {
    const entries = this.props.entries;
    const records = entries.map( (record) => 
      <Record key={record} recordName={record} />
    );
    return <ul>{records}</ul>  
  }
}
let List = withDeepstreamList(ListBase);
```
Returns Base List Class wrapped with deepstream list. E.g.
``` javascript
  <List listName={listName}>
```


Record Component loads Deepstream JSON document of given 'recordName'.
``` javascript
import {withDeepstreamAnonRecord} from 'react-deepstream-rp-hoc';
class RecordBase extends React.Component {
  render() {
    return <li>{JSON.stringify(this.props.data)}</li>
  }  
}
let Record =  withDeepstreamAnonRecord(RecordBase);
```
Returns Base Document Class wrapped with deepstream anonymous record. E.g.
``` javascript 
  <Record recordName={recordName}>
```

### Render Props
The same as above but using render props