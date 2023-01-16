import { TODO_TYPES } from "../types";
import { todoStatus } from "../../constants/todo";
import moment from "moment";
import { getTodoStatus, sortTodoLost } from "../../helpers/todo";
import Vue from "vue";

const state = {
  list: [],
  modal: {
    show: false,
    type: null,
    todoToEdit: null,
  },
  activeFilter: todoStatus.all,
};

const getters = {
  getTodoList: (state) => state.list,
  getFilteredTodoList: (state) => state.list.filter((elem) => elem.status === state.activeFilter),
  getTodoModalState: (state) => state.modal,
  getActiveFilter: (state) => state.activeFilter,
};

const mutations = {
  [TODO_TYPES.SET_TODO_LIST]: (state, payload) => (state.list = payload),

  [TODO_TYPES.OPEN_TODO_CREATE_MODAL]: (state) =>
    (state.modal = { ...state.modal, show: true, type: "create" }),

  [TODO_TYPES.OPEN_TODO_UPDATE_MODAL]: (state, payload) =>
    (state.modal = {
      ...state.modal,
      show: true,
      type: "update",
      todoToEdit: payload,
    }),

  [TODO_TYPES.CLOSE_TODO_MODAL]: (state) =>
    (state.modal = {
      ...state.modal,
      show: false,
      type: null,
      todoToEdit: null,
    }),

  [TODO_TYPES.CLOSE_TODO_MODAL]: (state) =>
    (state.modal = {
      ...state.modal,
      show: false,
      type: null,
      todoToEdit: null,
    }),

  [TODO_TYPES.SET_ACTIVE_FILTER]: (state, payload) =>
    (state.activeFilter = payload),
};

const actions = {
  addNewTodo: ({ commit, state }, payload) => {
    let newTodo = {
      ...payload,
      status: getTodoStatus(payload.date),
      id: moment().unix(),
    };

    let newList = [...state.list];
    newList.push(newTodo);
    newList.sort(sortTodoLost);
    commit(TODO_TYPES.SET_TODO_LIST, newList);
    Vue.toasted.success("New todo created!");
  },

  updateTodo: ({ commit, state }, payload) => {
    let updatedList = state.list.map((elem) => {
      if (elem.id === payload.id)
        return {
          ...payload,
          status: getTodoStatus(payload.date, payload.status),
        };
      else return elem;
    });
    updatedList.sort(sortTodoLost);
    commit(TODO_TYPES.SET_TODO_LIST, updatedList);
    Vue.toasted.success("Todo updated!");
  },

  deleteTodo: ({ commit, state }, payload) => {
    let updatedList = state.list.filter((elem) => elem.id !== payload.id);
    updatedList.sort(sortTodoLost);
    commit(TODO_TYPES.SET_TODO_LIST, updatedList);
    Vue.toasted.success("Todo deleted!");
  },

  copyTodo: ({ commit, state }, payload) => {
    let newTodo = {...payload, status: getTodoStatus(payload.date), id: moment().unix()}
    let newList = [...state.list, newTodo];
    newList.sort(sortTodoLost);
    commit(TODO_TYPES.SET_TODO_LIST, newList);
    Vue.toasted.success("Todo Copied!");
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
