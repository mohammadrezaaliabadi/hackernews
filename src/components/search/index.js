import React from "react";
import PropTypes from "prop-types";
// const Search = ({ value, onChange, onSubmit, children }) => {
//   let input;
//   return (
//     <form onSubmit={onSubmit}>
//       <input
//         type="text"
//         value={value}
//         onChange={onChange}
//         ref={(node) => (input = node)}
//       />
//       <button type="submit">{children}</button>
//     </form>
//   );
// };

class Search extends React.Component {
  componentDidMount() {
    if (this.input) {
      this.input.focus();
    }
  }
  render() {
    const { value, onChange, onSubmit, children } = this.props;
    return (
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={value}
          onChange={onChange}
          ref={(node) => (this.input = node)}
        />
        <button type="submit">{children}</button>
      </form>
    );
  }
}

Search.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
  children: PropTypes.node.isRequired,
};

export default Search;
