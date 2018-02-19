import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }
    this.search = this.search.bind(this);
  }

  componentDidMount() {
    this.fetchRepos();
  }

  updateRepos(data) {
    this.setState({repos: data});
  }

  fetchRepos() {
    $.ajax({
      url: '/repos',
      method: 'GET',
      success: (data) => {
        this.updateRepos(data);
      }
    }) 
  }

  search (term) {
    $.ajax({
      method: 'POST',
      url: '/repos',
      data: JSON.stringify({term: term}),
      contentType: 'application/json',
      success: (data) => {
        setTimeout(() => {
          this.fetchRepos();
        }, 2000);
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

ReactDOM.render(<App />, document.getElementById('app'));