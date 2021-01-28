const express = require('express');
const logger = require('morgan');
const mongoClient = require('mongoose');

// setup connect mongodb by mongoose
mongoClient.connect('mongodb://127.0.0.1:27017/nodejsapistarter',{
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(()=>{
        console.log('✅ Connected database from mongodb.')
    })
    .catch((err)=>{
        console.error(`❌ Connect database is failed with error which is ${err}`)
    });

const app = express()

const userRoute = require('./routes/user')

// Middkewares
app.use(logger('dev')) ;

// Routess
app.use('/users', userRoute);


// Routes
app.get('/', (req, res, next) => {
    return res.status(200).json({
        message: 'Server is OK'
    })
});

// Catch errors (ex: 404) and forward them to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Error handler function
app.use(()=> {
    const error = app.get('env') === 'development' ? err : {};
    const status = err.status || 500;

    // response to client
    return res.status(status).json({
        error: {
            message: err.message
        }
    }) 
});

// Start the server
const port = app.get('port') || 3000;

app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
});