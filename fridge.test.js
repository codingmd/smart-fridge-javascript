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

	it("when the door is opened the expiry of all items is reduced by 1 day", () => {
		const fridge = new Fridge();
		const milk = new Item("milk", "21/10/21", "sealed");

		fridge.signalDoorOpened();
		fridge.scanAddedItem(milk);
		fridge.signalDoorClosed();

		fridge.signalDoorOpened();
		fridge.signalDoorClosed();

		expect(milk.expiry).toBe("20/10/21");
	});

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
