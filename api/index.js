const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const urlRoutes = require('./routes/urlroutes');
const urlService = require('./services/urlservice')
dotenv.config();

const app = express();

app.use(cors());
app.use(helmet.default());
app.use(express.json());

app.get('/:short_url',async(req,res) => {
    const url = await urlService.redirectUrl(req.params.short_url)
    res.redirect(url)
})
app.use('/api/url',urlRoutes);

const port = process.env.API_PORT || 5000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})