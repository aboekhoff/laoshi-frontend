import React from 'react';

export default class SearchInput extends React.Component {
  handleChange(event) {
    this.props.startQuery(event.target.value);
  }

  render() {
    return <input type="text" onChange={this.handleChange.bind(this)}/>;
  }
}
