const { addNumbers, multiNumbers, scanAddedItem } = require("./index");

describe("index", () => {
	it("add numbers", () => {
		expect(addNumbers(2, 2)).toBe(4);
	});
});
