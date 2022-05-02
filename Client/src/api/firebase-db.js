import firestore from '@react-native-firebase/firestore'
import uuid from 'react-native-uuid'
import { currentUser as curUser } from '_api/firebase-auth'
const COMPETITIONS_COLLECTION = 'Competitions'
const USERS_COLLECTION = 'Users'
const ACTIVITIES_DOC = 'Activities'
const CATEGORIES = [
  'Physical',
  'Emotional',
  'Intellectual',
  'Occupational',
  'Spiritual',
  'Social',
]

let currentUser
let competition
let activities
//Security Rules: https://www.sentinelstand.com/article/firestore-security-rules-examples
const fetch = async userId => {
  if (currentUser && competition && activities) {
    return
  }
  let userAndCompetitionPromise = firestore()
    .collection(USERS_COLLECTION)
    .doc(userId)
    .get()
    .then(res => {
      currentUser = res.data();
      currentUser.uid = userId;
      if (
        currentUser.competition != null &&
        currentUser.competition.length > 0
      ) {
        return firestore()
          .collection(COMPETITIONS_COLLECTION)
          .doc(currentUser.competition)
          .get()
          .then(res => {
            if (res.data()) {
              competition = res.data()
              competition.id = currentUser.competition
            }
          })
      }
    })

  let activitiesPromise = firestore()
    .collection(COMPETITIONS_COLLECTION)
    .doc(ACTIVITIES_DOC)
    .get()
    .then(res => {
      activities = res.data().categories
    })
  await Promise.all([userAndCompetitionPromise, activitiesPromise])
}
const clear = () => {
  currentUser = null
  competition = null
  activities = null
}
const getCurrentUser = () => {
  return currentUser
}
const getCurrentCompetition = () => {
  return competition
}
const getActivities = () => {
  return activities
}
const getActivityById = activityUid => {
  let activity
  activities.forEach(category => {
    let found = category.activities.find(({ uid }) => {
      return uid === activityUid
    })
    if (found) {
      activity = found
    }
  })
  return activity
}
const getActivitiesByCategory = category => {
  return activities[CATEGORIES.indexOf(category)].activities
}

const getCurrentUserActivityStats = activityUid => {
  return currentUser.activityStats[activityUid]
}

const getActivitiesAndCurrentUserStats = () => {
  let catList = []
  activities.forEach(cat => {
    catList.push({
      category: cat.category,
      activities: cat.activities.map(activity => {
        let stats = getCurrentUserActivityStats(activity.uid)
        return {
          title: activity.title,
          description: activity.description,
          points: activity.points,
          uid: activity.uid,
          dailyLimit: activity.dailyLimit,
          timesToday: stats == undefined ? 0 : stats.timesToday,
          timesTotal: stats == undefined ? 0 : stats.timesTotal,
          lastCompleted: stats == undefined ? new Date() : stats.lastCompleted,
        }
      }),
    })
  })
  return catList
}

const getRecentActivitiesAndStats = () => {
  return getActivitiesAndCurrentUserStats.sort((a, b) => a.lastCompleted.toDate() - b.lastCompleted.toDate());
}

const getActivitiesAndUserStats = async userId => {
  let user = await firestore().collection(USERS_COLLECTION).doc(userId).get()
  user = user.data()
  let catList = []
  activities.forEach(cat => {
    catList.push({
      category: cat.category,
      activities: cat.activities.map(activity => {
        let stats = user.activityStats[activity.uid]
        return {
          title: activity.title,
          description: activity.description,
          points: activity.points,
          uid: activity.uid,
          dailyLimit: activity.dailyLimit,
          timesToday: stats == undefined ? 0 : stats.timesToday,
          timesTotal: stats == undefined ? 0 : stats.timesTotal,
          lastCompleted: stats == undefined ? new Date() : stats.lastCompleted,
        }
      }),
    })
  })
  return catList
}

const getUserById = async userId => {
  await firestore().collection(USERS_COLLECTION).doc(userId).get()
}
const getUserPointsByCategory = async userId => {
  let userActs
  if (userId == curUser().uid) {
    userActs = getActivitiesAndCurrentUserStats()
  } else {
    userActs = await getActivitiesAndUserStats()
  }
  let breakdown = [0, 0, 0, 0, 0, 0]

  userActs.forEach((category, index) => {
    category.activities.forEach(activityStat => {
      breakdown[index] += activityStat.points * activityStat.timesTotal
    })
  })

  return CATEGORIES.map((name, index) => {
    return { category: name, total: breakdown[index] }
  })
}

