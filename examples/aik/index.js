import {
  withDeepstream, 
  withDeepstreamList, 
  withDeepstreamAnonRecord
 } from 'react-deepstream-rp-hoc';
import React from 'react';

let config = {
  "appUrl": "<YOUR DEEPSTREAM APP URL>", 
  "authParams": {},
  "listName": "<YOUR LIST NAME>"
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

export default withDeepstream(AppBase, config.appUrl, config.authParams);

