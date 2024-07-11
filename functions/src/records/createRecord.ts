import * as functions from "firebase-functions";
import {Request, Response} from "express";
import * as admin from "firebase-admin";

admin.initializeApp();

export const db = admin.firestore();

interface CreateRecordRequest extends Request {
  body: {
    name?: string;
  };
}

export const createRecord = functions.https.onRequest( async (
  req: CreateRecordRequest,
  res: Response
): Promise<void> => {
  try {
    const {name} = req.body;

    if (!name || typeof name !== "string" || name.trim().length === 0) {
      res.status(400)
        .send({message: "Name is required and must be a non-empty string"});
      return;
    }

    const newRecordRef = db.collection("records").doc();
    await newRecordRef.set({name});

    res
      .status(201)
      .send({message: "Record created successfully", id: newRecordRef.id});
  } catch (error) {
    console.error("Error creating record:", error);
    res.status(500).send({message: "Internal Server Error"});
  }
});
