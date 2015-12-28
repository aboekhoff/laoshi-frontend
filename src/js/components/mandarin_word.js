import React from 'react';

export default class MandarinWord extends React.Component {
  render() {
    const word = this.props.word;
    return (
      <div className="mandarin-word">
        <div className="chinese">
          <span className="traditional">{word.traditional}</span>
          <span className="pinyin">{'(' + word.pretty_pinyin + ')'}</span>
        </div>
        <div>
          <span className="english">{word.english}</span>
        </div>
      </div>
    )
  }
}
