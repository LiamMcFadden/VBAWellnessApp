import {
  EventContext,
  firestore,
  pubsub,
  https,
  logger,
} from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

export const testing = https.onRequest(async (_req, res) => {
  logger.info("Firestore", {structuredData: true});
  admin.firestore().collection("test").add({
    hello: "world",
  });
  res.send({hit: "firestore"});
});


/*
 * Scheduled task that checks if tournament is over
 * */
const createTournamentCountdown =
  pubsub
      .schedule("0 0 * * *")
      .timeZone("America/New_York")
      .onRun(async (_context: EventContext) => {
        logger.info({"PUBSUB": "Scheduled Task"});

        // IF TASK DOES NOT EXIST RETURN

        // IF TASK DOES EXIST
        // CHECK IF END DATE >= TODAYS DATE

        // IF END DATE >= TODAYS DATE
        //  COMPLETE END TOURNAMENT LOGIC
        //  DELETE TASK
      });

export const tournamentCreated = firestore
    .document("tournaments/{tournamentID}")
    .onCreate((snap, _context) => {
      logger.info(snap.data(), {structuredData: true});
      createTournamentCountdown("Hello", _context);
    });
