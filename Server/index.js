const express = require('express')
const cors = require('cors')
const Routes = require("./Routes/routes")
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((err, req, res, next) => {
    if (err.message)
        console.log('🚨 Error! 🚨', err.message)

    return res.status(500).send({ 'error': 'Error when handling request.' })
});

app.use(Routes);


app.all("*", (req, res) => {
    return res.status(404).send({ 'error': "Page not found" });
});

app.listen(PORT, (err) => {
    if (err)
        throw err;

    console.log('listening on 8080');

})
