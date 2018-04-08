const Discord = require('discord.js');
const client = new Discord.Client();
const express = require('express');
const app = express();
const ejs = require('ejs');
const auth = require("./settings.json");

client.on('ready', () => {
	console.log("Bot up and running.");
})

app.engine("ejs", ejs.renderFile);
app.set("views", `${__dirname}/Pages`);
app.set("views engine", "ejs");
app.use(express.static(`${__dirname}` + "/Pages/Static"));

const server = app.listen(80, "0.0.0.0", () => {
	console.log("Web server now online!");
	process.setMaxListeners(0);
});

app.use((error, req, res, next) => {
	console.log(`There seems to have been an error while trying to start up the web server, take a look: \n${error}`);
	res.sendStatus(500);
	res.render("error.ejs", {error});
});

app.get("/", (req, res) => {
	res.render("stats.ejs", {
		client: client
	});
});

/*
if you wanted another page

app.get('/url', (req, res) => {
	res.render("ejs file.ejs", {
		// variables here
	})
})

*/

client.login(auth.token);