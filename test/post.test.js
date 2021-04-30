let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
let should = chai.should();
let request = require("supertest");
let session_post = request.agent(server);

chai.use(chaiHttp);

describe("Posts", () => {
  describe("/GET posts", () => {
    it("it should get all posts", (done) => {
      session_post
        .get("/get/images")
        .set("content-type", "application/x-www-form-urlencoded")
        .expect("Content-Type", /json/)
        .expect(200)
        .end(function (err, res) {
          res.body.should.be.a("array");
          done();
        });
    });
  });
});
