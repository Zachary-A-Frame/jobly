const { sqlForPartialUpdate } = require('./sql')

describe("sqlForPartialUpdate", function () {
    test("works: 1 item", function () {
        const result = sqlForPartialUpdate(
            { val: "oldval" },
            { val: "val", val2: "val2" });
        expect(result).toEqual({
            setCols: "\"val\"=$1",
            values: ["oldval"],
        });
        // console.log("Debugger")
    });
});
