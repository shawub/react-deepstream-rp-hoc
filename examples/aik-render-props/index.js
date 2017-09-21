import {
  Deepstream, 
  DeepstreamList, 
  DeepstreamAnonRecord
 } from 'react-deepstream-rp-hoc';
import React from 'react';

let config = {
  "appUrl": "<YOUR DEEPSTREAM APP URL>", 
  "authParams": {},
  "listName": "<YOUR LIST NAME>"
}

class Record extends React.Component {
  render() {
    return <DeepstreamAnonRecord recordName = {this.props.recordName}
      render = { (record) =>
        <li>{JSON.stringify(record.data)}</li>
      }
    />
  }  
}

class List extends React.Component {
  render() {
    return <DeepstreamList listName = {this.props.listName}
      render = { (list) => <ul> {
          list.entries.map( (record) => <Record key={record} recordName={record} />
        )}</ul>
      }
    />
  }
}

class App extends React.Component {
  render () {
    return <Deepstream appUrl = {config.appUrl} authParams = {config.authParams}
      render = { (ds) =>  
        ds.connected
          ?<List listName = {config.listName} />
          :<div> Loading ... </div>
      }
    />
  }
}

export default App;