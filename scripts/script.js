const url = 'https://covid-193.p.rapidapi.com/statistics';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '25131730b9msh5634ad3cd66f649p10fa69jsnae450f89123f',
		'X-RapidAPI-Host': 'covid-193.p.rapidapi.com'
	}
};

async function displayInput(event){

    // Prevent form from submitting
    event.preventDefault();

    // Get input values
    let countryName = document.getElementById("country").value;

    console.log(countryName);

    try {
        const response = await fetch(url, options);
        const result = await response.text();
        const myObj = JSON.parse(result);

        /** Code below to check all the countries in the object 

        let allArrays = myObj.response;
        let allCountries = allArrays.map(obj => obj.country);  */

        let findCountry = myObj.response.find(name => name.country.toLowerCase() === countryName.toLowerCase());
        console.log(findCountry);

        if (!findCountry) {
            document.getElementById("invalid").innerHTML = 'Country ' + countryName + ' not found.';
            throw new Error('Country ${countryName} not found');
        }

        document.getElementById("invalid").innerHTML = ''

        // Display values
        let activeCases = findCountry.cases.active;
        document.getElementById("activeCases").innerHTML = activeCases;

        let newCases = findCountry.cases.new;
        document.getElementById("newCases").innerHTML = newCases;

        let recoveredCases = findCountry.cases.recovered;
        document.getElementById("recoveredCases").innerHTML = recoveredCases;

        let totalCases = findCountry.cases.total;
        document.getElementById("totalCases").innerHTML = totalCases;

        let totalDeaths = findCountry.deaths.total;
        document.getElementById("totalDeaths").innerHTML = totalDeaths;

        let totalTests = findCountry.tests.total;
        document.getElementById("totalTests").innerHTML = totalTests;
        
    } catch (error) {
        console.error(error.message);
    }
}

