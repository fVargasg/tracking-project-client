const api = require('./api');
const ui = require('../ui/ui');

let _project_id = 0,
    _story_id = 0;


const showDashBoard = () => {
  $('#show-dashboard').addClass('active');
  $('#show-user-profile').removeClass('active');
  $('#div-main').fadeIn();
  $('#div-show-perfil,#div-details-project').hide();
}
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
const showUserProjects = () => {

  ui.showProgress();

  api.getUserProjects()
     .then((data) => {

       ui.hideProgress();

       if(data.projects.length > 0) {

          $('#show-div-projects').fadeIn();
          $('#table-projects > tbody').empty();

          $.each(data.projects, (index, element) => {

          $('#table-projects > tbody').append('<tr><td>' + element.id + '</td><td>' + element.name + '</td><td>' + element.description + '</td><td><span class="text-info">' + element.status + '</span></td><td><button id="btn-select-project' + index + '" type="button" class="btn btn-danger btn-fill btn-xs pull-right"><i class="fa fa-clone"></i>Show details</button></td></tr>');


            $('#btn-select-project' + index).click(function (e) {
                e.preventDefault();
                $('#div-main,#show-div-stories').hide(); $('#div-details-project').fadeIn();
                $('#span-project-name').html('<i class="fa fa-file-powerpoint-o icon-project" aria-hidden="true"></i>&nbsp;' + element.name);

                _project_id = element.id;

                $('#txt-name-project-update').val(element.name);
                $('#txt-description-project-update').val(element.description);
                $('#txt-status-project-update').val(element.status);
            });
          });

       } else {
        ui.showModalMessage('UserHasNotProjects');
       }

     })
     .catch((error) => {
       ui.hideProgress(); ui.showModalMessage('error', error);
     });
}

/* Projects */
const createNewProject = (event) => {
  event.preventDefault()

  let data = {
    "project": {
      "name": $('#txt-name-project').val(),
      "description": $('#txt-description-project').val(),
      "status": $('#txt-status-project').val()
    }
  }

  $('#modal-create-project').modal('hide');
  $('body').removeClass('modal-open');
  $('.modal-backdrop').remove();

  ui.showProgress();

  api.createProject(data)
    .then((result) => {
      clearFields(); showUserProjects();
      ui.hideProgress();ui.showModalMessage('success');
    })
    .catch((error) => {
      ui.hideProgress(); ui.showModalMessage('error', error);
    });

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
/* stories */
const createNewStory = (event) => {
  event.preventDefault()

  let data = {
    "story": {
      "name": $('#txt-name-story').val(),
      "description": $('#txt-description-story').val(),
      "typestory": $('#txt-type-story').val(),
      "difficulty": $('#txt-difficulty-story').val(),
      "project_id": _project_id,
    }
  }

  $('#modal-create-story').modal('hide');
  $('body').removeClass('modal-open');
  $('.modal-backdrop').remove();

  ui.showProgress();

  api.createStory(data)
    .then((result) => {
      clearFields(); showProjectStories();
      ui.hideProgress();ui.showModalMessage('success');
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
/* create project modal */
const showModalProject = () => {

  $('#modal-create-project').modal({
    backdrop: 'static',
    keyboard: false
  });
  setTimeout(function(){ $('#txt-name-project').focus() }, 800);
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
  $('#show-dashboard').on('click', showDashBoard);

  // user handlers
  $('#show-user-profile').on('click', showUserProfile);
  $('#btn-show-view-edit-profile').on('click', showViewEditProfile);
  $('#btn-show-change-password').on('click', showViewChangePassword);
  $('#cancel-password').on('click', cancelChangePassword);
  $('#cancel-edit-profile').on('click', cancelChangePassword);
  $('#edit-profile').on('submit', updateUserProfile);

  // projects handlers
  $('#show-user-projects').on('click', showUserProjects);
  $('#create-project-form').on('submit', createNewProject);
  $('#show-view-edit-project').on('click', showViewEditProject)
  $('#cancel-edit-project').on('click', cancelEditProject)
  $('#update-project-form').on('submit', updateProject);

  // project stories
  $('#show-project-stories').on('click', showProjectStories);
  $('#create-story-form').on('submit', createNewStory);
  $('#show-modal-create-story').on('click', showModalCreateStory);

  // tasks
  $('#create-task-form').on('submit', createNewTask);

  //modals
  $('#show-modal-create-project').on('click', showModalProject);
}

module.exports = {
  addHandlers
}
