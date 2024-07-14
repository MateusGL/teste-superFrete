import {Request, Response} from "express";
import * as functions from "firebase-functions";
import {
  CreateRecordUseCase} from "../usecases/createRecordUseCase";
import {CreateRecordSchema} from "../dtos/createRecordDTO";

const createRecordUseCase = new CreateRecordUseCase();

export const createRecordHandler = functions.https.onRequest( async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const resultValidation = CreateRecordSchema.safeParse(req.body);

    if (!resultValidation.success) {
      res.status(400).send({error: resultValidation.error});
    }

    await createRecordUseCase.execute(req.body);

    res
      .status(201)
      .send({message: "Record created successfully"});
  } catch (error: any) {
    console.error("Error creating record:", error);
    res.status(500).send({message: "Internal Server Error"});
  }
});
