//Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license. See full license at the bottom of this file.
//
'use strict';
angular.module('inboxApp')
.controller('myGroupsCtrl', ['$scope', '$location', 'webRequestSvc', 'adalAuthenticationService', '$sce', 'dataLoaderSvc',
function ($scope, $location, webRequestSvc, adalService, $sce, dataLoaderSvc) {

  $scope.eventItems = {};
  $scope.conversationItems = {};
  $scope.conversationItem = {};
  $scope.joinedGroups = {};
  $scope.groupThreadItems = {};
  $scope.threadPosts = {};
  $scope.groupFiles = {};
  $scope.currentThreadId = null;
  $scope.postReplyMessage = null;
  $scope.selectedGroup = {};
  $scope.itemPost = null;
  $scope.showPostReply = false;
  $scope.groupTab = 1;

  // get tokens against the token specific endpoint
  var tid = adalService.userInfo.profile.tid;
  adalService.config.tenant = tid;

  // Control Group Tabs
  $scope.isGroupTabSet = function(checkTab) {
    return $scope.groupTab === checkTab;
  };

  $scope.setGroupTab = function(activeTab) {
    $scope.groupTab = activeTab;
    if(activeTab === 1) {
        $scope.getGroupConversations($scope.selectedGroup.objectId);
    } else if (activeTab ===2) {
        $scope.getGroupCalendar($scope.selectedGroup.objectId);
    } else {
        $scope.getGroupFiles($scope.selectedGroup.objectId);
    }
  };

  $scope.groupChanged = function() {
    $scope.conversationItems = null;
    $scope.conversationItem = null;
    $scope.groupThreadItems = null;
    $scope.threadPosts = null;
    $scope.currentThreadId =  null;
    $scope.eventItems = null;
    $scope.groupFiles = null;
    $scope.itemPost = null;
    $scope.postReplyMessage = null;
    $scope.setGroupTab($scope.groupTab);
  };

  $scope.togglePostReply = function() {
    $scope.showPostReply = !$scope.showPostReply;
  };

  // Get Groups
  $scope.getGroups = function () {

      dataLoaderSvc.prepareApiCall();
      webRequestSvc.getJoinedGroups().success(function (data) {

          $scope.joinedGroups = data.value;
          dataLoaderSvc.successApiCall();

      }).error(function (err, status, headers, config) {
          dataLoaderSvc.errorApiCall(err, status, headers);
      });
  }; // Get Groups

  // Get Files
  $scope.getGroupFiles = function (groupId) {

    $scope.groupFiles = null;

    dataLoaderSvc.prepareApiCall();
    webRequestSvc.getGroupFiles(groupId).success(function (data) {

        $scope.groupFiles = data.value;
        dataLoaderSvc.successApiCall();

    }).error(function (err, status, headers, config) {
        dataLoaderSvc.errorApiCall(err, status, headers);
    });
  }; // Get Group Files;

  $scope.getGroupCalendar = function (groupId) {

    $scope.eventItems = null;

    dataLoaderSvc.prepareApiCall();
    webRequestSvc.getGroupCalendarItems(groupId).success(function (data) {

        $scope.eventItems = data.value;
        dataLoaderSvc.successApiCall();

    }).error(function (err, status, headers, config) {
        dataLoaderSvc.errorApiCall(err, status, headers);
    });
  }; // Get Group Calendar;

  $scope.getGroupConversations = function (groupId) {

    $scope.conversationItems = null;

    dataLoaderSvc.prepareApiCall();
    webRequestSvc.getGroupConversationItems(groupId).success(function (data) {

        $scope.conversationItems = data.value;
        dataLoaderSvc.successApiCall();

    }).error(function (err, status, headers, config) {
        dataLoaderSvc.errorApiCall(err, status, headers);
    });
  }; // Get Group Conversations

  $scope.getGroupThreads = function (groupId) {

    $scope.groupThreadItems = null;

    dataLoaderSvc.prepareApiCall();
    webRequestSvc.getGroupThreads(groupId).success(function (data) {

        $scope.groupThreadItems = data.value;
        dataLoaderSvc.successApiCall();

    }).error(function (err, status, headers, config) {
        dataLoaderSvc.errorApiCall(err, status, headers);
    });
  }; // Get Group Threads

  $scope.getConversationThreadPosts = function () {

    $scope.threadPosts = null;
    $scope.currentThreadId =  null;

    dataLoaderSvc.prepareApiCall();
    webRequestSvc.getGroupThreads(
      $scope.selectedGroup.objectId,
      $scope.conversationItem.Id).success(function (data) {

          var threadId = data.value[0].Id;

          webRequestSvc.getGroupConversationPostItems(
            $scope.selectedGroup.objectId,
            $scope.conversationItem.Id,
            threadId
          ).success(function (data){
              $scope.threadPosts = data.value;
              $scope.currentThreadId = threadId;
              dataLoaderSvc.successApiCall();
          }).error(function (err, status, headers, config) {
              dataLoaderSvc.errorApiCall(err, status, headers);
          });

    }).error(function (err, status, headers, config) {
        dataLoaderSvc.errorApiCall(err, status, headers);
    });
  }; // getConversationThreadPosts

  $scope.postItem = function () {

    var groupId = $scope.selectedGroup.objectId;
    var conversationId = $scope.conversationItem.Id;
    var threadId = $scope.currentThreadId;
    var message = $scope.postReplyMessage;

    dataLoaderSvc.prepareApiCall();
    webRequestSvc.postReplyItem({
        "Post":{
          "Body": {
            "ContentType": "HTML",
            "Content": message
          }
        }
    }, groupId, conversationId, threadId).success(function (data) {

        $scope.postReplyMessage = null;
        dataLoaderSvc.successApiCall();

        $scope.getConversationThreadPosts();

    }).error(function (err, status, headers, config) {

        $scope.postReplyMessage = null;
        dataLoaderSvc.errorApiCall(err, status, headers);
    });

    $scope.togglePostReply();
  }; // postItem

  $scope.showPostContent = function (item) {
    //var htmlStart = "<html><body>";
    //var htmlEnd = "</body></html>";
    //var htmlLength = item.Body.Content.length;
    //$scope.itemPost = $sce.trustAsHtml(item.Body.Content.substring(htmlStart.length, htmlLength - htmlEnd.length));
    //return $scope.itemPost;

    var doc = document.implementation.createHTMLDocument("messagebody");
    doc.documentElement.innerHTML = item.Body.Content;
    return $sce.trustAsHtml(doc.body.innerHTML);

  } //showPostContent

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
