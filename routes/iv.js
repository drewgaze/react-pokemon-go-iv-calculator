const calculator = require("pokemon-go-iv-calculator");

const calculate = (req, res, next) => {
	let pokemon = req.body;
	if (pokemon.name && pokemon.cp && pokemon.hp && pokemon.dust && calculator.pokemon.find(item => item.name == pokemon.name)) {
		res.send(calculator.evaluate(pokemon.name, pokemon.cp, pokemon.hp, pokemon.dust, pokemon.poweredUp));
	} else {
		res.status(500).send('Invalid request.');
	}
}

module.exports = {calculate}