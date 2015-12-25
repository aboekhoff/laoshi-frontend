import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { connect } from 'react-redux';

const initialState = {
  words: [],
  queryState: 'INACTIVE'
}

const dispatcher = function(state = initialState, action) {
  switch (action.type) {
    case 'QUERY_STARTED':
      $.ajax({
        url: '/mandarin_words',
        data: { query: action.query, mode: action.mode },
        dataType: 'json'
      }).done((data) => {
        store.dispatch({
          type: 'QUERY_COMPLETED',
          payload: data
        })
      })
      return updateStore({
        words: [],
        queryState: 'IN_PROGRESS'
      });
    case 'QUERY_COMPLETED':
      return updateStore({
        words: action.payload.mandarin_words,
        queryState: 'INACTIVE'
      });
    default:
      return state;
  }
}

const store = createStore(dispatcher);

const updateStore = function(props) {
  return Object.assign({}, store, props)
}

class MandarinWord extends React.Component {
  render() {
    const word = this.props.word;
    return (
      <div className="mandarin-word">
        <div>
          <span className="traditional">{word.traditional}</span>
          <span className="simplified">{word.simplified}</span>
          <span className="pinyin">{word.pretty_pinyin}</span>
        </div>
        <div>
          <span className="english">{word.english}</span>
        </div>
      </div>
    )
  }
}

class MandarinWordList extends React.Component {
  render() {
    return (
      <div className="mandarin-word-list">
        {this.props.words.map((word) => { return <MandarinWord word={word}/> })}
      </div>
    )
  }
}

class SearchInput extends React.Component {
  handleChange(event) {
    this.props.startQuery(event.target.value);
  }

  render() {
    return <input type="text" onChange={this.handleChange.bind(this)}/>;
  }
}

const App = connect(
  function mapStateToProps(state) {
    return {
      words: state.words
    }
  },
  function mapDispatchToProps(dispatch) {
    return {
      startQuery: (query) => {
        dispatch({
          type: 'QUERY_STARTED',
          query: query,
          mode: 'english'
        });
      }
    }
  }
)(React.createClass({
  render() {
    return (
      <div>
        <h1 className="header">Laoshi</h1>
        <SearchInput startQuery={this.props.startQuery}/>
        <MandarinWordList words={this.props.words}/>
      </div>
    )
  }
}));

ReactDOM.render((
    <App store={store}/>
  ),
  document.getElementById('laoshi')
);
