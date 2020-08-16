import React, {Component} from 'react';
import {connect } from 'react-redux';
import Pile from "../Pile/Pile.component";
import './PileList.scss'
import {calculateZeroNimSum} from "../../helpers/calculateNimSum";
import {removeFromPile} from '../../redux/piles/piles.action';
import {moveToTheNextPlayer}from '../../redux/players/players.action';
import {updateGameLog} from "../../redux/game/game.action";
import {GAME_TYPES} from '../../constants/gameOptions'


class PileList extends Component{
    constructor(props){
        super(props);
        this.state = {
            turn: false
        }
    }

    // removeFromPile = (count, index) => {
    //     if(this.props.piles[index] - count >= 0){
    //         this.setState(() => {
    //             const piles = this.props.piles;
    //             piles[index] = piles[index] - count;
    //             return piles;
    //         })
    //     }
    // };

    componentDidUpdate() {
        let randomPile = Math.floor((Math.random() * Math.floor(this.props.piles.length)));
        let randomCount = Math.floor((Math.random() * this.props.piles[randomPile]) + 1);
        if(this.props.gameType === GAME_TYPES.COMPUTER_RANDOM_GAME && this.props.currentPlayer === 1 && !this.state.turn){
             setTimeout(() => {
                 this.setState({turn: true});
                 this.props.remove(randomCount, randomPile, this.props.currentPlayerName);
                 this.props.moveToNext(this.props.gameType);
                 this.setState({turn: false});
            }, 2000);
        }else if(this.props.gameType === GAME_TYPES.COMPUTER_NIM_GAME && this.props.currentPlayer === 1 && !this.state.turn){
            setTimeout(() => {
                this.setState({turn: true});
                if(this.props.nimZeroSum){
                    this.props.remove(this.props.nimZeroSum.count, this.props.nimZeroSum.pileIndex, this.props.currentPlayerName);
                }else{
                    this.props.remove(randomCount, randomPile, this.props.currentPlayerName);
                }
                this.props.moveToNext(this.props.gameType);
                this.setState({turn: false});
            }, 2000);
        }
    }

    render() {
        return (
            <div className="pile-list">
                {this.props.piles.map((count, index) => {
                return (<Pile
                            key={index}
                            count={count}
                            index={index}
                            turn={this.state.turn}
                            // removeFromPile={this.removeFromPile}
                        />)
            })}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    piles: state.piles.pileList,
    currentPlayer: state.players.currentPlayer,
    gameType: state.game.gameType,
    currentPlayerName: state.players.playerList[state.players.currentPlayer],
    nimZeroSum: state.piles.nimZeroSum
});

const mapDispatchToProps = (dispatch) => {
    return {
        remove: (count, index, name) => {
            dispatch(removeFromPile(count, index))
            dispatch(updateGameLog(name, index, count));
        },
        moveToNext: (gameType) => {dispatch(moveToTheNextPlayer(gameType))}
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(PileList);