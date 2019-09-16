import React from 'react';
import logo from './logo.svg';
import './App.css';
import FileView from './components/FileView';

export const App = props => {
  const { connection } = props;

  if (!connection) return null;

  return (<FileView connection={connection} />);

}

export default App;
