const calculator = require("pokemon-go-iv-calculator");

const calculate = (req, res, next) => {
	console.log('got req', req.body);
	let pokemon = req.body;
	res.send(calculator.evaluate(pokemon.name, pokemon.cp, pokemon.hp, pokemon.dust, pokemon.poweredUp));
}

module.exports = {calculate}