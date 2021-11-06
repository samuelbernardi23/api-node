const express = require('express');
const routes = require('./routes');
const cors = require('cors');

require(__dirname + '/database/index');

const PORT = process.env || 3333;
const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
   console.log("Server iniciado na porta " + PORT);
});