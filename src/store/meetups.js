/* eslint-disable */
import firebase from '../firebase';

const state = {
  meetups: [],
  error: null,
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
      const data = await firebase.database().ref('meetups').once('value');
      const loadedMeetups = [];
      data.forEach((child) => {
        loadedMeetups.push({
          id: child.key,
          title: child.val().title,
          description: child.val().description,
          location: child.val().location,
          imageURL: child.val().imageURL,
          date: child.val().date,
          creatorId: child.val().creatorId,
        });
      });
      commit('setMeetups', loadedMeetups);
    } catch (error) {
      console.error(error);
    }
  },

  async addMeetup({ commit, rootState: { auth: { user } } }, payload) {
    try {
      commit('clearError');
      // 1- create a new meetup in the database
      payload.creatorId = user.id;
      const { key } = await firebase.database().ref('meetups').push(payload);
      // 2- upload image to firebase storage
      const ext = payload.image.name.slice(payload.image.name.lastIndexOf('.'));
      const { ref } = await firebase.storage().ref(`meetups/${key}${ext}`).put(payload.image);
      const downloadURL = await ref.getDownloadURL();
      // 3- Update image url of meetup
      await firebase.database().ref('meetups').child(key).update({
        imageURL: downloadURL,
      });

      // finally commit a mutation
      const meetup = {
        ...payload,
        id: key,
        imageURL: downloadURL,
      };
      commit('addMeetup', meetup);
    } catch (error) {
      commit('setError', error);
      console.error(error);
    }
  },

  async updateMeetup({ commit }, payload) {
    try {
      await firebase.database().ref('meetups').child(payload.id).update(payload);
      commit('updateMeetups', payload);
    } catch (error) {
      console.log(error);
    }
  }
};

const mutations = {
  addMeetup: (state, meetup) => state.meetups.push(meetup),
  setMeetups: (state, meetups) => { state.meetups = meetups; },
  updateMeetups: (state, payload) => {
    state.meetups = state.meetups.map((meetup) => {
      if (meetup.id === payload.id) {
        return {
          ...meetup,
          ...payload,
        };
      }
      return meetup;
    });
    console.log(state.meetups);
  },
  setError: (state, error) => { state.error = error; },
  clearError: () => { state.error = null; },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
