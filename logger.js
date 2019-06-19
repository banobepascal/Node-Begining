
app.use(function(req, res, next) {
    console.log('Logging...');
    next();
});

module.exports = log;