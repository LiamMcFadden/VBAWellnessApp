import firestore from '@react-native-firebase/firestore';
import {currentUser as curUser} from '_api/firebase-auth';
import uuid from 'react-native-uuid';
const COMPETITIONS_COLLECTION = 'Competitions';
const USERS_COLLECTION = 'Users';
const ACTIVITIES_DOC = 'Activities';
const CATEGORIES = [
  'Physical',
  'Emotional',
  'Intellectual',
  'Occupational',
  'Spiritual',
  'Social',
];

let currentUser;
let competition;
let activities;

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
const getActivityById = activityUid => {
  let activity;
  activities.forEach(category => {
    let found = category.activities.find(({uid}) => {
      return uid === activityUid
    });
    if(found) {
      activity = found;
    }
  });
  return activity;
};
const getActivitiesByCategory = category => {
  return activities[CATEGORIES.indexOf(category)].activities; 
};

const getCurrentUserActivityStats = activityUid => {
  return currentUser['activityStats'][activityUid];
};

const getActivitiesAndCurrentUserStats = () => {
  let catList = [];
  activities.forEach(cat=> {
    catList.push({
      category: cat.category,
      activities: cat.activities.map(activity => {
        let stats = getCurrentUserActivityStats(activity.uid);
        return {
          title: activity.title,
          description: activity.description,
          points: activity.points,
          uid: activity.uid,
          dailyLimit: activity.dailyLimit,
          timesToday: stats.timesToday,
          timesTotal: stats.timesTotal,
          lastCompleted: stats.lastCompleted,
        }
      })
    });
  });
  return catList;
}

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
  await firestore().collection(USERS_COLLECTION).get();
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

const completeActivityForCurrentUser = activityUid => {
  let activity = getActivityById(activityUid);
  let stats = getCurrentUserActivityStats(activityUid);

  if(stats == undefined) {
    stats = {};
    currentUser['activityStats'][activityUid] = stats;
  }

  currentUser.points = currentUser.points + activity.points;
  let userUpdate = {
    points: currentUser.points
  };

  stats.timesToday = stats.timesToday ? stats.timesToday + 1 : 1;
  stats.timesTotal = stats.timesTotal ? stats.timesTotal + 1 : 1;
  stats.lastCompleted = new Date();

  userUpdate[`activityStats.${activityUid}`] = stats;

  return firestore()
    .collection(USERS_COLLECTION)
    .doc(curUser().uid)
    .update(userUpdate);
}

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

/*
 * Returns a promise from the firestore api
 * fields  json object with the keys and new values for all fields to update in the same format as the database
 */
const updateActivity = updated => {
  if (!updated.uid) return null;

  activities.forEach(category => {
    activities[CATEGORIES.indexOf(category.category)].activities =
      category.activities.filter(act => act.uid != updated.uid);
  });
  const categoryIndex = CATEGORIES.indexOf(updated.category);
  delete updated.category;
  activities[categoryIndex].activities.push(updated);

  return firestore()
    .collection(COMPETITIONS_COLLECTION)
    .doc(ACTIVITIES_DOC)
    .set({categories: activities});
};

const addActivity = newActivity => {
  newActivity.uid = uuid.v4();
  const categoryIndex = CATEGORIES.indexOf(newActivity.category);
  delete newActivity.category;
  activities[categoryIndex].activities.push(newActivity);

  return firestore()
    .collection(COMPETITIONS_COLLECTION)
    .doc(ACTIVITIES_DOC)
    .set({
      categories: activities,
    });
};

const deleteActivity = uid => {
  activities.forEach(category => {
    activities[CATEGORIES.indexOf(category.category)].activities =
      category.activities.filter(act => act.uid != uid);
  });
  return firestore()
    .collection(COMPETITIONS_COLLECTION)
    .doc(ACTIVITIES_DOC)
    .set({
      categories: activities,
    });
};

export {
  getCurrentUser,
  getCurrentCompetition,
  getUserById,
  getCompetitionById,
  getAllUsers,
  getCurrentUserActivityStats,
  getActivitiesAndCurrentUserStats,
  completeActivityForCurrentUser,
  updateCurrentUserFields,
  generateUserDoc,
};
export {
  getActivities,
  getActivityById,
  getActivitiesByCategory,
  updateActivity,
  addActivity,
  deleteActivity,
};
export {fetch, clear};
