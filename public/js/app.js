const weatherForm = document.querySelector('#weather-search-form');
const searchElement = document.querySelector('#weather-search-input');

const msg1 = document.querySelector('#msg1');
const msg2 = document.querySelector('#msg2');

weatherForm.addEventListener('submit', (e) => {
	e.preventDefault();
	const location = searchElement.value;

	if (location === '') {
		console.log('No location entered.');
		msg1.textContent = 'Type a location';
		setTimeout(() => {
			msg1.textContent = '';
		}, 2000);
	} else {
		msg1.textContent = 'Loading...';
		msg2.textContent = '';

		fetch(`/weather?address=${location}`).then((res) => {
			res.json().then((data) => {
				if (data.error) {
					msg1.textContent = data.error;
				} else {
					msg1.textContent = data.location;
					msg2.textContent = data.forecast;
				}
			});
		});
	}
});
