const {Builder} = require('selenium-webdriver');

const login = require('./login');
const futures1 = require('./futures_1');

async function main() {
	const driver = await new Builder().forBrowser('chrome').build();

	try {
		await login(driver);
		await futures1(driver);
	}
	catch(exception){
		console.error("Test failed!", exception);
		return 1;
	}
};

// Start test
main();