const getCompetitionById = competitionId => {
  return firestore()
    .collection(COMPETITIONS_COLLECTION)
    .doc(competitionId)
    .get()
}

const isCompetitionValid = () => {
  if (!competition) {
    return -1
  }
  const date = new Date()
  let startDate = competition.startTime.toDate()
  let endDate = competition.endTime.toDate()
  if (!(startDate != null && endDate != null)) {
    return -1 //Missing
  } else if (date > startDate && date < endDate) {
    return 1 //Good to go
  } else if (date < startDate && date < endDate) {
    return 0 //Starting soon
  } else if (date > startDate && date > endDate) {
    return 2 //Competition over
  } else {
    return -1 //Missing
  }
}

const getAllUsers = () => {
  return firestore().collection(USERS_COLLECTION).get()
}

/*
 * Returns a promise from the firestore api
 * fields  json object with the keys and new values for all fields to update in the same format as the database
 */
const updateCurrentUserFields = fields => {
  for (const [key, value] of Object.entries(fields)) {
    currentUser[key] = value
  }
  return firestore()
    .collection(USERS_COLLECTION)
    .doc(curUser().uid)
    .update(fields)
}

const completeActivityForCurrentUser = activityUid => {
  let activity = getActivityById(activityUid)
  let stats = getCurrentUserActivityStats(activityUid)

  if (stats == undefined) {
    stats = {}
    currentUser.activityStats[activityUid] = stats
  }

  currentUser.points = currentUser.points + activity.points
  let userUpdate = {
    points: currentUser.points,
  }

  stats.timesToday = stats.timesToday ? stats.timesToday + 1 : 1
  stats.timesTotal = stats.timesTotal ? stats.timesTotal + 1 : 1
  stats.lastCompleted = new Date()
  if (!currentUser.badges) {
    currentUser.badges = recalculateBadgesForCurrentUser()
  } else {
    switch (stats.timesTotal) {
      case 3:
        currentUser.badges.bronze += 1
        break
      case 5:
        currentUser.badges.silver += 1
        break
      case 10:
        currentUser.badges.gold += 1
        break
    }
  }
  userUpdate.badges = {
    bronze: currentUser.badges.bronze,
    silver: currentUser.badges.silver,
    gold: currentUser.badges.gold,
  }
  userUpdate[`activityStats.${activityUid}`] = stats

  return firestore()
    .collection(USERS_COLLECTION)
    .doc(curUser().uid)
    .update(userUpdate)
}

//Badge Scoring: bronze 1 pt, silver 2 pts, gold 3 pts
const recalculateBadgesForCurrentUser = () => {
  let badges = { bronze: 0, silver: 0, gold: 0 }
  for (const [_key, value] of Object.entries(currentUser.activityStats)) {
    let times = value.timesTotal
    if (times >= 10) {
      badges.gold += 1
    }
    if (times >= 5) {
      badges.silver += 1
    }
    if (times >= 3) {
      badges.bronze += 1
    }
  }
  return badges
}

const undoActivityForCurrentUser = activityUid => {
  let activity = getActivityById(activityUid)
  let stats = getCurrentUserActivityStats(activityUid)

  if (stats == undefined) {
    stats = {}
    currentUser.activityStats[activityUid] = stats
  }

  currentUser.points = currentUser.points - activity.points
  let userUpdate = {
    points: currentUser.points,
  }

  stats.timesToday = stats.timesToday - 1
  stats.timesTotal = stats.timesTotal - 1
  stats.lastCompleted = new Date()
  if (currentUser.badges) {
    switch (stats.timesTotal) {
      case 2:
        currentUser.badges.bronze -= 1
        break
      case 4:
        currentUser.badges.silver -= 1
        break
      case 9:
        currentUser.badges.gold -= 1
        break
    }
  }
  userUpdate.badges = {
    bronze: currentUser.badges.bronze,
    silver: currentUser.badges.silver,
    gold: currentUser.badges.gold,
  }

  userUpdate[`activityStats.${activityUid}`] = stats

  return firestore()
    .collection(USERS_COLLECTION)
    .doc(curUser().uid)
    .update(userUpdate)
}

