/* eslint-disable require-jsdoc */
import {Record} from "../models/record";
import {CreateRecordDTO} from "../dtos/createRecordDTO";
import * as admin from "firebase-admin";

export const db = admin.firestore();

export class CreateRecordUseCase {
  async execute(data: CreateRecordDTO): Promise<Record> {
    const newRecordRef = db.collection("records").doc();
    await newRecordRef.set({name: data.name});

    return new Record(data.name);
  }
}
