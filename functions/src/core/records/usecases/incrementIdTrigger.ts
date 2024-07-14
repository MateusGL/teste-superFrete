import * as admin from "firebase-admin";

const db = admin.firestore();

export const incrementIdTrigger = async (
  // eslint-disable-next-line no-undef
  snap: FirebaseFirestore.DocumentSnapshot
) => {
  const newRecord = snap.data();

  if (!newRecord) {
    console.error("No data found in snapshot");
    return;
  }

  const incrementIdRef = db.collection("metadata").doc("incrementId");
  const incrementIdDoc = await incrementIdRef.get();

  let incrementId = 1;

  if (incrementIdDoc.exists) {
    const data = incrementIdDoc.data();
    incrementId = data ? data.value + 1 : 1;
  }

  await snap.ref.update({increment_id: incrementId});
  await incrementIdRef.set({value: incrementId}, {merge: true});
};
