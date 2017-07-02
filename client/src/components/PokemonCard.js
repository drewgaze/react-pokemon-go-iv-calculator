import React, { Component } from 'react';
import {Card, CardHeader} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Toggle from 'material-ui/Toggle';
import Snackbar from 'material-ui/Snackbar';
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
			grade: '',
			error: false
		}
	}

	handleTouchTap(evt) {
		this.getIvs();
	}

	handlePokemonChange(pokemon) {
		this.setState({pokemon: pokemon});
	}

	handleCpChange(evt, cp) {
		this.setState({cp});
	}

	handleHpChange(evt, hp) {
		this.setState({hp});
	}

	handleDustChange(evt, dust) {
		this.setState({dust})
	}

	handlePoweredUpChange(evt, poweredUp) {
		this.setState({poweredUp});
	}

	handleRequestClose() {
		this.setState({error: false});
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
		try {
			let res = await fetch('/iv', {
				headers: headers,
				method: 'POST',
				body: JSON.stringify(pokemon)
			});
			let ivs = await res.json();
			let minIvPerfection = parseInt((ivs.ivs.shift().perfection*100).toFixed(0), 10),
				maxIvPerfection = parseInt((ivs.ivs.pop().perfection*100).toFixed(0), 10),
				averageIvPerfection = ((minIvPerfection + maxIvPerfection)/2);
			this.setState({
				minIvPerfection,
				maxIvPerfection,
				averageIvPerfection,
				grade: ivs.grade.averageGrade.letter 
			});
		} catch (error) {
			this.setState({error: true});
		}
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
							onTouchTap={this.handleTouchTap.bind(this)}
						/>
					</div>
					<Snackbar
						open={this.state.error}
						message="Unable to determine IVs."
						action="dismiss"
						autoHideDuration={4000}
						onRequestClose={this.handleRequestClose.bind(this)}
						onActionTouchTap={this.handleRequestClose.bind(this)}
					/>
			    </Card>
	         </div>
		);
	}
}

export default PokemonCard;