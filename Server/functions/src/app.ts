const express = require("express");

const app = express()

app.get("*", (req,res) => {
	res.json({hello: "world_v2"});
})

exports.app = app;
