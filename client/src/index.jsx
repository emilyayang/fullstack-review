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
    this.onSearch = this.onSearch.bind(this)
    this.onSearch = this.onSearch.bind(this)

  }

  onSearch(term) {
    $.post('/repos', { username: term },
      (data, status) => {
        console.log("post data: " + data + " status: " + status);
      });
    $.get('/repos', (data) => {
      this.setState({ repos: data }, () => console.log(this.state))
    });
  }

  render() {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos} />
      <Search onSearch={this.onSearch.bind(this)} />
      {this.state.repos.map((repo, i) => {
        return <div> {repo.name} </div>
      })}
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));