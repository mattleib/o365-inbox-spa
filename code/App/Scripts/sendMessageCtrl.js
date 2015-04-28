//Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license. See full license at the bottom of this file.
//
'use strict';
angular.module('inboxApp')
.controller('sendMessageCtrl', ['$scope', '$location', 'webRequestSvc', 'adalAuthenticationService',
function ($scope, $location, webRequestSvc, adalService) {

  $scope.errorMessage = "";
  $scope.failed = false;
  $scope.loadingData = false;
  $scope.sendStatus = null;
  $scope.emailMessage = {};
  $scope.emailMessage.importance = "Normal";

  $scope.initialize = function() {
    $scope.errorMessage = "";
    $scope.failed = false;
    $scope.loadingData = false;
    $scope.sendStatus = null;
  };

  // Send a Message
  $scope.sendMessage = function (id) {

    $scope.loadingData = true;

    webRequestSvc.sendMessageItem({
      'Message': {
        'Subject': $scope.emailMessage.subject,
        'Importance': $scope.emailMessage.importance,
        'Body': {
          'ContentType': 'HTML',
          'Content': $scope.emailMessage.message
        },
        'ToRecipients': [{
          'EmailAddress': {
            'Name': '',
            'Address': $scope.emailMessage.smtpAddress
          }
        }]
      }
    }).success(function (data) {

        $scope.initialize();
        $scope.errorMessage = "ok";
        $scope.emailMessage = {};
        $scope.emailMessage.importance = "Normal";
        $scope.sendStatus = "Message successful sent!";

        $location.path("/Messages");

    }).error(function (err, status, headers, config) {

        $scope.initialize();
        $scope.errorMessage = webRequestSvc.getHttpErrorMessage(err, status, headers);
        $scope.failed = true;
    });
  }; // Send a Message
}]);
// MIT License:

// Permission is hereby granted, free of charge, to any person obtaining
// a copy of this software and associated documentation files (the
// ""Software""), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to
// permit persons to whom the Software is furnished to do so, subject to
// the following conditions:

// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED ""AS IS"", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
