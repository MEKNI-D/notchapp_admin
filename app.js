/**
 * Created by Donia on 14/03/2017.
 */
var express = require('express');
var app = express();
app.use(express.static(__dirname + '/'));
app.listen(process.env.PORT || 3000);
console.log('app is running');