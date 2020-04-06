const dummy = require("../utils/list_helper").dummy

describe("list_helper", () => {
    test("Dummy returns 1", () => {
        expect(dummy([])).toBe(1)
    })
})