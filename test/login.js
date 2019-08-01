const {By, until} = require('selenium-webdriver');

const config = require('../config.js');

/**
 * Main function of Login test.
 *
 * @param {!WebDriver} driver - Built driver for current browser.
 * @return Promise.resolve() if test passed otherwise trow error.
 */
module.exports = async function(driver){
	try{
		await driver.get(`${config.env.domain}/login`);

		// Set fileds
		const emailField = driver.findElement(By.name("email"));
		const passwordField = driver.findElement(By.name("password"));

		// Wait till email field is present
		await driver.wait(until.elementIsVisible(emailField));
		// Wait till password field is present
		await driver.wait(until.elementIsVisible(passwordField));

		// Pass values to fields
		await emailField.sendKeys(config.login.email);
		await passwordField.sendKeys(config.login.password);

		// Press login button
		const submitButton = driver.findElement(By.xpath("//button[@type='submit']")).click();

		// Wait until account link is present
		await driver.wait(until.elementLocated(By.css(`a[href="/account"`)), 8000);

		console.log("Login test passed");
	}
	catch(ex){
		console.error("Login test failed");
		throw ex;
	}
}