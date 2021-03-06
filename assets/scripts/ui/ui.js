const showProgress = () => {
  $('#modal-progress').modal({
    backdrop: 'static',
    keyboard: false
  });
}
const hideProgress = () => {
  $('#modal-progress').modal('hide');
}

const showModalConfirm = () => {
  $('#confirm-modal').modal({
    backdrop: 'static',
    keyboard: false
  });
}

/* show the message modal */
const showModalMessage = (type, error) => {

  $('#myModal').modal({
    backdrop: 'static',
    keyboard: false
  });

  switch (type) {
    case 'UserRegistrated':
      $('#modal-message').text('Thank you for sign In. Project Tracker :)');
      break;
      case 'UserHasNotProjects':
      $('#modal-message').text('You do not have projects created. Try to create a new project :)');
      break;
      case 'ProjectHasNotStories':
      $('#modal-message').text('This projects do not have stories. Try to create a new story :)');
      break;
      case 'StoryNotHasTasks':
      $('#modal-message').text('This story do not have tasks. Try to create a new task :)');
      break;
    case 'success':
      $('#modal-message').text('Your request was successful. Project Tracker :)');
      break;
      case 'error':
      $('#modal-message').text(`Something went wrong :( error: ${JSON.stringify(error)}`);
      break;
    default:
      return;
  }
}
module.exports = {
  showProgress,
  hideProgress,
  showModalMessage,
  showModalConfirm
}
