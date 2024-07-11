/* eslint-disable require-jsdoc */
import * as functions from "firebase-functions";

export class ConfigManager {
  private static instance: ConfigManager;
  private config: { [key: string]: any };

  private constructor() {
    this.config = {
      firestoreCollection: process.env.FIRESTORE_COLLECTION ||
       functions.config().app?.firestore_collection || "records",
    };
  }

  public static getInstance(): ConfigManager {
    if (!ConfigManager.instance) {
      ConfigManager.instance = new ConfigManager();
    }
    return ConfigManager.instance;
  }

  public get(key: string): any {
    return this.config[key];
  }

  public set(key: string, value: any): void {
    this.config[key] = value;
  }
}
