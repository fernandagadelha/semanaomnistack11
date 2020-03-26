const express = require('express');

const cors = require('cors');

const routes = require('./routes');
//sempre coloco o ./ ao invés de passar apenas o nome do arquivo, senão ele vai achar que o routes é um pacote, como o express, mas
//ele não é, ele é um arquivo. 

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333);



