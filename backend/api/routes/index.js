/**
* @author     : Elamaran
* @description: Root route
*/

const quizRoutes = require('./quiz');
const uploads = require('./uploads');

module.exports = function (app) {
    app.use('/api/v1/quiz', quizRoutes);
    app.use('/api/v1/quiz/uploads', uploads);

    // Executes if invalid route is triggered
    app.use((req, res, next) => {
        const error = new Error('Not found');
        error.status = 404;
        next(error);
    });

    app.use((error, req, res, next) => {
        res.status(error.status || 500);
        res.json({
            error: {
                message: error.message
            }
        });
    });
};