const hobbits = require("./hobbits-model.js")
const db = require("../../data/dbConfig.js")

it("correct env", ()=>{
    expect(process.env.DB_ENV).toBe("testing")
})