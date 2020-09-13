/* eslint-disable */
import db from '../db';

const meetups = db.ref('meetups');

const state = {
  meetups: [],
};

const getters = {
  meetupsById: (state) => state.meetups.reduce((byId, meetup) => {
    byId[meetup.id] = meetup;
    return byId;
  }, {}),
};

const actions = {
  async loadMeetups({ commit }) {
    try {
      const data = await meetups.once('value');
      const loadedMeetups = [];
      data.forEach((child) => {
        loadedMeetups.push({
          id: child.key,
          title: child.val().title,
          description: child.val().description,
          location: child.val().location,
          imageURL: child.val().imageURL,
          date: child.val().date,
        });
      });
      commit('setMeetups', loadedMeetups);
    } catch (error) {
      console.error(error);
    }
  },

  async addMeetup({ commit }, meetup) {
    try {
      const { key } = await meetups.push(meetup);
      const newMeetup = {
        ...meetup,
        id: key,
      };
      commit('addMeetup', newMeetup);
    } catch (error) {
      console.error(error);
    }
  },
};

const mutations = {
  addMeetup: (state, meetup) => state.meetups.push(meetup),
  setMeetups: (state, meetups) => { state.meetups = meetups; },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
