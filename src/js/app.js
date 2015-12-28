import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { connect } from 'react-redux';
import { WordSearch } from './components/word-search'

ReactDOM.render((
    <WordSearch store={store}/>
  ),
  document.getElementById('laoshi')
);
