const {Builder} = require('selenium-webdriver');

const login = require('./login');

async function main() {
	const driver = await new Builder().forBrowser('chrome').build();

	try {
		await login(driver);
	}
	catch(exception){
		console.error("Test failed!", exception);
		return 1;
	}
};

// Start test
main();