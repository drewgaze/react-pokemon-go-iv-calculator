const 	express = require('express'),
		morgan = require('morgan'),
		bodyParser = require('body-parser'),
		cors = require('cors'),
		port = 3001,
		iv = require('./routes/iv');

const app = express();

app.use(bodyParser.json());
app.use(cors())
app.use(express.static(__dirname+'/client/build'));

app
.route("/iv")
.post(iv.calculate);

app.get('*', (req, res) => res.sendFile(__dirname+'/client/build/index.html'));

app.listen(port, () => console.log('app listening on port ' + port));

module.exports = app;