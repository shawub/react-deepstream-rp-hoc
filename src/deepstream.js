import React from 'react'
import deepstream from 'deepstream.io-client-js';
let ds; //singleton

// Render Prop
export class Deepstream extends React.Component {
  
  constructor(props){
    super(props)
    this.state = {}
  }

  login() {
    return new Promise(resolve => {
      if (ds !== undefined){
        resolve(ds)
      } else {        
        ds = deepstream( this.props.appUrl ) //config.endpoint + '?apiKey=' + config.apikey
        ds.on('connectionStateChanged', connectionState => {
          console.log("DS connectionStateChanged: ", connectionState);
        });
        ds.on('error', ( error, event, topic ) => {
          console.log(error, event, topic);
        });
        ds.login(this.props.authParams, () => {
          resolve(ds);
        });
      }
    });
  }

  async init (){
    return await this.login()
  }

  componentDidMount() {
    this.init().then( (ds) => {
      this.setState({connected: ds !== undefined })
    })
  }

  componentWillUnmount() {
    if (ds !== undefined){
      ds.close()
      ds=undefined;
    }
  }
  render() {
    return <div>{this.props.render(this.state)}</div>
  }
}
// HOC
export const withDeepstream = (WrappedComponent, appUrl, authParams) => {
  return class extends React.Component {
    render() {
      return <Deepstream appUrl = {appUrl} authParams = {authParams}
        render = { (deepstream) => (
          <WrappedComponent {...this.props} connected={deepstream.connected}/>
        )}
      />
    }
  }
}
// Render prop
export class DeepstreamList extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      entries: []
    };
  }

  componentDidMount(){
    if (ds !== undefined ){
      // subscribe to list
      this.list = ds.record.getList( this.props.listName );
      this.list.subscribe( (entries) => {
        this.setState({entries: entries});
      }, true);  
    }
  }

  componentWillUnmount() {
    if (this.list !== undefined){
      this.list.discard();
      this.list=undefined;
    }
  }

  render() {
    return <div>{this.props.render(this.state)}</div>
  }
}
// HOC  
export const withDeepstreamList = (WrappedComponent) => {
  return class extends React.Component {
    render() {
      return <DeepstreamList listName = {this.props.listName} 
        render = { (deepstreamlist) => {
          return <WrappedComponent  {...this.props} entries={deepstreamlist.entries} />
        }}
      />
    }
  }
}


export class DeepstreamAnonRecord extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      data: {}
    };
    // subscribe to anonymous record
    this.anonymousRecord = ds.record.getAnonymousRecord();
    this.anonymousRecord.subscribe(data => {
      this.setState({data: data});
    }, true);
  }

  componentDidMount() {
    // set name of record
    this.anonymousRecord.setName(this.props.recordName);
  }

  componentWillUnmount() {
    // todo: need this?
    this.anonymousRecord.discard();
  }

  render() {
    return <div>{this.props.render(this.state)}</div>
  }
}
  
export const withDeepstreamAnonRecord = (WrappedComponent) => {
  return class extends React.Component {
    render(){
      return <DeepstreamAnonRecord recordName={this.props.recordName}
        render = { (deepstreamanonrecord) => {
          return <WrappedComponent {...this.props} data={deepstreamanonrecord.data} />
        } }
      />
    }
  }
}



