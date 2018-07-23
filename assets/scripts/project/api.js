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
    method: 'PATCH',
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: JSON.stringify(data)
  });

}
/**
 * Show the user's projects.
 *
 */
const getUserProjects = function () {

  return $.ajax({
    url: config.apiUrl + '/projects',
    method: 'GET',
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  });

}
/**
 * Create a new project
 */
const createProject = function (data) {

  return $.ajax({
    url: config.apiUrl + '/projects',
    method: 'POST',
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: JSON.stringify(data)
  });

}
module.exports = {
  showUserProfile,
  updateUser,
  getUserProjects,
  createProject
}
