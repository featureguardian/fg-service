module.exports = {

  index: function (request, response) {
    return response.view('Admin/index', {
      currentDate: (new Date()).toString()
    });
  }

};
