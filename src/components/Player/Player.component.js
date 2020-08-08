import React, {Component} from 'react';
import PlayerIcon from '../../constants/images/player.png';
import './Player.scss';

const Player = ({name}) => (
    <div className="player">
        <p className="player-header">{name}</p>
        <img className="player-icon" src={PlayerIcon}/>
    </div>
)

export default Player;


// class Player extends Component{
//
//     constructor(props){
//         super(props);
//     }
//
//     render() {
//         return (
//             <div className={this.props.isCurrentPlayer ? 'player current-player' : 'player'}>
//                 <p className="player-header">{this.props.name}</p>
//                 <img className="player-icon" src={PlayerIcon}/>
//             </div>
//         )
//     }
// }
//
// export default Player;