const App = require("../pageobjects/app.page");
const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms * 1));
};

describe("Vue.js app", () => {
  it("should open and render", async () => {
    await App.open();
    await expect(App.heading).toHaveText("Welcome to Your Vue.js App");
    const button = await $("#buttonIncrement");
    console.log(await button.getText());
    // transform into WebdriverIO element

    await sleep(3000);
    await button.click();
    await sleep(3000);
    await button.click();
    await sleep(3000);

    await expect($("button=increment 2")).toExist();
  });
});
