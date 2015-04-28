//Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license. See full license at the bottom of this file.
//
﻿'use strict';
angular.module('inboxApp')
.controller('messagesCtrl', ['$scope', '$location', 'webRequestSvc', 'adalAuthenticationService', '$sce',
function ($scope, $location, webRequestSvc, adalService, $sce) {

    $scope.errorMessage = "";
    $scope.failed = false;
    $scope.loadingData = false;
    $scope.messageItems = {};
    $scope.emailMessage = {};
    $scope.searchKeywords = "";
    $scope.morePages = false;
    $scope.page = 0;
    var pageSize = 10;

    // get tokens against the token specific endpoint
    var tid = adalService.userInfo.profile.tid;
    adalService.config.tenant = tid;

    $scope.firstPage = function() {
      $scope.page = 0;
      this.populate(0);
    };

    $scope.nextPage = function() {
      if($scope.morePages) {
        $scope.page += pageSize;
        this.populate($scope.page);
      }
    };

    $scope.previousPage = function () {
      if($scope.page >= 0) {
        $scope.page -= pageSize;
        this.populate($scope.page);
      }
    };

    $scope.refreshPage = function() {
      this.firstPage();
      //this.populate($scope.page);
    };

    // Get Gessages
    $scope.populate = function (skipMessages) {

        $scope.searchKeywords = "";
        $scope.loadingData = true;
        $scope.failed = false;

        webRequestSvc.getMessageItems(skipMessages, pageSize).success(function (data) {

            $scope.messageItems = data.value;
            if(data.value.length >= pageSize) {
              $scope.morePages = true;
            }
            $scope.errorMessage = "ok";
            $scope.loadingData = false;

        }).error(function (err, status, headers, config) {

            $scope.errorMessage = webRequestSvc.getHttpErrorMessage(err, status, headers);
            $scope.loadingData = false;
            $scope.failed = true;
        });
    }; // Get Messages

    // Search Gessages
    $scope.searchMessages = function () {

        if(!$scope.searchKeywords) {
          $scope.firstPage();
          return;
        }

        $scope.loadingData = true;
        $scope.failed = false;

        webRequestSvc.searchMessageItems($scope.searchKeywords).success(function (data) {

            $scope.messageItems = data.value;
            $scope.errorMessage = "ok";
            $scope.loadingData = false;

        }).error(function (err, status, headers, config) {

            $scope.errorMessage = webRequestSvc.getHttpErrorMessage(err, status, headers);
            $scope.loadingData = false;
            $scope.failed = true;
        });
    }; // Search Messages

    // Delete a Message
    $scope.delete = function (id) {

      $scope.failed = false;
      $scope.loadingData = true;

      webRequestSvc.deleteMessageItem(id).success(function (data) {

        angular.element(document.getElementById(id)).hide();
        $scope.errorMessage = "ok";
        $scope.loadingData = false;

      }).error(function (err, status, headers, config) {

        $scope.errorMessage = webRequestSvc.getHttpErrorMessage(err, status, headers);
        $scope.loadingData = false;
        $scope.failed = true;
      });
    }; // Delete a Message

    $scope.getMessageBody = function (show, item) {

      if(!show) { return; }

      var doc = document.implementation.createHTMLDocument("messagebody");
      doc.documentElement.innerHTML = item.Body.Content;
      var messageBody = $sce.trustAsHtml(doc.body.innerHTML);

      return messageBody;
    };

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
