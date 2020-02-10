const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const app = express();

//Connect database
connectDB();



//Init Middleware
app.use(express.json({ extended: false }))

// Define Routes
app.use('/api/user', require('./routes/api/user'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/auth', require('./routes/api/auth'));

//Serve Static asset in production
if (process.env.NODE_ENV === 'production') {
    //SET STATIC FOLDER
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server started at port ${port}`));