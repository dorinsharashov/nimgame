import React, {Component} from 'react';
import {connect} from 'react-redux';
import Player from "../Player/Player.component";
import './PlayerList.scss';

const PlayerList = ({players, currentPlayer, playersQueue}) => (
    <div className="player-list">
        <p>The Current Player</p>
        <Player name={players[currentPlayer]} />
        <p>The next players:</p>
        {playersQueue.map((name, index) => {return (<p key={index}>{name}</p>)})}
    </div>
)

const mapStateToProps = (state) => ({
    players: state.players.playerList,
    playersQueue: state.players.playersQueue,
    currentPlayer: state.players.currentPlayer
});


export default connect(mapStateToProps)(PlayerList);

//export default PlayerList;

// class PlayerList extends Component{
//
//     constructor(props){
//         super(props);
//     }
//
//     render(){
//         return (
//             <div className="player-list">
//                 <p>The next players:</p>
//                 {this.props.players.map((name) => {return (<p>{name}</p>)})}
//             </div>
//             // //<div>
//             //     //<Player name={this.props.currentPlayerName} isCurrentPlayer={true} />
//             //     <div className="all-player-list">
//             //         {this.props.players.map((name) => {return (<Player name={name}/>)})}
//             //     </div>
//             // //</div>
//         )
//     }
// }
//
// export default PlayerList;