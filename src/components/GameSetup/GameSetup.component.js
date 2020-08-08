import React, {Component} from 'react';
import {connect} from 'react-redux';
import Modal from 'react-modal';

import {initPiles} from '../../redux/piles/piles.action';
import {initPlayers} from '../../redux/players/players.action';
import {setGame} from '../../redux/game/game.action';
import {GAME_TYPES} from '../../constants/gameOptions'

import './GameSetup.scss';

class GameSetup extends Component {

    constructor(props){
        super(props);
        this.state = {
            count:1,
            pileCount: 2,
            pileIndex:0,
            pileList: [],
            numOfPlayers: 2,
            stepIndex: 0,
            gameType: GAME_TYPES.REGULAR_GAME
        }
    }
    render(){
        return (
            <Modal
                isOpen={true}
                contentLabel="Example Modal"
                className="Modal"
                ariaHideApp={false}
                overlayClassName="myOverlayClass"
            >
                <div className="setup-header">
                    <p>Hello and welcome to Nim!</p>
                </div>
                <div className="setup-body">
                    {/*<div className="setup-piles">*/}
                        { this.state.stepIndex === 0 &&
                        <div>
                            <p>What kind of game would you like to play?</p>
                            <div>
                                <select name="cars" id="cars"
                                        onChange={(e) => {this.setState({gameType: e.target.value})}}
                                >
                                    <option value={GAME_TYPES.REGULAR_GAME}>Regular Game - Play against other players</option>
                                    <option value={GAME_TYPES.RANDOM_GAME}>Random Turn Game - Play against other players with random turns</option>
                                    <option value={GAME_TYPES.COMPUTER_RANDOM_GAME}>Computer Random Game - Play against the computer with random computer moves</option>
                                    <option value={GAME_TYPES.COMPUTER_NIM_GAME}>Computer Strategic Game - Play against the computer with strategic computer moves</option>
                                </select>
                                <button onClick={() => this.setState({stepIndex: 1})}>OK</button>
                            </div>
                        </div>
                        }
                        { this.state.stepIndex === 1 &&
                            <div>
                                <p>Configure number of piles:</p>
                                <div>
                                <input type="number"
                                       min="2"
                                       max="100"
                                       value={this.state.pileCount}
                                       onChange={(e) => {this.setState({pileCount: e.target.value})}}/>
                                <button onClick={() => this.setState({stepIndex: 2})}>OK</button>
                                </div>
                            </div>
                        }
                        {this.state.stepIndex === 2 &&
                            <div>
                            <p>Configure size of pile {this.state.pileIndex + 1}:</p>
                                <input
                                    type="number"
                                    value={this.state.count}
                                    min="1"
                                    onChange={(e) => {this.setState({count: e.target.value})}}/>
                            <button onClick={() => {
                                this.setState(prevState => ({pileList: [...prevState.pileList, parseInt(this.state.count,10)], pileIndex: prevState.pileIndex + 1}))
                                if(this.state.pileIndex === this.state.pileCount - 1){
                                    this.setState({stepIndex: 3})
                                }
                            }}>Next pile</button>
                            </div>
                        }
                    {/*</div>*/}
                    {this.state.stepIndex === 3 && (this.state.gameType === GAME_TYPES.REGULAR_GAME || this.state.gameType === GAME_TYPES.RANDOM_GAME) &&
                        <div className="setup-players">
                            <p>Configure number of players:</p>
                            <input type="number"
                                          min="2"
                                          value={this.state.numOfPlayers}
                                          onChange={(e) => {this.setState({numOfPlayers: e.target.value})}}/>
                        </div>
                    }
                </div>
                {this.state.stepIndex === 3 && <div className="setup-footer">
                    <button onClick={() => {
                            if(this.state.gameType === GAME_TYPES.COMPUTER_RANDOM_GAME || this.state.gameType === GAME_TYPES.COMPUTER_NIM_GAME){
                                this.props.initGame(this.state.pileList, 2, 0, this.state.gameType)
                            }else{
                                this.props.initGame(this.state.pileList, this.state.numOfPlayers, 0,this.state.gameType)
                            }
                        }}
                    >Start Game!</button>
                </div>}

            </Modal>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        initGame: (piles, players, currentPlayer, gameType) => {
            dispatch(initPiles(piles));
            dispatch(initPlayers(players, currentPlayer, gameType));
            dispatch(setGame(gameType));
        },
    }
}

export default connect(null,mapDispatchToProps)(GameSetup);
