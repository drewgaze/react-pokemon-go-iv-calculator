const 	express = require('express'),
		morgan = require('morgan'),
		bodyParser = require('body-parser'),
		cors = require('cors'),
		port = 3001,
		iv = require('./routes/iv');

const app = express();

app.use(bodyParser.json());
app.use(cors())

app
.route("/iv")
.post(iv.calculate);

app.listen(port, () => console.log('app listening on port ' + port));

module.exports = app;