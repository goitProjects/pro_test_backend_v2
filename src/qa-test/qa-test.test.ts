import mongoose from "mongoose";
import supertest, { Response } from "supertest";
import { Application } from "express";
import Server from "../server/server";
import UserModel from "../REST-entities/user/user.model";
import SessionModel from "../REST-entities/session/session.model";

describe("QA-test router test suite", () => {
  let app: Application;
  let accessToken: string;
  let uid: string;

  beforeAll(async () => {
    app = new Server().startForTesting();
    const url = `mongodb://127.0.0.1/qa-test`;
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    uid = (
      await supertest(app).post("/auth/register").send({
        email: "test@email.com",
        password: "qwerty123",
      })
    ).body.id;
    accessToken = (
      await supertest(app).post("/auth/login").send({
        email: "test@email.com",
        password: "qwerty123",
      })
    ).body.accessToken;
  });

  afterAll(async () => {
    await UserModel.deleteOne({ email: "test@email.com" });
    await SessionModel.deleteOne({ uid });
    await mongoose.connection.close();
  });

  describe("GET /qa-test/tech", () => {
    let response: Response;

    it("Init endpoint testing", () => {
      expect(true).toBe(true);
    });

    context("Valid request", () => {
      beforeAll(async () => {
        response = await supertest(app)
          .get("/qa-test/tech")
          .set("Authorization", `Bearer ${accessToken}`);
      });

      it("Should return a 200 status code", () => {
        expect(response.status).toBe(200);
      });

      it("Should return an expected result", () => {
        expect(response.body.length).toBe(12);
      });
    });

    context("Without providing 'accessToken'", () => {
      beforeAll(async () => {
        response = await supertest(app).get("/qa-test/tech");
      });

      it("Should return a 400 status code", () => {
        expect(response.status).toBe(400);
      });

      it("Should say that token wasn't provided", () => {
        expect(response.body.message).toBe("No token provided");
      });
    });

    context("With invalid 'accessToken'", () => {
      beforeAll(async () => {
        response = await supertest(app)
          .get("/qa-test/tech")
          .set("Authorization", `Bearer qwerty123`);
      });

      it("Should return a 401 status code", () => {
        expect(response.status).toBe(401);
      });

      it("Should return an unauthorized status", () => {
        expect(response.body.message).toBe("Unauthorized");
      });
    });
  });

  describe("GET /qa-test/theory", () => {
    let response: Response;

    it("Init endpoint testing", () => {
      expect(true).toBe(true);
    });

    context("Valid request", () => {
      beforeAll(async () => {
        response = await supertest(app)
          .get("/qa-test/theory")
          .set("Authorization", `Bearer ${accessToken}`);
      });

      it("Should return a 200 status code", () => {
        expect(response.status).toBe(200);
      });

      it("Should return an expected result", () => {
        expect(response.body.length).toBe(12);
      });
    });

    context("Without providing 'accessToken'", () => {
      beforeAll(async () => {
        response = await supertest(app).get("/qa-test/theory");
      });

      it("Should return a 400 status code", () => {
        expect(response.status).toBe(400);
      });

      it("Should say that token wasn't provided", () => {
        expect(response.body.message).toBe("No token provided");
      });
    });

    context("With invalid 'accessToken'", () => {
      beforeAll(async () => {
        response = await supertest(app)
          .get("/qa-test/theory")
          .set("Authorization", `Bearer qwerty123`);
      });

      it("Should return a 401 status code", () => {
        expect(response.status).toBe(401);
      });

      it("Should return an unauthorized status", () => {
        expect(response.body.message).toBe("Unauthorized");
      });
    });
  });

  describe("POST /qa-test/tech-results", () => {
    let response: Response;

    const validReqBody = {
      answers: [
        {
          questionId: 25,
          answer: "Interface testing",
        },
        {
          questionId: 22,
          answer: "Currency testing",
        },
        {
          questionId: 19,
          answer: "All options are correct",
        },
        {
          questionId: 17,
          answer: "Software testing life cycle",
        },
        {
          questionId: 21,
          answer: "Test case",
        },
        {
          questionId: 14,
          answer:
            "Verification of software, according to the test plan, test procedures and relevant documentation, taking into account the wishes of the client",
        },
        {
          questionId: 13,
          answer:
            "This is testing by executing a code or program with different input values and confirming the results",
        },
        {
          questionId: 10,
          answer: "All options are correct",
        },
        {
          questionId: 6,
          answer: "eXtreme Programming",
        },
        {
          questionId: 5,
          answer: "Kanban",
        },
        {
          questionId: 3,
          answer: "All options are correct",
        },
        {
          questionId: 2,
          answer: "All options are incorrect",
        },
      ],
    };

    const invalidReqBody = {
      answers: [
        {
          questionId: 25,
          answer: "Interface testing",
        },
        {
          questionId: 22,
          answer: "Currency testing",
        },
        {
          questionId: 19,
          answer: "All options are correct",
        },
        {
          questionId: 17,
          answer: "Software testing life cycle",
        },
        {
          questionId: 21,
          answer: "Test case",
        },
        {
          questionId: 14,
          answer:
            "Verification of software, according to the test plan, test procedures and relevant documentation, taking into account the wishes of the client",
        },
        {
          questionId: 13,
          answer:
            "This is testing by executing a code or program with different input values and confirming the results",
        },
        {
          questionId: 10,
          answer: "All options are correct",
        },
        {
          questionId: 6,
          answer: "eXtreme Programming",
        },
        {
          questionId: 5,
          answer: "Kanban",
        },
        {
          questionId: 3,
          answer: "All options are correct",
        },
        {
          questionId: 27,
          answer: "All options are incorrect",
        },
      ],
    };

    const secondInvalidReqBody = {
      answers: [
        {
          questionId: 25,
          answer: "Interface testing",
        },
        {
          questionId: 22,
          answer: "Currency testing",
        },
        {
          questionId: 19,
          answer: "All options are correct",
        },
        {
          questionId: 17,
          answer: "Software testing life cycle",
        },
        {
          questionId: 21,
          answer: "Test case",
        },
        {
          questionId: 14,
          answer:
            "Verification of software, according to the test plan, test procedures and relevant documentation, taking into account the wishes of the client",
        },
        {
          questionId: 13,
          answer:
            "This is testing by executing a code or program with different input values and confirming the results",
        },
        {
          questionId: 10,
          answer: "All options are correct",
        },
        {
          questionId: 6,
          answer: "eXtreme Programming",
        },
        {
          questionId: 5,
          answer: "Kanban",
        },
        {
          questionId: 3,
          answer: "All options are correct",
        },
      ],
    };

    const thirdInvalidReqBody = {
      answers: [
        {
          questionId: 25,
          answer: "Interface testing",
        },
        {
          questionId: 22,
          answer: "Currency testing",
        },
        {
          questionId: 19,
          answer: "All options are correct",
        },
        {
          questionId: 17,
          answer: "Software testing life cycle",
        },
        {
          questionId: 21,
          answer: "Test case",
        },
        {
          questionId: 14,
          answer:
            "Verification of software, according to the test plan, test procedures and relevant documentation, taking into account the wishes of the client",
        },
        {
          questionId: 13,
          answer:
            "This is testing by executing a code or program with different input values and confirming the results",
        },
        {
          questionId: 10,
          answer: "All options are correct",
        },
        {
          questionId: 6,
          answer: "eXtreme Programming",
        },
        {
          questionId: 5,
          answer: "Kanban",
        },
        {
          questionId: 2,
          answer: "All options are correct",
        },
        {
          questionId: 2,
          answer: "All options are incorrect",
        },
      ],
    };

    it("Init endpoint testing", () => {
      expect(true).toBe(true);
    });

    context("With validReqBody", () => {
      beforeAll(async () => {
        response = await supertest(app)
          .post("/qa-test/tech-results")
          .set("Authorization", `Bearer ${accessToken}`)
          .send(validReqBody);
      });

      it("Should return a 200 status code", () => {
        expect(response.status).toBe(200);
      });

      it("Should return an expected result", () => {
        expect(response.body).toEqual({ result: "92%" });
      });
    });

    context("With invalidReqBody (invalid 'questionId')", () => {
      beforeAll(async () => {
        response = await supertest(app)
          .post("/qa-test/tech-results")
          .set("Authorization", `Bearer ${accessToken}`)
          .send(invalidReqBody);
      });

      it("Should return a 400 status code", () => {
        expect(response.status).toBe(400);
      });

      it("Should return an expected result", () => {
        expect(response.body.message).toBe(
          '"answers[11].questionId" must be less than or equal to 26'
        );
      });
    });

    context("With secondInvalidReqBody (invalid questions quantity)", () => {
      beforeAll(async () => {
        response = await supertest(app)
          .post("/qa-test/tech-results")
          .set("Authorization", `Bearer ${accessToken}`)
          .send(secondInvalidReqBody);
      });

      it("Should return a 400 status code", () => {
        expect(response.status).toBe(400);
      });

      it("Should return an expected result", () => {
        expect(response.body.message).toBe(
          '"answers" must contain at least 12 items'
        );
      });
    });

    context("With thirdInvalidReqBody (two same questions)", () => {
      beforeAll(async () => {
        response = await supertest(app)
          .post("/qa-test/tech-results")
          .set("Authorization", `Bearer ${accessToken}`)
          .send(thirdInvalidReqBody);
      });

      it("Should return a 400 status code", () => {
        expect(response.status).toBe(400);
      });

      it("Should return an expected result", () => {
        expect(response.body.message).toBe("Questions must be unique");
      });
    });

    context("Without providing 'accessToken'", () => {
      beforeAll(async () => {
        response = await supertest(app)
          .post("/qa-test/tech-results")
          .send(validReqBody);
      });

      it("Should return a 400 status code", () => {
        expect(response.status).toBe(400);
      });

      it("Should say that token wasn't provided", () => {
        expect(response.body.message).toBe("No token provided");
      });
    });

    context("With invalid 'accessToken'", () => {
      beforeAll(async () => {
        response = await supertest(app)
          .post("/qa-test/tech-results")
          .set("Authorization", `Bearer qwerty123`)
          .send(validReqBody);
      });

      it("Should return a 401 status code", () => {
        expect(response.status).toBe(401);
      });

      it("Should return an unauthorized status", () => {
        expect(response.body.message).toBe("Unauthorized");
      });
    });
  });

  describe("POST /qa-test/theory-results", () => {
    let response: Response;

    const validReqBody = {
      answers: [
        {
          questionId: 25,
          answer: "1: 6: 10: 1000",
        },
        {
          questionId: 22,
          answer: "Data stream",
        },
        {
          questionId: 19,
          answer: "Test cases should be reviewed and revised regularly",
        },
        {
          questionId: 17,
          answer: "When we press the submit button",
        },
        {
          questionId: 21,
          answer: "Causes and effects of coverage",
        },
        {
          questionId: 14,
          answer: "Hidden defect",
        },
        {
          questionId: 13,
          answer: "Vulnerability testing",
        },
        {
          questionId: 27,
          answer: "V model",
        },
        {
          questionId: 29,
          answer: "All options are incorrect",
        },
        {
          questionId: 30,
          answer: "Gorilla Testing",
        },
        {
          questionId: 3,
          answer: "All options are correct",
        },
        {
          questionId: 2,
          answer:
            "Requirements Management - Product Analysis - Developing a Test Strategy and Planning Quality Control Procedures - Prototype Testing - Generating Test Documentation - Basic Testing - Stabilization - Operation",
        },
      ],
    };

    const invalidReqBody = {
      answers: [
        {
          questionId: 25,
          answer: "1: 6: 10: 1000",
        },
        {
          questionId: 22,
          answer: "Data stream",
        },
        {
          questionId: 19,
          answer: "Test cases should be reviewed and revised regularly",
        },
        {
          questionId: 17,
          answer: "When we press the submit button",
        },
        {
          questionId: 21,
          answer: "Causes and effects of coverage",
        },
        {
          questionId: 14,
          answer: "Hidden defect",
        },
        {
          questionId: 13,
          answer: "Vulnerability testing",
        },
        {
          questionId: 27,
          answer: "V model",
        },
        {
          questionId: 29,
          answer: "All options are incorrect",
        },
        {
          questionId: 30,
          answer: "Gorilla Testing",
        },
        {
          questionId: 3,
          answer: "All options are correct",
        },
        {
          questionId: 32,
          answer:
            "Requirements Management - Product Analysis - Developing a Test Strategy and Planning Quality Control Procedures - Prototype Testing - Generating Test Documentation - Basic Testing - Stabilization - Operation",
        },
      ],
    };

    const secondInvalidReqBody = {
      answers: [
        {
          questionId: 25,
          answer: "1: 6: 10: 1000",
        },
        {
          questionId: 22,
          answer: "Data stream",
        },
        {
          questionId: 19,
          answer: "Test cases should be reviewed and revised regularly",
        },
        {
          questionId: 17,
          answer: "When we press the submit button",
        },
        {
          questionId: 21,
          answer: "Causes and effects of coverage",
        },
        {
          questionId: 14,
          answer: "Hidden defect",
        },
        {
          questionId: 13,
          answer: "Vulnerability testing",
        },
        {
          questionId: 27,
          answer: "V model",
        },
        {
          questionId: 29,
          answer: "All options are incorrect",
        },
        {
          questionId: 30,
          answer: "Gorilla Testing",
        },
        {
          questionId: 3,
          answer: "All options are correct",
        },
      ],
    };

    const thirdInvalidReqBody = {
      answers: [
        {
          questionId: 25,
          answer: "1: 6: 10: 1000",
        },
        {
          questionId: 22,
          answer: "Data stream",
        },
        {
          questionId: 19,
          answer: "Test cases should be reviewed and revised regularly",
        },
        {
          questionId: 17,
          answer: "When we press the submit button",
        },
        {
          questionId: 21,
          answer: "Causes and effects of coverage",
        },
        {
          questionId: 14,
          answer: "Hidden defect",
        },
        {
          questionId: 13,
          answer: "Vulnerability testing",
        },
        {
          questionId: 27,
          answer: "V model",
        },
        {
          questionId: 29,
          answer: "All options are incorrect",
        },
        {
          questionId: 30,
          answer: "Gorilla Testing",
        },
        {
          questionId: 2,
          answer:
            "Requirements Management - Product Analysis - Developing a Test Strategy and Planning Quality Control Procedures - Prototype Testing - Generating Test Documentation - Basic Testing - Stabilization - Operation",
        },
        {
          questionId: 2,
          answer:
            "Requirements Management - Product Analysis - Developing a Test Strategy and Planning Quality Control Procedures - Prototype Testing - Generating Test Documentation - Basic Testing - Stabilization - Operation",
        },
      ],
    };

    it("Init endpoint testing", () => {
      expect(true).toBe(true);
    });

    context("With validReqBody", () => {
      beforeAll(async () => {
        response = await supertest(app)
          .post("/qa-test/theory-results")
          .set("Authorization", `Bearer ${accessToken}`)
          .send(validReqBody);
      });

      it("Should return a 200 status code", () => {
        expect(response.status).toBe(200);
      });

      it("Should return an expected result", () => {
        expect(response.body).toEqual({ result: "92%" });
      });
    });

    context("With invalidReqBody (invalid 'questionId')", () => {
      beforeAll(async () => {
        response = await supertest(app)
          .post("/qa-test/theory-results")
          .set("Authorization", `Bearer ${accessToken}`)
          .send(invalidReqBody);
      });

      it("Should return a 400 status code", () => {
        expect(response.status).toBe(400);
      });

      it("Should return an expected result", () => {
        expect(response.body.message).toBe(
          '"answers[11].questionId" must be less than or equal to 31'
        );
      });
    });

    context("With secondInvalidReqBody (invalid questions quantity)", () => {
      beforeAll(async () => {
        response = await supertest(app)
          .post("/qa-test/theory-results")
          .set("Authorization", `Bearer ${accessToken}`)
          .send(secondInvalidReqBody);
      });

      it("Should return a 400 status code", () => {
        expect(response.status).toBe(400);
      });

      it("Should return an expected result", () => {
        expect(response.body.message).toBe(
          '"answers" must contain at least 12 items'
        );
      });
    });

    context("With thirdInvalidReqBody (two same questions)", () => {
      beforeAll(async () => {
        response = await supertest(app)
          .post("/qa-test/theory-results")
          .set("Authorization", `Bearer ${accessToken}`)
          .send(thirdInvalidReqBody);
      });

      it("Should return a 400 status code", () => {
        expect(response.status).toBe(400);
      });

      it("Should return an expected result", () => {
        expect(response.body.message).toBe("Questions must be unique");
      });
    });

    context("Without providing 'accessToken'", () => {
      beforeAll(async () => {
        response = await supertest(app)
          .post("/qa-test/theory-results")
          .send(validReqBody);
      });

      it("Should return a 400 status code", () => {
        expect(response.status).toBe(400);
      });

      it("Should say that token wasn't provided", () => {
        expect(response.body.message).toBe("No token provided");
      });
    });

    context("With invalid 'accessToken'", () => {
      beforeAll(async () => {
        response = await supertest(app)
          .post("/qa-test/theory-results")
          .set("Authorization", `Bearer qwerty123`)
          .send(validReqBody);
      });

      it("Should return a 401 status code", () => {
        expect(response.status).toBe(401);
      });

      it("Should return an unauthorized status", () => {
        expect(response.body.message).toBe("Unauthorized");
      });
    });
  });
});
