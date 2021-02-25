const hobbits = require("./hobbits-model.js")
const db = require("../../data/dbConfig.js")

const frodo = {name:"Frodo"}
const sam = {name:"Sam"}


it("correct env", ()=>{
    expect(process.env.DB_ENV).toBe("testing")
})

beforeAll(async ()=>{
    await db.migrate.rollback()
    await db.migrate.latest()
})

beforeEach(async ()=>{
    await db("hobbits").truncate()
})

afterAll(async ()=>{
    await db.destroy()
})

describe("Hobbits model", ()=>{
    describe("insert function",()=>{
        it("adds hobbit to db", async ()=>{
            let all
            await hobbits.insert(frodo)
            all = await db("hobbits")
            expect(all).toHaveLength(1)

            await hobbits.insert(sam)
            all = await db("hobbits")
            expect(all).toHaveLength(2)
        })
    })
})