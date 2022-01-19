const Item = require("./item.js");
const Fridge = require("./fridge.js");

describe("index", () => {
  it("when 1 item added to fridge then fridge count is 1 ", () => {
    const milk = new Item("milk", "21/10/21", "sealed");
    const fridge = new Fridge();
    fridge.scanAddedItem(milk);
    expect(fridge.getItemCount()).toBe(1);
  });
  it("when 1 item is added timestamp is recorded", () => {
    const milk = new Item("milk", "21/10/21", "sealed");
    const fridge = new Fridge();
    fridge.setCurrentDate("18/10/2021");
    fridge.scanAddedItem(milk);
    expect(fridge.setCurrentDate()).toBe("18/10/2021");
  });
});
