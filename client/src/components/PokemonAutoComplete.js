import React, {Component} from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import * as Pokemon from '../json/pokemon';

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