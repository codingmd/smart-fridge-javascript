const Item = require("./item.js");
const Fridge = require("./fridge.js");

describe("index", () => {
	it("when 1 item added to fridge then fridge count is 1 ", () => {
		const milk = new Item("milk", "21/10/21", "sealed");
		const fridge = new Fridge();

		fridge.scanAddedItem(milk);

		expect(fridge.getItemCount()).toBe(1);
	});

	it("when 2 items added to fridge then fridge count is 2", () => {
		const milk = new Item("milk", "21/10/21", "sealed");
		const butter = new Item("butter", "21/10/21", "sealed");
		const fridge = new Fridge();

		fridge.scanAddedItem(milk);
		fridge.scanAddedItem(butter);

		expect(fridge.getItemCount()).toBe(2);
	});

	it("when 1 item is added timestamp is recorded", () => {
		const milk = new Item("milk", "21/10/21", "sealed");
		const fridge = new Fridge();

		fridge.scanAddedItem(milk);

		expect(milk.scannedTime).not.toBe(null);
	});

	it("when 1 item is removed from the fridge, the item count is reduced by 1", () => {
		const milk = new Item("milk", "21/10/21", "sealed");
		const butter = new Item("butter", "21/10/21", "sealed");
		const fridge = new Fridge();

		fridge.scanAddedItem(milk);
		fridge.scanAddedItem(butter);
		fridge.removeItemFromFridge(milk);

		expect(fridge.getItemCount()).toBe(1);
	});

	it("when the fridge is empty the count will not go below 0", () => {
		const milk = new Item("milk", "21/10/21", "sealed");
		const fridge = new Fridge();

		fridge.removeItemFromFridge(milk);
		expect(fridge.getItemCount()).toBe(0);
	});

	it("only items in fridge can be removed from fridge", () => {
		const fridge = new Fridge();
		const milk = new Item("milk", "21/10/21", "sealed");
		const butter = new Item("butter", "21/10/21", "sealed");

		fridge.scanAddedItem(milk);
		fridge.removeItemFromFridge(butter);

		expect(fridge.getItemCount()).toBe(1);
	});

	it("verify string confirmation that item cannot be removed if not in fridge", () => {
		const fridge = new Fridge();
		const milk = new Item("milk", "21/10/21", "sealed");
		const butter = new Item("butter", "21/10/21", "sealed");

		fridge.scanAddedItem(milk);
		const resp = fridge.removeItemFromFridge(butter);

		expect(resp).toBe("item not in fridge");
	});

	it("verify item has been added to fridge", () => {
		const milk = new Item("milk", "21/10/21", "sealed");
		const fridge = new Fridge();

		fridge.scanAddedItem(milk);
		expect(fridge.isItemInFridge(milk)).toBe(true);
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

	it("when the door is opened the expiry of all items is reduced by 1 hour or 5 hours depending on condition", () => {
		const fridge = new Fridge();
		const milk = new Item("milk", "21/09/21", "opened");
		const butter = new Item("butter", "15/09/21", "sealed");

		fridge.signalDoorOpened();
		fridge.scanAddedItem(milk);
		fridge.scanAddedItem(butter);
		fridge.signalDoorClosed();

		fridge.signalDoorOpened();
		fridge.signalDoorClosed();

		expect(milk.expiry).toStrictEqual(new Date(2021, 8, 20, 19, 0, 0));
	});

	it("pushes expired items to expiredItemsArray", () => {
		const fridge = new Fridge();
		const milk = new Item("milk", "21/09/21", "opened");
		const butter = new Item("butter", "15/09/21", "sealed");
		const yoghurt = new Item("yoghurt", "24/04/2022", "sealed");
		

		fridge.signalDoorOpened();
		fridge.scanAddedItem(milk);
		fridge.scanAddedItem(butter);
		fridge.scanAddedItem(yoghurt);
		fridge.expiredOrNot();
		console.log(fridge.expiredItemsArray);
		console.log(fridge.formattedDisplayArray);
		console.log(yoghurt.expiry);
		console.log(new Date());
		expect(fridge.expiredItemsArray).toStrictEqual(["milk", "butter"]);
		expect(fridge.formattedDisplayArray).toStrictEqual(["yoghurt"]);
	
	});

	// it("provides a formatted display to view the contents and their remaining expiry with the following order", () => {
	// 	const fridge = new Fridge();
	// 	const milk = new Item("milk", "21/09/21", "opened");
	// 	const butter = new Item("butter", "15/09/21", "sealed");
	// 	const yoghurt = new Item("yoghurt", "21/04/22", "sealed");
	// 	const cheese = new Item("cheese", "06/04/22", "sealed");

	// 	fridge.signalDoorOpened();
	// 	fridge.scanAddedItem(milk);
	// 	fridge.scanAddedItem(butter);
	// 	fridge.scanAddedItem(yoghurt);
	// 	fridge.scanAddedItem(cheese);
	// 	fridge.expiredOrNot();
	// 	console.log(fridge.displayItems());

	// 	expect('Expired: milk, Expired: butter');
	// })

	// it("displays items in fridge", () => {
	// 	const milk = new Item("milk", "21/10/21", "sealed");
	// 	const butter = new Item("butter", "21/10/21", "sealed");
	// 	const fridge = new Fridge();

	// 	fridge.scanAddedItem(milk);
	// 	fridge.scanAddedItem(butter);

	// 	expect(fridge.showDisplay()).toBe([
	// 		{ name: "milk", expiry: "21/10/21", condition: "sealed" },
	// 		{ name: "butter", expiry: "21/10/21", condition: "sealed" },
	// 	]);
	// });
});
