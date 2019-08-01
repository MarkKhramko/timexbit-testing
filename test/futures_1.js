const {By, Key, until} = require('selenium-webdriver');

/**
 * Finds input by its label text.
 *
 * @param {!WebElement} blockToSearchInto - The element to serch into.
 * @param {String} labelText - Label of the input field
 * @return Promise {!WebElement} found input or trow error.
 */
async function findInputByLabel(blockToSearchInto, labelText){
	const labelQuery = By.xpath(`//div[contains(text(), "${labelText}") and @class="field-label is-normal"]`);
	const label = await blockToSearchInto.findElement(labelQuery);

	// Get parent element of label
	const fieldBlock = await label.findElement(By.xpath("./.."));
	// Get first found input
	const input = await fieldBlock.findElement(By.tagName("input"));
	return input;
}

/**
 * Main function of Futures test.
 *
 * @param {!WebDriver} driver - Built driver for current browser.
 * @return Promise.resolve() if test passed otherwise trow error.
 */
module.exports = async function(driver){
	try{
		/* Check "Limit" block START */
		// Find Buy/Sell block
		const buySellBlock = await driver.findElement(By.xpath(`//div[@class="card cp-buy-sell"]`));

		// Find Amount input field
		const amountField = await findInputByLabel(buySellBlock, "Amount");
		// Enter integer in Amount input
		await amountField.sendKeys(1);
		// Find Buy button
		const buyButton = await buySellBlock.findElement(By.xpath(`//button[contains(text(), "Buy")]`));

		// Check if Buy button is enabled
		if (await buyButton.isEnabled() === true){
			console.log("Buy button test 1: passed! (Is enabled)");
		}
		else{
			const error = new Error("Buy button is not enabled after Amount changed");
			throw error;
		}

		// Leave Amount field empty
		await amountField.sendKeys(Key.BACK_SPACE);

		// Check if Buy button is disabled
		if (!(await buyButton.isEnabled()) === true){
			console.log("Buy button test 2: passed! (Is disabled)");
		}
		else{
			const error = new Error("Buy button is not disabled after Amount changed to null");
			throw error;
		}
		/* Check "Limit" block END */


		console.log("Futures test passed");
	}
	catch(ex){
		console.error("Futures test failed");
		throw ex;
	}
}