import React, { Component } from "react";
//import logo from "./logo.svg";
import "./App.css";

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

const list = [
  {
    title: "React",
    url: "https://facebook.github.io/react/",
    author: "Jordan Walke",
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: "Redux",
    url: "https://github.com/reactjs/redux",
    author: "Dan Abramov, Andrew Clark",
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
];

const isSearched = (searchTerm) => (item) =>
  item.title.toLowerCase().includes(searchTerm.toLowerCase());
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
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list,
      searchTerm: "",
    };

    this.onSearchChange = this.onSearchChange.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }
  onDismiss(id) {
    const updatedList = this.state.list.filter((item) => item.objectID !== id);
    this.setState({ list: updatedList });
  }
  render() {
    const { list, searchTerm } = this.state;
    return (
      <div className="page">
        <div className="interactions">
          <Search value={searchTerm} onChange={this.onSearchChange}>
            Search
          </Search>
          <Table list={list} pattern={searchTerm} onDismiss={this.onDismiss} />
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

const Search = ({ value, onChange, children }) => (
  <form>
    {children} <input type="text" value={value} onChange={onChange} />
  </form>
);

class Table extends Component {
  render() {
    // const largeColumn = {
    //   width: "40%",
    // };
    const midColumn = {
      width: "30%",
    };
    const smallColumn = {
      width: "10%",
    };
    const { list, pattern, onDismiss } = this.props;
    return (
      <div className="table">
        {list.filter(isSearched(pattern)).map((item) => {
          const onHandleDismiss = () => onDismiss(item.objectID);
          return (
            <div key={item.objectID} className="table-row">
              <span style={{ width: "40%" }}>
                <a href={item.url}>{item.title}</a>
              </span>
              <span style={midColumn}>{item.author}</span>
              <span style={smallColumn}>{item.num_comments}</span>
              <span style={smallColumn}>{item.points}</span>
              <span style={smallColumn}>
                <Button
                  onClick={onHandleDismiss}
                  type="button"
                  className="button-inline"
                >
                  Dismiss
                </Button>
              </span>
            </div>
          );
        })}
      </div>
    );
  }
}

class Button extends Component {
  render() {
    const { onClick, className = "", children } = this.props;

    return (
      <button onClick={onClick} className={className} type="button">
        {children}
      </button>
    );
  }
}

export default App;
