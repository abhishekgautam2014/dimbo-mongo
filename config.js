var mongoose = require('mongoose');

// We need to difine the URL
var URL = process.env.URL || 'mongodb://localhost/crudbuilder';
    
mongoose.set('useCreateIndex', true);

mongoose.set('useFindAndModify', false);

//Connection establishment
mongoose.connect(URL, {
    useNewUrlParser: true,
    useCreateIndex: true
});

var db = mongoose.connection;

//We enebled the Listener
db.on('error', () => {
    console.error('Error occured in db connection');
});

db.on('open', () => {
    console.log('DB Connection established successfully');
});
