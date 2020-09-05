import React, { Component } from "react";
import { Button } from "../button";
import "./index.css";
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
    const { list, onDismiss } = this.props;
    return (
      <div className="table">
        {/* {list.filter(isSearched(pattern)).map((item) => { */}
        {list.map((item) => {
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

export default Table;
