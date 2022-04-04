import firestore from '@react-native-firebase/firestore';
import {currentUser as curUser} from '_api/firebase-auth';
const COMPETITIONS_COLLECTION = 'Competitions';
const USERS_COLLECTION = 'Users';
const ACTIVITIES_DOC = 'Activities';

//Filled in with test data for now until we have suitable database entries for every type of document
let dummyUser = {
  _id: 'testuser',
  email: 'user@test.com',
  firstName: 'Test',
  lastName: 'User',
  competition: 'T3ST1',
  points: 310,
  private: false,
  activityStats: [
    {
      title: 'Stairmaster',
      lastCompleted: new Date().toISOString(),
      timesCompleted: 2,
    },
  ],
};

let dummyCompetition = {
  competitionId: 'T3ST1',
  startTime: new Date().toISOString(),
  endTime: new Date(2023, 4, 4).toISOString(),
  name: 'Test Challenge',
};

let dummyActivity = [
  {
    category: 'physical',
    activities: [
      {
        title: 'Stairmaster',
        description: 'Take the stairs at work',
        points: 10,
        available: true,
      },
    ],
  },
  {
    category: 'emotional',
    activities: [
      {
        title: 'E',
        description: 'Take the stairs at work',
        points: 10,
        available: true,
      },
    ],
  },
  {
    category: 'intellectual',
    activities: [
      {
        title: 'I',
        description: 'Take the stairs at work',
        points: 10,
        available: true,
      },
    ],
  },
  {
    category: 'occupational',
    activities: [
      {
        title: 'O',
        description: 'Take the stairs at work',
        points: 10,
        available: true,
      },
    ],
  },
  {
    category: 'spiritual',
    activities: [
      {
        title: 'Sp',
        description: 'Take the stairs at work',
        points: 10,
        available: true,
      },
    ],
  },
  {
    category: 'social',
    activities: [
      {
        title: 'So',
        description: 'Take the stairs at work',
        points: 10,
        available: true,
      },
    ],
  },
];

let currentUser = dummyUser;
let competition = dummyCompetition;
let activities = dummyActivity;

const fetch = async userId => {
  let userAndCompetitionPromise = firestore()
    .collection(USERS_COLLECTION)
    .doc(userId)
    .get()
    .then(res => {
      currentUser = res.data();

      if (
        currentUser.competition != null &&
        currentUser.competition.length > 0
      ) {
        firestore()
          .collection(COMPETITIONS_COLLECTION)
          .doc(currentUser.competition)
          .get()
          .then(res => {
            competition = res.data();
          });
      }
    });

  let activitiesPromise = firestore()
    .collection(COMPETITIONS_COLLECTION)
    .doc(ACTIVITIES_DOC)
    .get()
    .then(res => {
      activities = res.data().categories;
    });
  await Promise.all([userAndCompetitionPromise, activitiesPromise]);
};
const clear = () => {
  currentUser = null;
  competition = null;
  activities = null;
};
const getCurrentUser = () => {
  return currentUser;
};
const getCurrentCompetition = () => {
  return competition;
};
const getActivities = () => {
  return activities;
};
// const getUserActivityData = async userId => {
//   let user = userId === currentUser._id ? currentUser : getUserById(userId);
// };
const getUserById = async userId => {
  await firestore().collection(USERS_COLLECTION).doc(userId).get();
};
const getCompetitionById = async competitionId => {
  await firestore()
    .collection(COMPETITIONS_COLLECTION)
    .doc(competitionId)
    .get();
};
const getAllUsers = async () => {
  await firestore().collection(USERS_COLLECTION).doc(userId).get();
};
/*
 * Returns a promise from the firestore api
 * fields  json object with the keys and new values for all fields to update in the same format as the database
 */
const updateCurrentUserFields = fields => {
  for (const [key, value] of Object.entries(fields)) currentUser[key] = value;
  return firestore()
    .collection(USERS_COLLECTION)
    .doc(curUser().uid)
    .update(fields);
};
/*
 * Returns a promise from the firestore api
 * fields  json object with the keys and new values for all fields to update in the same format as the database
 */
const updateActivities = fields => {
  for (const [key, value] of Object.entries(fields)) activities[key] = value;
  return firestore()
    .collection(USERS_COLLECTION)
    .doc(ACTIVITIES_DOC)
    .update({categories: fields});
};

const generateUserDoc = (uid, email, firstName, lastName, competitionId) => {
  const userObj = {
    email: email,
    firstName: firstName,
    lastName: lastName,
    competition: competitionId,
    private: false,
    activityStats: {},
  };
  return firestore().collection(USERS_COLLECTION).doc(uid).set(userObj);
};
export {
  getCurrentUser,
  getCurrentCompetition,
  getActivities,
  getUserById,
  getCompetitionById,
  getAllUsers,
  updateCurrentUserFields,
  updateActivities,
  generateUserDoc,
};
export {fetch, clear};
