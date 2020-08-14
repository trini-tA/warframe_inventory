/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

require('./bootstrap');
global.$ = global.jQuery = require('jquery');
require('jquery-lazy');

//require('./components/App');

$(function($) {
    $('#dropsModal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget);
        var uniqueName = button.data('unique-name'); 
        var filename = button.data('filename');

        //var modal = $(this)
        //modal.find('.modal-title').text('New message to ' + uniqueName + ' ' + filename)
        //modal.find('.modal-body input').val(uniqueName)

        $('#dropsModal .modal-body').html();

        axios.post('/api/data', {
            uniqueName: uniqueName,
            filename: filename
          })
          .then(function (response) {
            $('#dropsModal .modal-body').html( response.data );
            console.log(response);
          })
          .catch(function ( error ) {
            console.log( error );
          });
        
  
      });
});

