import React, { Component } from 'react';
import LinearProgress from 'material-ui/LinearProgress';

class PokemonIvPercentBar extends Component {
	render() {
		if (this.props.percent > 0) {
			return (
				<LinearProgress mode="determinate" value={this.props.percent} />
			);
		} else {
			return null;
		}
	}
}

export default PokemonIvPercentBar;