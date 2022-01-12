const { addNumbers, multiNumbers, scanAddedItem } = require("./index");
const Fridge = require("./fridge.js");
const Item = require("./item.js");

describe("index", () => {
	it("add numbers", () => {
		expect(addNumbers(2, 2)).toBe(4);
	});
});

describe("index", () => {
	it("when 1 item added to fridge then fridge count is 1 ", () => {
		const milk = new Item("milk", "21/10/21", "sealed");
		Fridge.scanAddedItem(milk);
		expect(Fridge.getItemCount()).toBe(1);
	});
});
