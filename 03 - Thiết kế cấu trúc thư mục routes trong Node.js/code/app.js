const express = require('express');
const logger = require('morgan');

const app = express();

const userRoute = require('./routes/user')

// Middkewares
app.use(logger('dev')) ;

// Routess
app.use('/', userRoute);


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