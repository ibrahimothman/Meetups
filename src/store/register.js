import { database } from 'firebase';

function isRegisteredForMeetup(registeredMeetups, meetupId) {
  return registeredMeetups.findIndex((meetup) => meetup.id === meetupId) >= 0;
}
const actions = {
  async registerForMeetup({ rootState, commit }, meetupId) {
    try {
      const { auth: { user } } = rootState;
      if (isRegisteredForMeetup(user.registeredMeetups, meetupId)) {
        return;
      }
      const { key } = await database().ref(`users/${user.id}/meetups`).push(meetupId);
      user.registeredMeetups.push({
        id: meetupId,
        key,
      });
      commit('auth/setUser', user, { root: true });
    } catch (error) {
      console.log(error);
    }
  },

  async unRegisterForMeetup({ rootState, commit }, meetupId) {
    try {
      const { auth: { user } } = rootState;
      const { key } = user.registeredMeetups.find((meetup) => meetup.id === meetupId);
      if (!key) {
        return;
      }
      await database().ref(`users/${user.id}/meetups/${key}`).remove();
      user.registeredMeetups
        .splice(user.registeredMeetups.findIndex((meetup) => meetup.id === meetupId), 1);
      commit('auth/setUser', user, { root: true });
    } catch (error) {
      console.log(error);
    }
  },
  async loadRegisteredMeetups({ rootState, commit }) {
    try {
      const { auth: { user } } = rootState;
      const data = await database().ref(`users/${user.id}/meetups`).once('value');
      data.forEach((child) => {
        user.registeredMeetups.push({
          key: child.key,
          id: child.val(),
        });
      });
      commit('auth/setUser', user, { root: true });
    } catch (error) {
      console.log(error);
    }
  },
};

export default {
  namespaced: true,
  actions,
};
