import React, {Component} from 'react';
import {connect } from 'react-redux';
import "./GameStatus.scss";
import Pile from "../Pile/Pile.component";
import Collapse from 'react-bootstrap/Collapse'

import {removeFromPile} from '../../redux/piles/piles.action';
import {moveToTheNextPlayer}from '../../redux/players/players.action';

import {calculateZeroNimSum} from '../../helpers/calculateNimSum'
import {GAME_TYPES} from '../../constants/gameOptions'


class GameStatus extends Component{
    constructor(props) {
        super(props);
        this.state={
            open: false
        }
    }


    render() {
        return (
            <div className="game-status">
                <div className="game-log">
                    <p className="game-log-header">Game History:</p>
                    {/*<p>{this.props.gameLog}</p>*/}
                    {this.props.gameLog.map((log, index) => {
                        return <p key={index} className="log"><span>{log.name}</span> took <span>{log.count}</span> from pile <span>{log.pileIndex + 1}</span></p>
                    })}
                </div>
                <div className="min-sum">
                    <button
                        onClick={() => this.setState({open:!this.state.open})}
                        aria-controls="example-collapse-text"
                        aria-expanded={this.state.open}
                    >
                        Nim Hint!
                    </button>
                    <Collapse in={this.state.open}>
                        <div id="example-collapse-text">
                            {this.props.nimZeroSum ?
                                <p>You should take <span>{this.props.nimZeroSum.count}</span> from pile <span>{this.props.nimZeroSum.pileIndex + 1}</span></p>
                                :
                                <p>There is nothing you can do...</p>}
                        </div>
                    </Collapse>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    piles: state.piles.pileList,
    currentPlayer: state.players.currentPlayer,
    gameType: state.game.gameType,
    gameLog: state.game.gameLog,
    nimZeroSum: state.piles.nimZeroSum
});

const mapDispatchToProps = (dispatch) => {
    return {
        remove: (count, index) => {
            dispatch(removeFromPile(count, index))
        },
        moveToNext: (gameType) => {dispatch(moveToTheNextPlayer(gameType))}
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(GameStatus);