/* eslint-disable no-shadow */
const state = {
  meetups: [],
};

const actions = {
  addMeetup({ commit }, meetup) {
    commit('addMeetup', meetup);
  },
};

const mutations = {
  addMeetup: (state, meetup) => state.meetups.push(meetup),
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
