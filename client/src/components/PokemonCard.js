import React, { Component } from 'react';
import {Card, CardHeader} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Toggle from 'material-ui/Toggle';
import PokemonIvPercentBar from './PokemonIvPercentBar';
import PokemonAutoComplete from './PokemonAutoComplete';
import PokemonImage from './PokemonImage';

const cardStyle = {
	padding: '2em'
}

const toggleStyle = {
	marginTop: '0.875em'
}

class PokemonCard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			pokemon: props.pokemon,
			cp: 0,
			hp: 0,
			dust: 0,
			poweredUp: false,
			minIvPerfection: 0,
			maxIvPerfection: 0,
			averageIvPerfection: 0,
			grade: ''
		}
	}

	handlePokemonChange(pokemon) {
		this.setState({pokemon: pokemon});
		console.log('selected', pokemon);
	}

	handleCpChange(evt, cp) {
		this.setState({cp});
		console.log('cp', cp);
	}

	handleHpChange(evt, hp) {
		this.setState({hp});
		console.log('hp', hp);
	}

	handleDustChange(evt, dust) {
		this.setState({dust})
		console.log('dust', dust)
	}

	handlePoweredUpChange(evt, poweredUp) {
		this.setState({poweredUp});
		console.log('powered up', poweredUp);
	}

	getIvRange() {
		return this.state.minIvPerfection + '% - ' + this.state.maxIvPerfection + '%';
	}

	async getIvs() {
		const headers = {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		}
		const pokemon = {
			name: this.state.pokemon,
			cp: this.state.cp,
			hp: this.state.hp,
			dust: this.state.dust,
			poweredUp: this.state.poweredUp
		}
		console.log('values', pokemon);
		//TODO: add error handling
		let res = await fetch('http://' + window.location.hostname + ':3001/iv', {
			headers: headers,
			method: 'POST',
			mode: 'cors',
			body: JSON.stringify(pokemon)
		});
		let ivs = await res.json();
		console.log('ivs', ivs);
		this.setState({
			minIvPerfection: parseInt((ivs.ivs.shift().perfection*100).toFixed(0), 10),
			maxIvPerfection: parseInt((ivs.ivs.pop().perfection*100).toFixed(0), 10),
			grade: ivs.grade.averageGrade.letter 
		});
		console.log('state before avg', this.state);
		this.setState({
			averageIvPerfection: ((this.state.minIvPerfection + this.state.maxIvPerfection)/2),
		})
		console.log('state', this.state);
	}

	render() {
		return (
			<div>
				<Card style={cardStyle}>
					<CardHeader
						title={(this.state.grade) ? this.state.grade + ': ' + this.getIvRange() : ''}
					/>
					<PokemonIvPercentBar
						percent={this.state.averageIvPerfection}
					/>
					<PokemonImage
						pokemon={this.state.pokemon}
						height={150}
						className="pokemonGif"
					/>
					<PokemonAutoComplete
						onNewRequest={this.handlePokemonChange.bind(this)}
					/>
					<TextField
						defaultValue=""
						floatingLabelText="CP"
						type="number"
						onChange={this.handleCpChange.bind(this)}
					/><br />
					<TextField
						defaultValue=""
						floatingLabelText="HP"
						type="number"
						onChange={this.handleHpChange.bind(this)}
					/><br />
					<TextField
						defaultValue=""
						floatingLabelText="Dust"
						type="number"
						onChange={this.handleDustChange.bind(this)}
					/><br />
					<Toggle
						label="Powered up?"
						style={toggleStyle}
						onToggle={this.handlePoweredUpChange.bind(this)}
				    /><br />
					<div>
						<RaisedButton
							label="Calculate IV"
							primary={true}
							fullWidth={true}
							onClick={this.getIvs.bind(this)}
						/>
					</div>
			    </Card>
	         </div>
		);
	}
}

export default PokemonCard;