const config = require('../config')
const store = require('../store')

/**
 * Show the user's profile.
 *
 */
const showUserProfile = function () {

  return $.ajax({
    url: config.apiUrl + '/users/' + store.user.id,
    method: 'GET',
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  });

}
/**
 * Set the value to the cell in the array of cells in the game array with the cell marked in the board.
 *
 * @param data  Type => Object. User's profile.
 *
 * Return a promise
 */
const updateUser = function (data) {

  return $.ajax({
    url: config.apiUrl + '/users/' + store.user.id,
    method: 'PUT',
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: JSON.stringify(data)
  });

}
/**
 * Show the user's surveys.
 *
 */
const getUserSurveys = function () {
  return $.ajax({
    url: config.apiUrl + '/surveys',
    method: 'GET',
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  });

}
/**
 * Create a new survey
 */
const createSurvey = function (data) {

  return $.ajax({
    url: config.apiUrl + '/surveys',
    method: 'POST',
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: JSON.stringify(data)
  });

}
const getSurveyQuestions = function (id) {
  return $.ajax({
    url: config.apiUrl + '/questions/' + id,
    method: 'GET',
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  });
}

/**
 * Request to the api to update a project.
 *
 * @param data  {Object} Object project with all its properties.
 *
 * Return a promise.
 */
const updateProject = function (data) {

  return $.ajax({
    url: config.apiUrl + '/projects/' + data.project.id,
    method: 'PUT',
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: JSON.stringify(data)
  });

}
/**
 * Request to the api to delete a project.
 *
 * @param project_id  {Integer} Project id.
 *
 * Return a promise.
 */
const deleteProject = function (project_id) {

  return $.ajax({
    url: config.apiUrl + '/projects/' + project_id,
    method: 'DELETE',
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  });

}
/**
 * Request to the api to get a project's stories.
 *
 * @param data  {Object} Object project with all its properties.
 *
 * Return a promise.
 */
const getProjectStories = function (projectId) {

  return $.ajax({
    url: config.apiUrl + '/stories/' + projectId,
    method: 'GET',
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  });

}

const createQuestions = function (data) {

  return $.ajax({
    url: config.apiUrl + '/questions',
    method: 'POST',
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: JSON.stringify(data)
  });

}
const createResponses = function (data) {

  return $.ajax({
    url: config.apiUrl + '/responses',
    method: 'POST',
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: JSON.stringify(data)
  });

}
/**
 * Create a new task
 */
const createTask = function (data) {

  return $.ajax({
    url: config.apiUrl + '/tasks',
    method: 'POST',
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: JSON.stringify(data)
  });

}
/**
 * Request to the api to get a story's tasks.
 *
 * Return a promise.
 */
const getStoryTasks = function (story_Id) {

  return $.ajax({
    url: config.apiUrl + '/tasks/' + story_Id,
    method: 'GET',
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  });

}

module.exports = {
  showUserProfile,
  updateUser,
  getUserSurveys,
  createSurvey,
  getSurveyQuestions,
  updateProject,
  deleteProject,
  getProjectStories,
  createQuestions,
  createResponses,
  createTask,
  getStoryTasks
}
