/* eslint-disable no-undef */
// @ts-nocheck
import * as admin from "firebase-admin";
import {createRecord} from "./createRecord";
import {Request, Response} from "express";

jest.mock("firebase-admin", () => {
  const firestoreMock = {
    collection: jest.fn().mockReturnThis(),
    doc: jest.fn().mockReturnValue({
      id: "new_record_id",
      set: jest.fn(),
    }),
    set: jest.fn(),
  };
  return {
    initializeApp: jest.fn(),
    firestore: jest.fn(() => firestoreMock),
  };
});

const firestoreMock = admin.firestore();

describe("createRecord", () => {
  let req;
  let res;

  beforeEach(() => {
    req = {
      body: {},
    };

    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    firestoreMock.collection.mockClear();
    firestoreMock.doc.mockClear();
    firestoreMock.set.mockClear();
  });

  it("should return 400 if name is not provided", async () => {
    req.body = {};

    await createRecord(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
      message: "Name is required and must be a non-empty string",
    });
  });

  // eslint-disable-next-line max-len
  it("should create a new record and return 201 with the record id", async () => {
    req.body = {name: "Test Name"};
    firestoreMock.doc.mockReturnValue({
      id: "new_record_id",
      set: jest.fn(),
    });

    await createRecord(req as Request, res as Response);

    expect(firestoreMock.collection).toHaveBeenCalledWith("records");
    expect(firestoreMock.doc).toHaveBeenCalled();
    expect(firestoreMock.doc().set).toHaveBeenCalledWith({name: "Test Name"});
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalledWith({
      message: "Record created successfully",
      id: "new_record_id",
    });
  });

  it("should return 500 if there is an internal server error", async () => {
    req.body = {name: "Test Name"};
    const error = new Error("Internal Server Error");
    firestoreMock.doc.mockReturnValue({
      set: jest.fn().mockRejectedValueOnce(error),
    });

    console.error = jest.fn();

    await createRecord(req as Request, res as Response);

    expect(console.error).toHaveBeenCalledWith("Error creating record:", error);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({message: "Internal Server Error"});
  });
});
