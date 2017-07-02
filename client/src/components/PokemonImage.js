import React, { Component } from 'react';
import PokemonGif from 'react-pokemon-gif';

const defaultStyle = {
	height: 150
}

class PokemonImage extends Component {
	render() {
		if (this.props.pokemon) {
				return (
					<PokemonGif
						pokemon={this.props.pokemon}
						height={this.props.height}
						className={this.props.className}
					/>
				);
		} else {
			return (
				<div>
					<img
						style={defaultStyle}
						className={this.props.className}
						alt="Please select a Pokemon"
						src={process.env.PUBLIC_URL + '/pokeball.png'}
					/>
				</div>
			);
		}
	}
}

export default PokemonImage;