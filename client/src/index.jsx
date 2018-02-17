import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import { dummyData } from '../../data.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }

    this.search = this.search.bind(this);
  }

  // componentDidMount() {
  //   //console.log(this.props.dummyData)
  //   //this should get all the repos to display on each refresh.
  //   $.ajax({
  //     url: '/repos',
  //     method: 'GET',
  //     success: (data) => {
  //       console.log(data);
  //     }
  //   }) 
  // }

  search (term) {
    //console.log(`${term} was searched`);
    // TODO
    $.ajax({
      method: 'POST',
      url: '/repos',
      data: JSON.stringify({term: term}),
      contentType: 'application/json',
      success: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <Search onSearch={this.search}/>
      <RepoList repos={this.state.repos}/>
    </div>)
  }
}

ReactDOM.render(<App dummyData={dummyData}/>, document.getElementById('app'));