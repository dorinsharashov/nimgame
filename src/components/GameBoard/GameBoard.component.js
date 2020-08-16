import React, {Component} from 'react';
import {connect} from 'react-redux';
import PileList from "../PileList/PileList.component";
import './GameBoard.scss';
import PlayerList from "../PlayerList/PlayerList.compontnt";
import GameStatus from "../GameStatus/GampStatus.component";
import SetupModal from '../GameSetup/GameSetup.component'
import {setSetup} from '../../redux/game/game.action'


class GameBoard extends Component {

    doneGame = () => {
        alert(`${this.props.currentPlayerName} won!!`);
        this.props.setSetup();
    }

    render() {
        if(!this.props.isSetup){
            return (
                <div className="game-board">
                    {this.props.isDone && this.doneGame()}
                    <div className="players-board">
                        <PlayerList />
                    </div>
                    <div className="piles-board">
                        <p className="piles-board-title">Game Board</p>
                        <PileList/>
                    </div>
                    <div className="status-board">
                        <GameStatus />
                    </div>
                </div>)
        }else{
            return (<SetupModal />)
        }
        // return (
        //     <div className="game-board">
        //         <div className="piles-board">
        //             <PileList piles={this.state.piles}/>
        //         </div>
        //         <div className="players-board">
        //             <PlayerList players={this.state.players} currentPlayerIndex={this.state.currentPlayerIndex}/>
        //         </div>
        //         {/*<button onClick={this.props.nextPlayer}>Next Move</button>*/}
        //     </div>

            // {/*<Pile key={1}*/}
            //       {/*count={10}*/}
            //       {/*index={1}/>*/}
            // {/*<div className="game-board">*/}
            //     {/*<div>*/}
            //         {/*<PileList/>*/}
            //     {/*</div>*/}
            //
            //     {/*<PlayerList currentPlayerName={"player one"} players={["Player 1", "Player 2","Player 3", "Player 4","Player 5", "Player 6", "Player 7", "Player 8","Player 9", "Player 10",]}/>*/}
            //     {/*/!*<PileList/>*!/*/}
            //     {/*/!*<Player/>*!/*/}
            // {/*</div>*/}
        //)
    }
}

const mapStateToProps = (state) => ({
    isSetup: state.game.setup,
    isDone: state.piles.isDone,
    currentPlayerName: state.players.playerList[state.players.currentPlayer]
});

const mapDispatchToProps = (dispatch) => {
    return {
        setSetup: () => {dispatch(setSetup())}
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(GameBoard);