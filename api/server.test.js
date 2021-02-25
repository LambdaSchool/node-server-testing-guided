const request = require("supertest")
const db = require("../data/dbConfig.js")
const server = require("./server.js")

const frodo = {name:"Frodo"}
const sam = {name:"Sam"}

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

describe("server", ()=>{
    describe("[GET] /hobbits", ()=>{
        it("resopnds with 200 status", async ()=>{
            const res = await request(server).get("/hobbits")
            expect(res.status).toBe(200)
        })
        it("returns correct num of hobbits", async ()=>{
            let res
            await db("hobbits").insert(frodo)
            res = await request(server).get("/hobbits")
            expect(res.body).toHaveLength(1)
            //expect(res.body).toEqual({})

            await db("hobbits").insert(sam)
            res = await request(server).get("/hobbits")
            expect(res.body).toHaveLength(2)
        })
        it("returns correct hobbit format", async ()=>{
            await db("hobbits").insert(frodo)
            await db("hobbits").insert(sam)
            const res = await request(server).get("/hobbits")
            expect(res.body[0]).toMatchObject({id:1,...frodo})
            expect(res.body[1]).toMatchObject({id:2,...sam})
        })
    })
    describe("[POST] /hobbits", ()=>{
        it("responds with  newly created hobbit", async ()=>{
            let res
            res = await request(server).post("/hobbits").send(frodo)
            expect(res.body).toMatchObject({id:1,...frodo})

            res = await request(server).post("/hobbits").send(sam)
            expect(res.body).toMatchObject({id:2,...sam})
        })
    })
})