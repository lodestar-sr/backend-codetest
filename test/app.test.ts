import * as request from "supertest";
import * as app from "../src/app";
import * as examples from "./test-cases.json";

const agent = request(app);

describe('POST /radar', () => {
  examples.forEach((example, i) => {
    it(`Test case #${i + 1}`, async () => {
      await agent
        .post('/radar')
        .send(example.request)
        .expect(200)
        .then((res) => {
          expect(res.body).toEqual(example.response);
        });
    });
  });
});
