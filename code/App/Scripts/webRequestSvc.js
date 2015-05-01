//Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license. See full license at the bottom of this file.
//
'use strict';
angular.module('inboxApp')
.factory('webRequestSvc', ['$http', function ($http) {

    // API paths
    var apiMessageQuery = "?$select=From,ToRecipients,Subject,DateTimeReceived,BodyPreview,Body,Importance,HasAttachments";
    var apiGroupCalendar = "/calendar/events/";
    var apiGroupConversations = "/conversations/";
    var apiGroupThreads = "/threads/";
    var apiGroupExpandPosts = "?$expand=posts";
    var apiGroupReplyPosts = "/reply/";
    var apiGroupFiles = "/files";

    // Microsoft Graph Rest API
    //var apiGraphRoot = "https://graph.microsoft-ppe.com/alpha";
    var apiGraphRoot = "https://graph.microsoft.com/beta";
    var apiGraphMe = apiGraphRoot + "/me";
    var apiGraphManager = apiGraphMe + "/manager";
    var apiGraphDirectReports = apiGraphMe + "/directReports";
    var apiGraphJoinedGroups = apiGraphMe + "/joinedGroups";
    var apiGraphGroups = apiGraphRoot + "/myorganization/groups";
    var apiGraphMyFiles = apiGraphMe + "/files";
    var apiGraphInbox = apiGraphMe + "/messages";
    var apiGraphMessageSearch = apiGraphInbox + "?$search=";

    // Headers for HTTP request
    var config = { headers: {
        'Accept' : 'application/json; odata.metadata=none',
        'X-UserAgent' : 'Matthias Inbox SPA/1.0',
        'client-request-id' : newGuid(),
        'return-client-request-id' : true
    }};

    return {
        // Get Files
        getGroupFiles : function(groupId){

            var api = apiGraphGroups + '/' + groupId + apiGroupFiles;
            return $http.get(api);
        },
        // Message Rest API calls
        getMessageItems : function(skipMessages, pageSize){

            var api = apiGraphInbox + apiMessageQuery + "&$skip=" + skipMessages + "&$top=" + pageSize;
            return $http.get(api, config);
        },
        searchMessageItems : function(keywords){

            var api = apiGraphMessageSearch + '"' + keywords + '"';
            return $http.get(api, config);
        },
        sendMessageItem : function(item){

            var api = apiGraphMe + '/sendmail';
            return $http.post(api, item, config);
        },
        deleteMessageItem : function(id){

            var api = apiGraphMe + '/messages/' + id;
            return $http.delete(api, config);
        },
        getMessageItem : function(id){

            var api = apiGraphMe + '/messages/' + id;
            return $http.get(api, config);
        },
        updateMessageItem : function(item){

            var api = apiGraphMe + '/messages/' + id;
            return $http.patch(api, item, config);
        },
        // Group Rest API calls
        getJoinedGroups : function(){

            var api = apiGraphJoinedGroups;
            return $http.get(api);
        },
        getAvailableGroups : function(tenant){

            var api = apiGraphRoot + '/' + tenant + apiGraphAllGroups;
            return $http.get(api);
        },
        getGroupCalendarItems : function(groupId){

            var api = apiGraphGroups + '/' + groupId + apiGroupCalendar;
            return $http.get(api);
        },
        getGroupConversationItems : function(groupId){

            var api = apiGraphGroups + '/' + groupId + apiGroupConversations;
            return $http.get(api);
        },
        getGroupThreads : function(groupId, conversationId){

            var api = apiGraphGroups + '/' + groupId + apiGroupConversations + conversationId + apiGroupThreads;
            return $http.get(api);
        },
        getGroupConversationPostItems : function(groupId, conversationId, threadId){

            //var api = apiGroups + groupId + apiGroupConversations + conversationId + apiGroupThreads + apiGroupExpandPosts;
            var api = apiGraphGroups + '/' + groupId + apiGroupConversations + conversationId + apiGroupThreads + threadId + '/Posts';
            return $http.get(api);
        },
        postReplyItem : function(item, groupId, conversationId, threadId){

            var api = apiGraphGroups + '/' + groupId + apiGroupConversations + conversationId + apiGroupThreads + threadId + apiGroupReplyPosts;
            return $http.post(api, item, config);
        },
        // Graph Rest API calls for Profile
        getMyProfile : function(){
            var api = apiGraphMe;
            return $http.get(api);
        },
        getMyManager : function(){
            var api = apiGraphManager;
            return $http.get(api);
        },
        getMyDirects : function(){
            var api = apiGraphDirectReports;
            return $http.get(api);
        },
        getMyFiles : function(){
            var api = apiGraphMyFiles;
            return $http.get(api);
        },
        // Common Service Functions
        getHttpErrorMessage : function(err, status, headers){

            var errorMessage = "n/a";

            if(status) {
              errorMessage = "Status=" + status.toString();
            }

            if(err) {
              if(errorMessage === "n/a") {
                errorMessage = "Error";
              }
              if(err["odata.error"]) {
                errorMessage += '::Code=' + err["odata.error"].code + '::Message=' + err["odata.error"].message.value;
              } else if (err["error"]) {
                errorMessage += '::Code=' + err.error.code + '::Message=' + err.error.message;
              } else {
                errorMessage+= '::Error=' + err.toString();
              }
            }

            if(headers) {
              var xdiag = headers('x-ms-diagnostics');
              var requestId = headers('requestId');

              if(xdiag) {
                errorMessage += '::x-ms-diagnostics=' + xdiag.replace('"', '');
              }
              if(requestId) {
                errorMessage += '::request-id=' + requestId;
              }
            }

            return errorMessage;
        }
    };

    function newGuid() {
        function _p8(s) {
            var p = (Math.random().toString(16)+"000000000").substr(2,8);
            return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p ;
        }
        return _p8() + _p8(true) + _p8(true) + _p8();
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
