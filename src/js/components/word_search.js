import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { connect } from 'react-redux';

import MandarinWord from './mandarin_word';

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

class WordSearch extends React.Component {
  render() {
    return (
      <div>
        <SearchInput startQuery={this.props.startQuery}/>
        <MandarinWordList words={this.props.words}/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    words: state.words
  }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(WordSearch);
