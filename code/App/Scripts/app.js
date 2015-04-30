//Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license. See full license at the bottom of this file.
//﻿
'use strict';
angular.module('inboxApp', ['ngRoute','AdalAngular'])
.config(['$routeProvider', '$httpProvider', 'adalAuthenticationServiceProvider',
function ($routeProvider, $httpProvider, adalProvider) {

    $routeProvider.when("/Home", {
        controller: "homeCtrl",
        templateUrl: "/App/Views/Home.html",
    }).when("/Messages", {
        controller: "messagesCtrl",
        templateUrl: "/App/Views/Messages.html",
        requireADLogin: true,
    }).when("/Groups", {
        controller: "myGroupsCtrl",
        templateUrl: "/App/Views/Groups.html",
        requireADLogin: true,
    }).when("/SendMessage", {
        controller: "sendMessageCtrl",
        templateUrl: "/App/Views/SendMessage.html",
        requireADLogin: true,
    }).when("/Files", {
          controller: "myFilesCtrl",
          templateUrl: "/App/Views/Files.html",
          requireADLogin: true,
    }).when("/Me", {
          controller: "userDataCtrl",
          templateUrl: "/App/Views/AboutMe.html",
          requireADLogin: true,
    }).when("/UserData", {
        controller: "userDataCtrl",
        templateUrl: "/App/Views/UserData.html",
    }).otherwise({ redirectTo: "/Home" });

    var endpoints = {

        // Map the location of a request to an API to a the identifier of the associated resource
        // Format: API Url, Resource
        "https://graph.microsoft-ppe.com/": "https://graph.microsoft-ppe.com/",
        "https://graph.microsoft.com/": "https://graph.microsoft.com/",
    };

    var client_id_prod = "867feceb-50b9-4ceb-bdca-d7f2325479eb";
    var client_id_ppe = "bb0c67ac-b766-4158-be11-064ad74634fb";
    //var client_id = client_id_ppe;
    var client_id = client_id_prod;

    adalProvider.init(
        {
            tenant: 'common',
            clientId: client_id,
            extraQueryParameter: 'nux=1',
            endpoints: endpoints,
            cacheLocation: 'localStorage', // enable this for IE, as sessionStorage does not work for localhost.
        },
        $httpProvider
        );
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
