import React from 'react';
import './App.css';
import FileView from './components/FileView';

export const App = props => {
  const { connection } = props;

  if (!connection) return null;

  return (<FileView connection={connection} />);

}

export default App;
