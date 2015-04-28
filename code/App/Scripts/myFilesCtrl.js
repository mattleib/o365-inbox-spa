//Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license. See full license at the bottom of this file.
//
'use strict';
angular.module('inboxApp')
.controller('myFilesCtrl', ['$scope', 'adalAuthenticationService', '$location', 'webRequestSvc',
function ($scope, adalService, $location, webRequestSvc) {

  $scope.errorMessage = "";
  $scope.failed = false;
  $scope.loadingData = false;
  $scope.myFiles = null;

  // Get getMyFiles
  $scope.getMyFiles = function () {

      $scope.myFiles = null;
      $scope.loadingData = true;
      $scope.failed = false;

      webRequestSvc.getMyFiles().success(function (data) {

          $scope.myFiles = data.value;
          $scope.errorMessage = "ok";
          $scope.loadingData = false;

      }).error(function (err, status, headers, config) {

          $scope.errorMessage = webRequestSvc.getHttpErrorMessage(err, status, headers);
          $scope.loadingData = false;
          $scope.failed = true;
      });
  }; // Get getMyFiles

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
