import React, {Component} from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import {pokemon as Pokemon} from 'pokemon-go-iv-calculator';

class PokemonAutoComplete extends Component {
	render() {
		return (
			<div>
				<AutoComplete
				floatingLabelText="Pokemon"
				dataSource={Pokemon.map(pokemon => pokemon.name)}
				filter={AutoComplete.caseInsensitiveFilter}
				onNewRequest={this.props.onNewRequest}
				/>
			</div>
		);
	}
}

export default PokemonAutoComplete;