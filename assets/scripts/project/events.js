const getFormFields = require('../../../lib/get-form-fields');
const api = require('./api');
const store = require('../store');
const ui = require('../ui/ui');

const showDashBoard = () => {
  $('#div-main').fadeIn();
  $('#div-show-perfil').hide();
}
const showUserProfile = () => {
  event.preventDefault()

  ui.showProgress();

  api.showUserProfile()
    .then((result) => {
      //console.log(result)
      ui.hideProgress();
      $('#user-photo-profile').attr('src', result.user.photo);
      $('#user-name-profile').text(result.user.name);$('#txt-name').val(result.user.name);
      $('#user-role-profile').text(result.user.role);$('#txt-photo').val(result.user.photo);
      $('#user-email-profile').text(result.user.email);

      $('#div-main').hide();
      $('#div-show-perfil').fadeIn();

    })
    .catch((error) => {
      ui.hideProgress(); ui.showModalMessage('error', error);
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
       console.log(data)
       if(data.projects.length > 0) {

          $('#show-div-projects').fadeIn();
          $('#table-projects > tbody').empty();

          $.each(data.projects, (index, element) => {
          $('#table-projects > tbody').append('<tr><td>' + element.id + '</td><td>' + element.name + '</td><td>' + element.description + '</td><td><span class="text-info">' + element.status + '</span></td><td><button id="btn-select-project' + index + '" type="button" class="btn btn-danger btn-fill btn-xs pull-right"><i class="fa fa-clone"></i>Show details</button></td></tr>');


            $('#btn-select-project' + index).click(function (e) {
                e.preventDefault();

              //  api.getGameById(element.id)
              //     .then((result) => {


              //     })
              //     .catch((error) => {
              //       ui.hideProgress(); ui.showModalMessage('error', error);
              //     });
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
const showViewEditProfile = () => {
  $('#card-user').hide(); $('#view-edit-profile').fadeIn();$('#txt-name').focus();
}
const showViewChangePassword = () => {
  $('#card-user').hide(); $('#view-change-password').fadeIn();$('#txt-old-password').focus();
}
const cancelChangePassword = () => {
  $('#view-change-password,#view-edit-profile').hide(); $('#card-user').fadeIn();
}

/*modals*/
/* create project modal */
const showModalProject = () => {

  $('#modal-create-project').modal({
    backdrop: 'static',
    keyboard: false
  });
}
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
      showUserProjects();
      ui.hideProgress();ui.showModalMessage('success');
    })
    .catch((error) => {
      ui.hideProgress(); ui.showModalMessage('error', error);
    });

}
// manage the events
const addHandlers = () => {
  $('#show-dashboard').on('click', showDashBoard);

  // user handlers
  $('#show-user-profile').on('click', showUserProfile);
  $('#btn-show-view-edit-profile').on('click', showViewEditProfile);
  $('#btn-show-change-password').on('click', showViewChangePassword);
  $('#cancel-password').on('click', cancelChangePassword);
  $('#cancel-edit-profile').on('click', cancelChangePassword);
  $('#edit-profile').on('submit', updateUserProfile);

  // projects handlers
  $('#show-user-projects').on('click', showUserProjects)
  $('#create-project-form').on('submit', createNewProject);

  //modals
  $('#show-modal-create-project').on('click', showModalProject);
}

module.exports = {
  addHandlers
}
