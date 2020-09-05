import React, { Component } from "react";
//import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import Search from "./components/search";
import Table from "./components/table";
import Button from "./components/button";

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// class App extends Component {
//   render() {
//     const helloWorld = "Welcome to the Road to learn React";
//     return (
//       <div className="App">
//         <h2>{helloWorld}</h2>
//       </div>
//     );
//   }
// }

// const list = [
//   {
//     title: "React",
//     url: "https://facebook.github.io/react/",
//     author: "Jordan Walke",
//     num_comments: 3,
//     points: 4,
//     objectID: 0,
//   },
//   {
//     title: "Redux",
//     url: "https://github.com/reactjs/redux",
//     author: "Dan Abramov, Andrew Clark",
//     num_comments: 2,
//     points: 5,
//     objectID: 1,
//   },
// ];

// const isSearched = (searchTerm) => (item) =>
//   item.title.toLowerCase().includes(searchTerm.toLowerCase());
// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       list,
//       searchTerm: "",
//     };

//     this.onSearchChange = this.onSearchChange.bind(this);
//     this.onDismiss = this.onDismiss.bind(this);
//   }

//   onSearchChange(event) {
//     this.setState({ searchTerm: event.target.value });
//   }
//   onDismiss(id) {
//     const updatedList = this.state.list.filter((item) => item.objectID !== id);
//     this.setState({ list: updatedList });
//   }
//   render() {
//     const { list, searchTerm } = this.state;
//     return (
//       <div className="App">
//         <form>
//           <input
//             type="text"
//             value={searchTerm}
//             onChange={this.onSearchChange}
//           />
//         </form>
//         {list.filter(isSearched(searchTerm)).map((item) => {
//           const onHandleDismiss = () => this.onDismiss(item.objectID);
//           return (
//             <div key={item.objectID}>
//               <span>
//                 <a href={item.url}>{item.title}</a>
//               </span>
//               <span>{item.author}</span>
//               <span>{item.num_comments}</span>
//               <span>{item.points}</span>
//               <span>
//                 <button onClick={onHandleDismiss} type="button">
//                   Dismiss
//                 </button>
//               </span>
//             </div>
//           );
//         })}
//       </div>
//     );
//   }
// }

// class Developer {
//   constructor(firstname, lastname) {
//     this.firstname = firstname;
//     this.lastname = lastname;
//   }
//   getName() {
//     return this.firstname + " " + this.lastname;
//   }
// }

// const robin = new Developer("Robin", "Wieruch");
// console.log(robin.getName());

const DEFAULT_QUERY = "redux";
const PATH_BASE = "https://hn.algolia.com/api/v1";
const PATH_SEARCH = "/search";
const PARAM_SEARCH = "query=";
const PARAM_PAGE = "page=";
const PARAM_HPP = "hitsPerPage=";
const DEFAULT_HPP = "10";

class App extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      results: null,
      searchKey: "",
      searchTerm: DEFAULT_QUERY,
      error: null,
    };
    this.needsToSearchTopStories = this.needsToSearchTopStories.bind(this);
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
  }

  needsToSearchTopStories(searchTerm) {
    return !this.state.results[searchTerm];
  }

  fetchSearchTopStories(searchTerm, page = 0) {
    axios(
      `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`
    )
      .then(
        (result) => this._isMounted && this.setSearchTopStories(result.data)
      )
      .catch((error) => this._isMounted && this.setState({ error }));
  }

  onSearchSubmit(event) {
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });
    if (this.needsToSearchTopStories(searchTerm)) {
      this.fetchSearchTopStories(searchTerm);
    }
    event.preventDefault();
  }

  setSearchTopStories(result) {
    const { hits, page } = result;
    const { searchKey, results } = this.state;
    const oldHits =
      results && results[searchKey] ? results[searchKey].hits : [];
    const updatedHits = [...oldHits, ...hits];
    this.setState({
      results: { ...results, [searchKey]: { hits: updatedHits, page } },
    });
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }
  componentDidMount() {
    this._isMounted = true;
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });
    this.fetchSearchTopStories(searchTerm);
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  onDismiss(id) {
    const { searchKey, results } = this.state;
    const { hits, page } = results[searchKey];
    const updatedHits = hits.filter((item) => item.objectID !== id);
    this.setState({
      //result: Object.assign({}, this.state.result, { hits: updatedHits }),
      results: { ...results, [searchKey]: { updatedHits, page } },
    });
  }
  render() {
    const { results, searchKey, searchTerm, error } = this.state;
    // if (error) {
    //   return <p>Something went wrong.</p>;
    // }
    const page =
      (results && results[searchKey] && results[searchKey].page) || 0;
    const list =
      (results && results[searchKey] && results[searchKey].hits) || [];
    return (
      <div className="page">
        <div className="interactions">
          <Search
            value={searchTerm}
            onChange={this.onSearchChange}
            onSubmit={this.onSearchSubmit}
          >
            Search
          </Search>
        </div>
        {error ? (
          <div className="interactions">
            <p>Something went wrong.</p>
          </div>
        ) : (
          <Table
            list={list}
            //pattern={searchTerm}
            onDismiss={this.onDismiss}
          />
        )}
        <div className="interactions">
          <Button
            onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}
          >
            More
          </Button>
        </div>
      </div>
    );
  }
}

// class Search extends Component {
//   render() {
//     const { value, onChange, children } = this.props;
//     return (
//       <form>
//         {children}
//         <input type="text" value={value} onChange={onChange} />
//       </form>
//     );
//   }
// }

export default App;
