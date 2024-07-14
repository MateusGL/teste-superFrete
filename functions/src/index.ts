import * as admin from "firebase-admin";
admin.initializeApp();

import {createRecordHandler} from "./core/records/handlers/createRecordHandler";

import {
  incrementIDfirestoreTriggers,
} from "./core/records/handlers/incrementIdTriggerHandler";

export {incrementIDfirestoreTriggers, createRecordHandler};