const generateUserDoc = (uid, email, firstName, lastName, competitionId) => {
  const userObj = {
    email: email,
    firstName: firstName,
    lastName: lastName,
    competition: competitionId,
    points: 0,
    private: false,
    activityStats: {},
    badges: {
      bronze: 0,
      silver: 0,
      gold: 0,
    },
  }
  return firestore().collection(USERS_COLLECTION).doc(uid).set(userObj)
}

/*
 * Returns a promise from the firestore api
 * fields  json object with the keys and new values for all fields to update in the same format as the database
 */
const updateActivity = updated => {
  if (!updated.uid) {
    return null
  }

  activities.forEach(category => {
    activities[CATEGORIES.indexOf(category.category)].activities =
      category.activities.filter(act => act.uid !== updated.uid)
  })
  const categoryIndex = CATEGORIES.indexOf(updated.category)
  delete updated.category
  activities[categoryIndex].activities.push(updated)

  return firestore()
    .collection(COMPETITIONS_COLLECTION)
    .doc(ACTIVITIES_DOC)
    .set({ categories: activities })
}

const addActivity = newActivity => {
  newActivity.uid = uuid.v4()
  const categoryIndex = CATEGORIES.indexOf(newActivity.category)
  delete newActivity.category
  activities[categoryIndex].activities.push(newActivity)

  return firestore()
    .collection(COMPETITIONS_COLLECTION)
    .doc(ACTIVITIES_DOC)
    .set({
      categories: activities,
    })
}

const deleteActivity = uid => {
  activities.forEach(category => {
    activities[CATEGORIES.indexOf(category.category)].activities =
      category.activities.filter(act => act.uid !== uid)
  })
  return firestore()
    .collection(COMPETITIONS_COLLECTION)
    .doc(ACTIVITIES_DOC)
    .set({
      categories: activities,
    })
}

/**
 * Helper function
 * Determines if string is a valid string using JS api
 * */
function isDate(date) {
  return new Date(date) !== 'Invalid Date' && !isNaN(new Date(date))
}

/**
 * Gets users activities sorted by recently completed
 * @return
 *     Array of activities sorted by date
 *     [[activityId, {available,description,points,title,uid}], ...]
 * */
const getActivitiesSortedByDate = () => {
  let userStats = getCurrentUser()?.activityStats
  let sequentialStatsKeys = Object.keys(userStats).sort((stat1, stat2) => {
    try {
      // Standard for if pulling both records from firebase
      return (
        userStats[stat1]?.lastCompleted?.toDate() <=
        userStats[stat2]?.lastCompleted?.toDate()
      )
    } catch {
      // If a record is in memory will use date string over firebase toDate()
      // method
      let u1 = new Date()
      let u2 = new Date()
      if (userStats[stat1]?.lastCompleted?.toDate) {
        u1 = userStats[stat1].lastCompleted.toDate()
      } else if (isDate(userStats[stat1]?.lastCompleted)) {
        u1 = new Date(userStats[stat1]?.lastCompleted)
      } else {
        return 1
      }
      if (userStats[stat2]?.lastCompleted?.toDate) {
        u2 = userStats[stat2].lastCompleted.toDate()
      } else if (isDate(userStats[stat2]?.lastCompleted)) {
        u2 = new Date(userStats[stat2]?.lastCompleted)
      } else {
        return -1
      }
      return u1 <= u2
    }
  })

  return sequentialStatsKeys.map(statID => [statID, userStats[statID]])
}

export {
  getCurrentUser,
  getCurrentCompetition,
  getUserById,
  getCompetitionById,
  isCompetitionValid,
  getAllUsers,
  getCurrentUserActivityStats,
  getActivitiesAndCurrentUserStats,
  getUserPointsByCategory,
  completeActivityForCurrentUser,
  undoActivityForCurrentUser,
  updateCurrentUserFields,
  generateUserDoc,
}
export {
  getActivities,
  getActivityById,
  getActivitiesByCategory,
  updateActivity,
  addActivity,
  deleteActivity,
  getActivitiesSortedByDate,
}
export { fetch, clear }
