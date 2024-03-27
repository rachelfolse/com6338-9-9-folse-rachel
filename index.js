const URL = `https://api.openweathermap.org/data/2.5/weather`;
const apiKey = "e30e2daee255c78b9ae1c8f2470383af";
const form = document.querySelector("form");
let weather = document.querySelector("#weather");
let userInput = document.querySelector("#weather-search");

form.onsubmit = async (e) => {
	e.preventDefault();
	const locale = userInput.value.trim();
	if (!locale) return;
	try {
		const queryString = `?q=${locale}&units=imperial&appid=${apiKey}`;
		const fetchURL = `${URL}${queryString}`;

		clearForm();

		const res = await fetch(fetchURL);
		if (res.status !== 200) throw new Error(`Location not found`);
		const data = await res.json();

		displayWeather(data);
	} catch (err) {
		weather.textContent = err.message;
	}
};


const displayWeather = ({
	name,
	dt,
	sys: { country },
	coord: { lat, lon },
	main: { temp, feels_like },
	weather: [{ description, icon }]
}) => {
	weather.innerHTML = `
	    <h2>City: ${name}, ${country}</h2>
	    <a href="https://www.google.com/maps/search/?api=1&query=${lat},${lon}" target="_blank">Click to view map</a>
	    <img src="https://openweathermap.org/img/wn/${icon}@2x.png">
	    <p style="text-transform: capitalize;">Description: ${description}</p><br>
	    <p>Actual Temp: ${temp}</p>
	    <p>Perceived: ${feels_like}</p>
	    <p>Last Updated: ${convertTime(dt)}</p>
	`;
};

const convertTime = (time) => {
	return new Date(time * 1000).toLocaleTimeString("en-US", {
		hour: "numeric",
		minute: "2-digit"
	});
};

const clearForm = () => {
	weather.innerHTML = "";
	userInput.value = "";
};
