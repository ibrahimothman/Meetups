/* eslint-disable no-shadow */
import firebase from '../firebase';

const state = {
  user: null,
  error: null,
  loading: false,
};

const actions = {
  async signUp({ commit }, { email, password }) {
    commit('setLoading', true);
    commit('clearError');
    try {
      const { user } = await firebase.auth().createUserWithEmailAndPassword(email, password);
      commit('setLoading', false);
      commit('setUser', {
        id: user.uid,
        registeredMeetups: [],
      });
    } catch (error) {
      commit('setLoading', false);
      commit('setError', error);
    }
  },

  async signIn({ commit }, { email, password }) {
    commit('setLoading', true);
    commit('clearError');
    try {
      const { user } = await firebase.auth().signInWithEmailAndPassword(email, password);
      commit('setLoading', false);
      commit('setUser', {
        id: user.uid,
        registeredMeetups: [],
      });
    } catch (error) {
      commit('setLoading', false);
      commit('setError', error);
    }
  },

  async signOut({ commit }) {
    try {
      await firebase.auth().signOut();
      commit('setUser', null);
    } catch (error) {
      console.error(error);
    }
  },
};

const mutations = {
  setUser: (state, user) => { state.user = user; },
  setError: (state, error) => { state.error = error; },
  clearError: (state) => { state.error = null; },
  setLoading: (state, isLoading) => { state.loading = isLoading; },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
