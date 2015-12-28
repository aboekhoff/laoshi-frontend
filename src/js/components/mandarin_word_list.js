import React from 'react';

export default class MandarinWordList extends React.Component {
  render() {
    return (
      <div className="mandarin-word-list">
        {this.props.words.map((word) => { return <MandarinWord word={word}/> })}
      </div>
    )
  }
}
