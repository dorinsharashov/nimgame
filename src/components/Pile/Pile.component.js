import React, {Component} from 'react';
import {connect} from 'react-redux';
import {removeFromPile} from '../../redux/piles/piles.action';
import {moveToTheNextPlayer}from '../../redux/players/players.action';
import {updateGameLog} from "../../redux/game/game.action";
import './Pile.scss';

class Pile extends Component {
    constructor(props) {
        super(props);
        this.ref = React.createRef();
        this.state = {
            countToTake : 0
        }
    }
    componentDidUpdate(prevProps, prevState){
        if(prevProps.count !== this.props.count && !this.props.isDone && !this.props.turn){
            this.props.moveToNext(this.props.gameType);
        }
    }

    takeAndMoveNext = () => {
        if(this.props.count < this.state.countToTake || this.state.countToTake <= 0){
            alert("alert!")
        }else{
            this.props.remove(this.state.countToTake,this.props.index, this.props.currentPlayerName);
        }
    }
    render(){
        const {index, count} = this.props;
        const {countToTake} = this.state;
        return(
            <div className="pile" ref={this.ref}>
                <p className="pile-header">Pile {index + 1}</p>
                <p className="pile-count">{count}</p>
                 <div className="pile-footer">
                     <input className="pile-to-take"
                             type="number"
                             min="1"
                             max={count}
                             value={countToTake}
                             onChange={(e) => {this.setState({countToTake: parseInt(e.target.value)})}}
                     />
                     <button className="take-pile"
                             //onClick={() => {this.props.takeAndMoveNext(this.state.countToTake, this.props.count, this.props.index)}}>
                         onClick={this.takeAndMoveNext}>
                             Take!
                     </button>
                </div>
             </div>
            /*{/!*<div className="pile">
                <p className="pile-header">Pile {index + 1}</p>
                <p className="pile-count">{count}</p>
                <img className="pile-image" src={pileImage}/>
                <div className="pile-footer">
                    <input className="pile-to-take"
                           type="number"
                           min="1"
                           max={count}
                           value={countToTake}
                           onChange={(e) => {this.setState({countToTake: e.target.value})}}
                    />
                    <button className="take-pile"
                            onClick={() => {removeFromPile(countToTake,index)}}>
                        Take!
                    </button>
                </div>

            </div>*!/}*/
        )
    }
}

const mapStateToProps = (state) => ({
    isDone: state.piles.isDone,
    currentPlayer: state.players.currentPlayer,
    gameType: state.game.gameType,
    currentPlayerName: state.players.playerList[state.players.currentPlayer]
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

export default connect(mapStateToProps,mapDispatchToProps)(Pile);