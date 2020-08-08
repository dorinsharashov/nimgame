import React from 'react';
import logo from './logo.svg';
import './App.css';
import PileList from "./components/PileList/PileList.component";
import Player from './components/Player/Player.component';
import GameBoard from "./components/GameBoard/GameBoard.component";
import PlayerList from "./components/PlayerList/PlayerList.compontnt";
import GameSetup from './components/GameSetup/GameSetup.component';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
      //<GameSetup />
    <GameBoard/>
  );
}

export default App;
