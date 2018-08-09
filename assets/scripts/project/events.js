const api = require('./api');
const ui = require('../ui/ui');

let _project_id = 0,
    _story_id = 0;

let _survey_id = null;

const showUserProfile = () => {
  event.preventDefault()

  //ui.showProgress();

  api.showUserProfile()
    .then((result) => {

      //ui.hideProgress();
      $('#show-dashboard').removeClass('active');
      $('#show-user-profile').addClass('active');
      $('#user-photo-profile').attr('src', result.user.photo);
      $('#user-name-profile').text(result.user.name);$('#txt-name').val(result.user.name);
      $('#user-role-profile').text(result.user.role);$('#txt-photo').val(result.user.photo);
      $('#user-email-profile').text(result.user.email);

      $('#div-main,#div-details-project').hide();
      $('#div-show-perfil').fadeIn();

    })
    .catch((error) => {
      ui.showModalMessage('error', error);
    });

}
const updateUserProfile = (event) => {
  event.preventDefault()

  let data = {
    "user": {
      "name": $('#txt-name').val(),
      "photo": $('#txt-photo').val()
    }
  }

  ui.showProgress();

  api.updateUser(data)
    .then((result) => {
      console.log(result)
      ui.hideProgress();ui.showModalMessage('success');
      $('#user-photo-profile').attr('src', result.user.photo);
      $('#user-name-profile').text(result.user.name);
      $('#user-role-profile').text(result.user.role);
      $('#user-name').text(' Hello, ' + result.user.name);
      $('#user-photo').attr('src', result.user.photo);
      // call the function to swich divs
      cancelChangePassword();

    })
    .catch((error) => {
      ui.hideProgress(); ui.showModalMessage('error', error);
    });

}
const showUserSurveys = () => {

  ui.showProgress();

  api.getUserSurveys()
     .then((data) => {

       ui.hideProgress();
       $('body').removeClass('modal-open');
       $('.modal-backdrop').remove();
       if(data.surveys.length > 0) {

        $('#table-surveys > tbody').empty();
        $('#show-div-surveys').fadeIn();

          $.each(data.surveys, (index, element) => {

            $('#table-surveys > tbody').append('<tr><td>' + element._id + '</td><td><span class="text-info">' + element.name + '</span></td><td><a href=' + element.link + ' target="_blank"' + '>Send link</a></td><td><span class="text-info">' + element.status + '</span></td><td><button id="btn-select-project' + index + '" type="button" class="btn btn-danger btn-fill btn-xs pull-right"><i class="fa fa-clone"></i>Show details</button></td></tr>');

              $('#btn-select-project' + index).click(function (e) {
                  e.preventDefault();
                  $('#div-main,#show-div-stories').hide(); $('#div-details-survey').fadeIn();
                  $('#span-survey-name').html('<i class="fa fa-file-powerpoint-o icon-project" aria-hidden="true"></i>&nbsp; ' + element.name);

                  _survey_id = element._id;

                  // $('#txt-name-project-update').val(element.name);
                  // $('#txt-description-project-update').val(element.description);
                  // $('#txt-status-project-update').val(element.status);
              });
         });

       } else {
        $('#show-div-surveys').hide();
       }

     })
     .catch((error) => {
       ui.hideProgress(); ui.showModalMessage('error', error);
     });
}
/* Surveys */
const createNewSurvey = (event) => {
  event.preventDefault()

  let data = {
    "survey": {
      "name": $('#txt-name-survey').val(),
      "link": "localhost:4741/survey.html",
      "status": "Active"
    }
  }

  // $('#modal-create-project').modal('hide');
  // $('body').removeClass('modal-open');
  // $('.modal-backdrop').remove();
  $('#create-survey-form').hide(); $('#create-survey-questions').fadeIn(); $('#txt-question-one').focus();
  ui.showProgress();

  api.createSurvey(data)
    .then((result) => {
      _survey_id = result.survey._id;
      ui.hideProgress();
    })
    .catch((error) => {
      ui.hideProgress(); ui.showModalMessage('error', error);
    });

}
const showUsserSurveys = () => {
  $('#div-main').fadeIn(); $('#div-details-survey,#div-detail').hide();
}
const updateProject = (event) => {
  event.preventDefault()

  let data = {
    "project": {
      "id": _project_id,
      "name": $('#txt-name-project-update').val(),
      "description": $('#txt-description-project-update').val(),
      "status": $('#txt-status-project-update').val()
    }
  }

  api.updateProject(data)
    .then((result) => {
      cancelEditProject();
      showUserProjects();
      ui.showModalMessage('success');
    })
    .catch((error) => {
      ui.hideProgress(); ui.showModalMessage('error', error);
    });

}
const deleteProject = () => {

  ui.showProgress();
  api.deleteProject(_project_id)
    .then((result) => {
      showUserProjects();
      ui.showModalMessage('success');
    })
    .catch((error) => {
      ui.hideProgress(); ui.showModalMessage('error', error);
    });

}
/* questions */
const createQuestions = (event) => {
  event.preventDefault()

  let data = {
    "question": {
      "questionOne": $('#txt-question-one').val(),
      "questionTwo": $('#txt-question-two').val(),
      "questionThree": $('#txt-question-three').val(),
      "questionFour": $('#txt-question-four').val(),
      "questionFive": $('#txt-question-five').val(),
      "survey_id": _survey_id
    }
  }

  $('#modal-create-survey').modal('hide');
  $('body').removeClass('modal-open');
  $('.modal-backdrop').remove();

  ui.showProgress();

  api.createQuestions(data)
    .then((result) => {
      clearFields(); showUserSurveys();
      ui.hideProgress();ui.showModalMessage('success');
    })
    .catch((error) => {
      ui.hideProgress(); ui.showModalMessage('error', error);
    });

}
const showDetail = () => {

  ui.showProgress();

  api.getSurveyQuestions(_survey_id)
     .then((result) => {
       console.log(result)
       ui.hideProgress();
       if(result.questions.length > 0) {

          $('#div-detail').fadeIn();
          $('#ul-survey-questions').empty();

          $('#ul-survey-questions').append('<li>' + result.questions[0].questionOne + '</li>');
          $('#ul-survey-questions').append('<li>' + result.questions[0].questionTwo + '</li>');
          $('#ul-survey-questions').append('<li>' + result.questions[0].questionThree + '</li>');
          $('#ul-survey-questions').append('<li>' + result.questions[0].questionFour + '</li>');
          $('#ul-survey-questions').append('<li>' + result.questions[0].questionFive + '</li>');

          // $.each(result.questions, (index, element) => {

          //    // $('#table-survey-questions > tbody').append('<tr><td>' + element._id + '</td><td>' + element.questionOne + '</td><td>' + element.questionTwo + '</td><td><span class="text-info">' + element.questionThree + '</span></td><td><span class="text-info">' + element.questionFour + '</span></td><td><span class="text-info">' + element.questionFive + '</span></td><td><button id="btn-show-tasks' + index + '" type="button" class="btn btn-danger btn-fill btn-xs pull-right"><i class="fa fa-eye"></i>Show tasks</button>&nbsp;<button id="btn-add-task' + index + '" type="button" class="btn btn-danger btn-fill btn-xs pull-right"><i class="fa fa-plus"></i>Add task</button></td></tr>');
          // });

       } else {
        ui.showModalMessage('ProjectHasNotStories');
       }

     })
     .catch((error) => {
       ui.hideProgress(); ui.showModalMessage('error', error);
     });
}
const showProjectStories = () => {

  ui.showProgress();

  api.getProjectStories(_project_id)
     .then((result) => {

       ui.hideProgress();
       if(result.stories.length > 0) {

          $('#show-div-stories').fadeIn();
          $('#table-projects-stories > tbody').empty();

          $.each(result.stories, (index, element) => {

          $('#table-projects-stories > tbody').append('<tr><td>' + element.id + '</td><td>' + element.name + '</td><td>' + element.description + '</td><td><span class="text-info">' + element.typestory + '</span></td><td><span class="text-info">' + element.difficulty + '</span></td><td><button id="btn-show-tasks' + index + '" type="button" class="btn btn-danger btn-fill btn-xs pull-right"><i class="fa fa-eye"></i>Show tasks</button>&nbsp;<button id="btn-add-task' + index + '" type="button" class="btn btn-danger btn-fill btn-xs pull-right"><i class="fa fa-plus"></i>Add task</button></td></tr>');

            $('#btn-add-task' + index).click(function (e) {
                e.preventDefault();
                $('#modal-create-task').modal({
                  backdrop: 'static',
                  keyboard: false
                });
                _story_id = element.id;
                setTimeout(function(){ $('#txt-name-task').focus() }, 800);

            });

            $('#btn-show-tasks' + index).click(function (e) {
                e.preventDefault();
                showStoryTasks(element.id);
            });
          });

       } else {
        ui.showModalMessage('ProjectHasNotStories');
       }

     })
     .catch((error) => {
       ui.hideProgress(); ui.showModalMessage('error', error);
     });
}
/* tasks */
const createNewTask = (event) => {
  event.preventDefault()

  let data = {
    "task": {
      "name": $('#txt-name-task').val(),
      "story_id": _story_id
    }
  }

  $('#modal-create-task').modal('hide');
  $('body').removeClass('modal-open');
  $('.modal-backdrop').remove();

  ui.showProgress();

  api.createTask(data)
    .then((result) => {
      clearFields(); ui.hideProgress();ui.showModalMessage('success');
    })
    .catch((error) => {
      ui.hideProgress(); ui.showModalMessage('error', error);
    });

}
const showStoryTasks = (storyid) => {

  ui.showProgress();

  api.getStoryTasks(storyid)
     .then((result) => {

       ui.hideProgress();

       if(result.tasks.length > 0) {

          $('#table-story-tasks > tbody').empty();

          $.each(result.tasks, (index, task) => {

            $('#table-story-tasks > tbody').append('<tr><td><input type="checkbox"></td><td>' + task.name + '</td></tr>');

          });

          $('#modal-show-tasks').modal({
            backdrop: 'static',
            keyboard: false
          });

       } else {
        ui.showModalMessage('StoryNotHasTasks');
       }

     })
     .catch((error) => {
       ui.hideProgress(); ui.showModalMessage('error', error);
     });
}
// Misc
const showViewEditProfile = () => {
  $('#card-user').hide(); $('#view-edit-profile').fadeIn();$('#txt-name').focus();
}
const showViewChangePassword = () => {
  $('#card-user').hide(); $('#view-change-password').fadeIn();$('#txt-old-password').focus();
}
const cancelChangePassword = () => {
  $('#view-change-password,#view-edit-profile').hide(); $('#card-user').fadeIn();
}
const showViewEditProject = () => {
  $('#div-details-project').hide(); $('#div-update-project').fadeIn();
}
const cancelEditProject = () => {
  $('#div-update-project').hide(); $('#div-details-project').fadeIn();
}
/*modals*/
/* create survey modal */
const showModalCreateSurvey = () => {

  $('#modal-create-survey').modal({
    backdrop: 'static',
    keyboard: false
  });
  $('#div-main').fadeIn(); $('#div-details-survey,#div-detail').hide();
  setTimeout(function(){ $('#txt-name-survey').focus() }, 800);
}
/* create story modal */
const showModalCreateStory = () => {

  $('#modal-create-story').modal({
    backdrop: 'static',
    keyboard: false
  });
  setTimeout(function(){ $('#txt-name-story').focus() }, 800);
}
/* clear fields */
const clearFields = () => {
  $('.form-control').val('');
}
// manage the events
const addHandlers = () => {
  // general handlers
  // user handlers
  $('#show-user-profile').on('click', showUserProfile);
  $('#btn-show-view-edit-profile').on('click', showViewEditProfile);
  $('#btn-show-change-password').on('click', showViewChangePassword);
  $('#cancel-password').on('click', cancelChangePassword);
  $('#cancel-edit-profile').on('click', cancelChangePassword);
  $('#edit-profile').on('submit', updateUserProfile);

  // surveys
  $('#create-survey-form').on('submit', createNewSurvey);
  $('#show-user-surveys').on('click', showUsserSurveys);
  $('#show-view-edit-project').on('click', showViewEditProject);
  $('#cancel-edit-project').on('click', cancelEditProject);
  $('#update-project-form').on('submit', updateProject);
  $('#delete-project').on('click', deleteProject);

  // questions
  $('#show-project-stories').on('click', showProjectStories);
  $('#create-survey-questions').on('submit', createQuestions);
  $('#show-modal-create-story').on('click', showModalCreateStory);
  $('#show-detail').on('click', showDetail);

  // tasks
  $('#create-task-form').on('submit', createNewTask);

  //modals
  $('#show-modal-create-survey').on('click', showModalCreateSurvey);

  //$('#body').on('load', showSurveys);
}

module.exports = {
  addHandlers,
  showUserSurveys
}
