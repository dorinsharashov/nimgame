import React, {Component} from 'react';
import pileImage from '../../constants/images/bucket.png';
import './Pile.scss';

class Pile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            countToTake : 0
        }
    }


    render(){
        const {index, count, removeFromPile} = this.props;
        const {countToTake} = this.state;
        return(
            <div className="pile">
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

            </div>
        )
    }
}

export default Pile;