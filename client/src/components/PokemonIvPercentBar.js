import React, { Component } from 'react';
import LinearProgress from 'material-ui/LinearProgress';

class PokemonIvPercentBar extends Component {
	render() {
		return (
			<LinearProgress mode="determinate" value={this.props.percent} />
		);
	}
}

export default PokemonIvPercentBar;