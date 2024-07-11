/* eslint-disable no-undef */
// @ts-nocheck
import * as admin from "firebase-admin";
import {incrementIdTrigger} from "./incrementIdTrigger";

// Mock Firebase admin
jest.mock("firebase-admin", () => {
  const firestoreMock = {
    collection: jest.fn().mockReturnThis(),
    doc: jest.fn().mockReturnThis(),
    get: jest.fn(),
    set: jest.fn(),
    update: jest.fn(),
  };
  return {
    firestore: jest.fn(() => firestoreMock),
  };
});

const firestoreMock = admin.firestore();

describe("incrementIdTrigger", () => {
  let snap;

  beforeEach(() => {
    snap = {
      data: jest.fn(),
      ref: {
        update: jest.fn(),
      },
    };
  });

  it("should log an error if no data is found in the snapshot", async () => {
    snap.data.mockReturnValue(null);

    console.error = jest.fn();

    await incrementIdTrigger(snap);

    expect(console.error).toHaveBeenCalledWith("No data found in snapshot");
  });

  // eslint-disable-next-line max-len
  it("should set increment_id to 1 if incrementId document does not exist", async () => {
    snap.data.mockReturnValue({someField: "someValue"});

    firestoreMock.doc.mockReturnThis();
    firestoreMock.get.mockResolvedValue({
      exists: false,
    });

    await incrementIdTrigger(snap);

    expect(snap.ref.update).toHaveBeenCalledWith({increment_id: 1});
    expect(firestoreMock.set).toHaveBeenCalledWith(
      {value: 1},
      {merge: true}
    );
  });

  it("should increment the value if incrementId document exists", async () => {
    snap.data.mockReturnValue({someField: "someValue"});

    firestoreMock.doc.mockReturnThis();
    firestoreMock.get.mockResolvedValue({
      exists: true,
      data: () => ({value: 5}),
    });

    await incrementIdTrigger(snap);

    expect(snap.ref.update).toHaveBeenCalledWith({increment_id: 6});
    expect(firestoreMock.set).toHaveBeenCalledWith(
      {value: 6},
      {merge: true}
    );
  });
});
