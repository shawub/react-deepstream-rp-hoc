import {
  withDeepstream, 
  withDeepstreamList, 
  withDeepstreamAnonRecord
 } from 'react-deepstream-rp-hoc';
import React from 'react';

let config = {
  //"appurl": "<YOUR DEEPSTREAM APP URL>", 
  "appurl": "wss://154.deepstreamhub.com?apiKey=a1630f45-0ffd-4e36-bfe1-ac5dbe61c3bc",
  "authparams": {},
  //"listName": "<YOUR LIST NAME>", 
  "listName": "test/list"
}

class RecordBase extends React.Component {
  render() {
    return <li>{JSON.stringify(this.props.data)}</li>
  }  
}
let Record =  withDeepstreamAnonRecord(RecordBase);


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

class AppBase extends React.Component {
  render () {
    // check 
    if (this.props.connected) {
      return <List key={config.listName} listName={config.listName} />
    } else {
      return <div>Loading</div>
    }
  }
}

export default withDeepstream(AppBase, config.appurl, config.authparams);

