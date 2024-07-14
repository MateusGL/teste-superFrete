import * as functions from "firebase-functions";
import {ConfigManager} from "../../../config/configManager";
import {incrementIdTrigger} from "../usecases/incrementIdTrigger";

const configManager = ConfigManager.getInstance();

export const incrementIDfirestoreTriggers = {
  onRecordCreate: functions.firestore
    .document(`${configManager.get("firestoreCollection")}/{docId}`)
    .onCreate(incrementIdTrigger),
};
