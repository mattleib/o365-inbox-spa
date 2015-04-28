//Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license. See full license at the bottom of this file.
//
﻿'use strict';
angular.module('inboxApp')
.controller('userDataCtrl', ['$scope', 'adalAuthenticationService', '$location', 'webRequestSvc',
function ($scope, adalService, $location, webRequestSvc) {

    // Token claims
    $scope.claims = [];

    for (var property in adalService.userInfo.profile) {
        if (adalService.userInfo.profile.hasOwnProperty(property)) {
            $scope.claims.push({
                key: property,
                value: adalService.userInfo.profile[property],
            });
        }
    }

    // About Me!
    $scope.errorMessage = "";
    $scope.failed = false;
    $scope.loadingData = false;
    $scope.myInfo = {};

    // get tokens against the token specific endpoint
    var tid = adalService.userInfo.profile.tid;
    adalService.config.tenant = tid;

    $scope.getMe = function () {

        $scope.errorMessage = "";
        $scope.loadingData = true;
        $scope.failed = false;
        $scope.myInfo = {};

        webRequestSvc.getMyProfile().success(function (data) {

            $scope.myInfo = data;
            $scope.errorMessage = "ok";
            $scope.loadingData = false;

            webRequestSvc.getMyManager().success(function (data) {

                $scope.myInfo.manager = data;
            });

            webRequestSvc.getMyDirects().success(function (data) {

                $scope.myInfo.directs = data.value;
            });

        }).error(function (err, status, headers, config) {

            $scope.errorMessage = webRequestSvc.getHttpErrorMessage(err, status, headers);
            $scope.loadingData = false;
            $scope.failed = true;
        });
    }; // Get Me
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
