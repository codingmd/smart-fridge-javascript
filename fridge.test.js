const Item = require("./item.js");
const Fridge = require("./fridge.js");

const testDate = (daysToRemoveOrAdd, fridgeCurrentDate) => {
	let currentDateArray = fridgeCurrentDate.split("/");
	let year = currentDateArray[2];
	if (year.length < 4) {
		year = "20" + year;
	}
	let currentDate = new Date(year, currentDateArray[1], currentDateArray[0]);
	currentDate.setDate(currentDate.getDate() + daysToRemoveOrAdd);
	let dd = String(currentDate.getDate());
	let mm = String(currentDate.getMonth());
	let yyyy = currentDate.getFullYear();
	return dd + "/" + mm + "/" + yyyy;
};

describe("index", () => {
		it("when 2 items added to fridge then fridge count is 2", () => {
			const milk = new Item("milk", "21/10/21", "sealed");
			const butter = new Item("butter", "21/10/21", "sealed");
			const fridge = new Fridge();
			
			fridge.signalDoorOpened();
			fridge.scanAddedItem(milk);
			fridge.scanAddedItem(butter);
			fridge.signalDoorClosed();

			expect(fridge.getItemCount()).toBe(2);
			expect(fridge.isItemInFridge(milk)).toBe(true);
			expect(fridge.isItemInFridge(butter)).toBe(true);
		});

		it("when 1 item is added the timestamp is recorded", () => {
			const milk = new Item("milk", "21/10/21", "sealed");
			const fridge = new Fridge();
			fridge.setCurrentDate("23/01/2022");
			fridge.signalDoorOpened();
			fridge.scanAddedItem(milk);
			fridge.signalDoorClosed();

			expect(milk.scannedTime).not.toBe(null);
		});

		it("when 1 item is removed from the fridge, the item count is reduced by 1", () => {
			const milk = new Item("milk", "21/10/21", "sealed");
			const butter = new Item("butter", "21/10/21", "sealed");
			const fridge = new Fridge();

			fridge.signalDoorOpened();
			fridge.scanAddedItem(milk);
			fridge.scanAddedItem(butter);
			fridge.removeItemFromFridge(milk);
			fridge.signalDoorClosed();

			expect(fridge.getItemCount()).toBe(1);
		});

		it("when the fridge is empty the count will not go below 0 if you try to remove an item", () => {
			const milk = new Item("milk", "21/10/21", "sealed");
			const fridge = new Fridge();

			fridge.signalDoorOpened();
			fridge.removeItemFromFridge(milk);
			fridge.signalDoorClosed();

			expect(fridge.getItemCount()).toBe(0);
		});

		it("only items in fridge can be removed from fridge", () => {
			const fridge = new Fridge();
			const milk = new Item("milk", "21/10/21", "sealed");
			const butter = new Item("butter", "21/10/21", "sealed");

			fridge.signalDoorOpened();
			fridge.scanAddedItem(milk);
			fridge.removeItemFromFridge(butter);
			fridge.signalDoorClosed();

			expect(fridge.getItemCount()).toBe(1);
		});

		it("displays error message if attempt to remove an item that isn't in the fridge", () => {
			const fridge = new Fridge();
			const milk = new Item("milk", "21/10/21", "sealed");
			const butter = new Item("butter", "21/10/21", "sealed");

			fridge.signalDoorOpened();
			fridge.scanAddedItem(milk);
			fridge.signalDoorClosed();

			const resp = fridge.removeItemFromFridge(butter);

			expect(resp).toBe("item not in fridge");
		});

		it("signal door has been opened", () => {
			const fridge = new Fridge();
			const milk = new Item("milk", "21/10/21", "sealed");
			fridge.signalDoorOpened();
			fridge.scanAddedItem(milk);

			expect(fridge.signalDoorOpened()).toBe(true);
		});

		it("signal door has been closed", () => {
			const fridge = new Fridge();
			const milk = new Item("milk", "21/10/21", "sealed");

			fridge.signalDoorOpened();
			fridge.scanAddedItem(milk);

			expect(fridge.signalDoorClosed()).toBe(false);
		});

		it("when the door is opened the expiry of all sealed items is reduced by 1 hour", () => {
			const fridge = new Fridge();
			const butter = new Item("butter", "15/09/21", "sealed");

			fridge.signalDoorOpened();
			fridge.scanAddedItem(butter);
			fridge.signalDoorClosed();

			fridge.signalDoorOpened();
			fridge.signalDoorClosed();

			expect(butter.expiry).toStrictEqual(new Date(2021, 8, 14, 23, 0, 0));
		});

		it("when the door is opened the expiry of all opened items is reduced by 5 hours", () => {
			const fridge = new Fridge();
			const milk = new Item("milk", "21/09/21", "opened");

			fridge.signalDoorOpened();
			fridge.scanAddedItem(milk);
			fridge.signalDoorClosed();

			fridge.signalDoorOpened();
			fridge.signalDoorClosed();

			expect(milk.expiry).toStrictEqual(new Date(2021, 8, 20, 19, 0, 0));
		});

	it("returns the number of days left till expiry", () => {
		const fridge = new Fridge();
		fridge.setCurrentDate("02/05/22");
		
		let testingTestDate = testDate(5, "02/05/22")
		const yoghurt = new Item("yoghurt", testingTestDate, "sealed");
				
		fridge.signalDoorOpened();
		fridge.scanAddedItem(yoghurt);
		fridge.signalDoorClosed();

		expect(yoghurt.daysLeftToEat).toStrictEqual(5);
	});

	it("provides a formatted display to view the contents and their remaining expiry with the following order", () => {
		const fridge = new Fridge();
		const milk = new Item("milk", testDate(-5, "02/05/22"), "opened");
		const butter = new Item("butter", testDate(-10, "02/05/22"), "sealed");
		const yoghurt = new Item("yoghurt", testDate(6, "02/05/22"), "sealed");
		const cheese = new Item("cheese", testDate(1, "02/05/22"), "sealed");
		const tofu = new Item("tofu", testDate(4, "02/05/22"), "sealed");

		fridge.setCurrentDate("02/05/22");
		fridge.signalDoorOpened();
		fridge.scanAddedItem(milk);
		fridge.scanAddedItem(butter);
		fridge.scanAddedItem(yoghurt);
		fridge.scanAddedItem(cheese);
		fridge.scanAddedItem(tofu);
		fridge.signalDoorClosed();

		expect(fridge.displayItems()).toBe(
			"EXPIRED: milk\r\nEXPIRED: butter\r\ncheese: 1 day remaining\r\ntofu: 4 days remaining\r\nyoghurt: 6 days remaining"
		);
	});

	it("simulates day over by updating the fridge date and recalculating whether expired or not", () => {
		const fridge = new Fridge();
		fridge.setCurrentDate("02/05/22");
		
		const milk = new Item("milk", testDate(5, "02/05/22"), "opened");
		const butter = new Item("butter", testDate(3, "02/05/22"), "sealed");


		fridge.signalDoorOpened();
		fridge.scanAddedItem(milk);
		fridge.scanAddedItem(butter);
		fridge.signalDoorClosed();
		
		fridge.simulateDayOver();

		expect(milk.daysLeftToEat).toStrictEqual(2);
		expect(butter.daysLeftToEat).toStrictEqual(4);
	});

	// it("sets the current date of the fridge to a specific date", () => {
	// 	const fridge = new Fridge();
	// 	fridge.setCurrentDate("20/5/22");

	// 	expect(fridge.currentDate).toStrictEqual(new Date(2022, 4, 20));
	// });

	// it("item expiry is valid based on the setCurrentDate value", () => {});

	// it("item expiry is valid after simulateDayOver", () => {});
});
