const express = require('express');
const connectDB = require('./config/db');
const app = express();

//Connect database
connectDB();
app.get("/", (req, res) => res.send('API running'));

// Define Routes
app.use('/api/user', require('./routes/api/user'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/auth', require('./routes/api/auth'));
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server started at port ${port}`));