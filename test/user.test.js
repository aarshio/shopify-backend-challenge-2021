let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
let should = chai.should();
let request = require("supertest");
let session = request.agent(server);

chai.use(chaiHttp);

describe("Users", () => {
  describe("/GET auth", () => {
    it("it should GET failed authorization", (done) => {
      chai
        .request(server)
        .get("/auth")
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
  });

  describe("/POST login", () => {
    it("it should login the user", (done) => {
      session
        .post("/login")
        .set("content-type", "application/x-www-form-urlencoded")
        .send({ username: "username", password: "password" }) // test user
        .expect("Content-Type", /json/)
        .expect(200)
        .end(function (err, res) {
          res.body.username.should.equal("username");
          done();
        });
    });
    it("it should GET successful authorization", (done) => {
      session.get("/auth").end((err, res) => {
        res.should.have.status(200);
        done();
      });
    });
  });

  describe("/POST logout", () => {
    it("it should logout the user", (done) => {
      session
        .get("/logout")
        .expect(200)
        .end(function (err, res) {
          done();
        });
    });
    it("it should GET failed authorization", (done) => {
      session.get("/auth").end((err, res) => {
        res.should.have.status(401);
        done();
      });
    });
  });

  describe("/POST register", () => {
    const stamp = new Date().toISOString();
    it("it should register the user", (done) => {
      session
        .post("/register")
        .set("content-type", "application/x-www-form-urlencoded")
        .send({
          email: stamp + "@TEST.com",
          username: stamp + "TEST",
          password: "password",
        })
        .expect("Content-Type", /json/)
        .expect(200)
        .end(function (err, res) {
          res.body.username.should.equal(stamp + "TEST");
          done();
        });
    });
  });
});
