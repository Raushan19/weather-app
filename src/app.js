const express = require('express');
const path = require('path');
const hbs = require('hbs');

const app = express();
const PORT = process.env.PORT || 3000;

const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

// Define Paths
const publicPath = path.join(__dirname, '../public');
const static = express.static(publicPath);
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine & views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(static);

app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather App',
		name: 'Rick'
	});
});

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About Me',
		name: 'Rick'
	});
});

app.get('/help', (req, res) => {
	res.render('help', {
		message: 'How may I help you?',
		title: 'Help',
		name: 'Rick'
	});
});

app.get('/weather', (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: 'No location searched for. Try again!'
		});
	}

	geocode(req.query.address, (err, { latitude, longitude, location } = {}) => {
		if (err) {
			return res.send({ err });
		}
		forecast(latitude, longitude, (err, forecastData) => {
			if (err) {
				return res.send({ err });
			}

			res.send({
				forecast: forecastData,
				location,
				address: req.query.address
			});
		});
	});
});

app.get('/products', (req, res) => {
	if (!req.query.search) {
		return res.send({
			error: 'error'
		});
	}

	console.log(req.query.search);
	res.send({
		products: [],
		name: ''
	});
});

app.get('/help/*', (req, res) => {
	res.render('404', {
		title: '404',
		name: 'Rick',
		errorMsg: 'Help article not found'
	});
});

app.get('*', (req, res) => {
	res.render('404', {
		title: '404',
		name: 'Rick',
		errorMsg: 'Page Not Found!'
	});
});

app.listen(PORT, () => {
	console.log('Server is running on port 3000');
});
