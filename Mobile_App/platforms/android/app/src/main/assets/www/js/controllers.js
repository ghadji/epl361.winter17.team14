angular
    .module("app.controllers", ["ngCordova", "ngStorage"])

.controller("newsFeedCtrl", [
    "$scope",
    "$rootScope",
    "$http",
    "$stateParams",
    "sharedProps",
    "$ionicPopup",
    "$ionicActionSheet",
    "$timeout",
    "$localStorage",
    "$sessionStorage", // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function(
        $scope,
        $rootScope,
        $http,
        $stateParams,
        sharedProps,
        $ionicPopup,
        $ionicActionSheet,
        $timeout,
        $localStorage,
        $sessionStorage
    ) {
        var savedArticlesId = [];
        $scope.sources = {
            total: 2
        };

        $http.get("./test_data/articles/templateArticle.js").then(function(res) {
            $scope.articles = res.data;
        });

        $scope.$on("$ionicView.beforeEnter", function() {
            if (sharedProps.getData("isNightmode") != undefined) {
                $scope.isNightmode = sharedProps.getData("isNightmode").value;
            }
            var f = sharedProps.getData("fontsize");
            if (f != undefined) {
                $scope.selectedFontsizeVal = f.value;
            } else {
                $scope.selectedFontsizeVal = 100;
            }
            console.log("fontsize: " + $scope.selectedFontsizeVal);

            $scope.fontsize = { 'font-size': $scope.selectedFontsizeVal + '%' }
            $scope.fontsizeSmaller = {'font-size': ($scope.selectedFontsizeVal - 20) + '%'}
        });

        $scope.showReportOptions = function() {
            var promptAlert = $ionicPopup.show({
                title: "Report",
                templateUrl: "templates/reportTemplate.html",
                buttons: [{
                        text: "Cancel",
                        type: "button-stable button-outline",
                        onTap: function(e) {
                            //e.preventDefault();
                        }
                    },
                    {
                        text: "Confirm",
                        type: "button-positive",
                        onTap: function(e) {}
                    }
                ]
            });
        };

        $scope.getBackgroundClass = function() {
            return $scope.isNightmode ?
                "nightmodeBackground" :
                "lightmodeBackground";
        };

        $scope.getFontClass = function() {
            return $scope.isNightmode ? "nightmodeFontColor" : "normalBlackLetters";
        };

        $scope.getNightmodeHeaderClass = function() {
            return $scope.isNightmode ?
                "nightmodeHeaderClass" :
                "normalHeaderClass";
        };

        $scope.saveArticle = function(id) {
            if (_.contains(savedArticlesId, id)) {
                savedArticlesId = unsaveArticle(id);
                showRemovedToast();
                return;
            }
            savedArticlesId.push(id);
            showSavedToast();
        };

        $scope.isArticleSaved = function(id) {
            if (_.contains(savedArticlesId, id))
                return true;
            else
                false
        }

        function deleteArticle(id){
            var article = _.find($scope.articles, function(a){
                return a.Id == id;
            })
            article.Deleted = true;
            console.log(article);
            $scope.articles.splice(_.indexOf($scope.articles, article),1);
        }

        $scope.showDeleteConfirm = function(id) {
            var promptAlert = $ionicPopup.show({
                title: "Warning",
                template: "<span>Are you sure you want to delete this article?</span>",
                buttons: [{
                        text: "Cancel",
                        type: "button-stable button-outline",
                        onTap: function(e) {
                            //e.preventDefault();
                        }
                    },
                    {
                        text: "Confirm",
                        type: "button-positive",
                        onTap: function(e) {
                            deleteArticle(id);
                            showDeletedToast();
                        }
                    }
                ]
            });
        };

        function showDeletedToast() {
            var hideSheet = $ionicActionSheet.show({
                titleText: "Article deleted"
            });
            $timeout(function() {
                hideSheet();
            }, 500);
        }

        function unsaveArticle(id) {
            return savedArticlesId.filter(e => e !== id);
        }

        function showSavedToast() {
            var hideSheet = $ionicActionSheet.show({
                titleText: "Article saved"
            });
            $timeout(function() {
                hideSheet();
            }, 500);
        }

        function showRemovedToast() {
            var hideSheet = $ionicActionSheet.show({
                titleText: "Article unsaved"
            });
            $timeout(function() {
                hideSheet();
            }, 500);
        }
    }
])

.controller("settingsCtrl", [
    "$scope",
    "$stateParams",
    "$ionicPopup",
    "$rootScope",
    "sharedProps",
    "$interval",
    "$timeout", // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function(
        $scope,
        $stateParams,
        $ionicPopup,
        $rootScope,
        sharedProps,
        $interval,
        $timeout
    ) {
        $scope.data = {
            cachenewsEnabled: sharedProps.getData("cachenewsEnabled") == undefined ?
                false : sharedProps.getData("cachenewsEnabled").value,
            fontsize: sharedProps.getData("fontsize") == undefined ?
                100 : sharedProps.getData("fontsize").value,
            fontsizeRange : getFontsizeRangeVal(),
            // subFontsize: sharedProps.getData("subFontsize") == undefined ?
            //     70 : sharedProps.getData("subFontsize").value,
            markupEnabled: sharedProps.getData("markupEnabled") == undefined ?
                false : sharedProps.getData("markupEnabled").value,
            hideEnabled: sharedProps.getData("hideEnabled") == undefined ?
                false : sharedProps.getData("hideEnabled").value,
            tolerance: sharedProps.getData("tolerance") == undefined ?
                50 : sharedProps.getData("tolerance").value
        };

        function getFontsizeRangeVal(){
            var f = sharedProps.getData("fontsize");
            if (f == undefined)
                    return 16;
                else{
                    if (f.value == 87.5)
                        return 14;
                    else if (f.value == 100)
                        return 16;
                    else if (f.value == 112.5)
                        return 18;
                    else 
                        return 20;
                }      
        }

        $scope.$on("$ionicView.beforeLeave", function() {
            console.log("FONT SIZE IN SETTINGS: " + $scope.fontsize);
            sharedProps.addData("cachenewsEnabled", $scope.data.cachenewsEnabled);
            // sharedProps.addData("fontsize", $scope.fontsize);
            //sharedProps.addData("subFontsize", $scope.textsize - 80);
            sharedProps.addData("markupEnabled", $scope.data.markupEnabled);
            sharedProps.addData("hideEnabled", $scope.data.hideEnabled);
            sharedProps.addData("tolerance", $scope.data.tolerance);
        });

        $scope.setNightmode = function() {
            $rootScope.$broadcast("nightmodeChange", $scope.data.isNightmode);
            sharedProps.addData("isNightmode", $scope.data.isNightmode);
        };

        $scope.getBackgroundClass = function() {
            return $scope.data.isNightmode ?
                "nightmodeBackgroundMain" :
                "normalBackgroundMain";
        };

        $scope.getFontClass = function() {
            return $scope.data.isNightmode ?
                "nightmodeFontColor" :
                "normalBlackLetters";
        };

        $scope.$watch("data.fontsizeRange", function() {
            console.log($scope.data.fontsizeRange);
            if ($scope.data.fontsizeRange == 14)
                $scope.fontsize = 87.5;
            else if ($scope.data.fontsizeRange == 16)
                $scope.fontsize = 100;
            else if ($scope.data.fontsizeRange == 18)
                $scope.fontsize = 112.5;
            else
                $scope.fontsize = 125;
            $scope.selectedFontsize = { 'font-size': $scope.fontsize + '%' }
            $rootScope.$broadcast('fontsizeChange', $scope.fontsize + 20);
                //$scope.subSelectedFontsize = { 'font-size': $scope.textsize - 80 + '%' }
            sharedProps.addData('fontsize', $scope.fontsize);
            //sharedProps.addData("subFontsize", $scope.textsize - 80);
        });
    }
])

.controller("addSourcesCtrl", [
    "$scope",
    "$http",
    "$stateParams",
    "sharedProps",
    "$ionicLoading",
    "$ionicActionSheet",
    "$timeout", // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function(
        $scope,
        $http,
        $stateParams,
        sharedProps,
        $ionicLoading,
        $ionicActionSheet,
        $timeout
    ) {
        $scope.$on("$ionicView.beforeEnter", function() {
            if (sharedProps.getData("isNightmode") != undefined) {
                $scope.isNightmode = sharedProps.getData("isNightmode").value;
            }
            var f = sharedProps.getData("fontsize");
            if (f != undefined) {
                $scope.selectedFontsizeVal = f.value;
            } else {
                $scope.selectedFontsizeVal = 100;
            }
            console.log("fontsize: " + $scope.selectedFontsizeVal);

            $scope.fontsize = { 'font-size': $scope.selectedFontsizeVal + '%' }
        });

        $scope.sources = {
            total: 0,
            sites: []
        };

        $http.get("./test_data/sources.js").then(function(res) {
            $scope.sources.sites = res.data;
            $scope.sources.total = $scope.sources.sites.length;
        });

        $scope.getBackgroundClass = function() {
            return $scope.isNightmode ?
                "nightmodeBackground" :
                "lightmodeBackground";
        };

        $scope.getFontClass = function() {
            return $scope.isNightmode ? "nightmodeFontColor" : "normalBlackLetters";
        };

        $scope.selectSource = function(sourceTitle) {
            showSuccessToast(sourceTitle);
        };

        $scope.deselectSource = function(sourceTitle) {};

        function showSuccessToast(sourceTitle) {
            // $ionicLoading.show({ template: 'Item Added!', noBackdrop: true, duration: 2000 });
            var hideSheet = $ionicActionSheet.show({
                titleText: sourceTitle + " selected"
            });
            $timeout(function() {
                hideSheet();
            }, 500);
        }

        function showFailureToast(sourceTitle) {
            var hideSheet = $ionicActionSheet.show({
                titleText: "Failed to select " + sourceTitle
            });
            $timeout(function() {
                hideSheet();
            }, 500);
        }
    }
])

.controller("eyeReaderCtrl", [
    "$scope",
    "$stateParams",
    "$rootScope",
    "sharedProps", // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams, $rootScope, sharedProps) {
        $scope.currUser = $rootScope.globals.currentUser.username;

        $rootScope.$on("nightmodeChange", function(event, args) {
            $scope.isNightmode = args;
        });

        $rootScope.$on("fontsizeChange", function(event, args) {
            $scope.selectedFontsize = { 'font-size': args + '%' };
        });

        $scope.getBackgroundClass = function() {
            return $scope.isNightmode ? "nightmodeBackground" : "normalBackground";
        };

        $scope.getFontClass = function() {
            return $scope.isNightmode ? "nightmodeFontColor" : "normalBlackLetters";
        };

        $scope.getSidemenuIconClass = function() {
            return $scope.isNightmode ?
                "nightmodeSidemenuIcon" :
                "normalSidemenuIcon";
        };

        $scope.getNightmodeHeaderClass = function() {
            return $scope.isNightmode ?
                "nightmodeHeaderClass" :
                "normalHeaderClass";
        };
    }
])

.controller("profileCtrl", [
    "$scope",
    "$rootScope",
    "$stateParams",
    "sharedProps", // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $rootScope, $stateParams, sharedProps) {
        $scope.user = $rootScope.activeUser;
        if ($scope.user.sex == 0) {
            $scope.displaySex = "Female";
        } else if ($scope.user.sex == 1) {
            $scope.displaySex = "Male";
        } else {
            $scope.displaySex = "Other";
        }

        $scope.$on("$ionicView.beforeEnter", function() {
            if (sharedProps.getData("isNightmode") != undefined) {
                $scope.isNightmode = sharedProps.getData("isNightmode").value;
            }
            var f = sharedProps.getData("fontsize");
            if (f != undefined) {
                $scope.selectedFontsizeVal = f.value;
            } else {
                $scope.selectedFontsizeVal = 100;
            }
            console.log("fontsize: " + $scope.selectedFontsizeVal);

            $scope.fontsize = { 'font-size': $scope.selectedFontsizeVal + '%' }
        });

        $scope.getBackgroundClass = function() {
            return $scope.isNightmode ? "nightmodeBackground" : "normalBackground";
        };

        $scope.getFontClass = function() {
            return $scope.isNightmode ? "nightmodeFontColor" : "normalBlackLetters";
        };
    }
])

.controller("editProfileCtrl", [
    "$scope",
    "$rootScope",
    "$stateParams",
    "sharedProps", // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $rootScope, $stateParams, sharedProps) {
        $scope.sexOptions = [
            { name: "Female", id: 0 },
            { name: "Male", id: 1 },
            { name: "Other", id: 2 }
        ];
        $scope.user = $rootScope.activeUser;
        $scope.selectedSex = $scope.user.sex;
        $scope.user.birthday = new Date($scope.user.birthday);

        $scope.$on("$ionicView.beforeEnter", function() {
            if (sharedProps.getData("isNightmode") != undefined) {
                $scope.isNightmode = sharedProps.getData("isNightmode").value;
            }
            var f = sharedProps.getData("fontsize");
            if (f != undefined) {
                $scope.selectedFontsizeVal = f.value;
            } else {
                $scope.selectedFontsizeVal = 100;
            }
            console.log("fontsize: " + $scope.selectedFontsizeVal);

            $scope.fontsize = { 'font-size': $scope.selectedFontsizeVal + '%' }
        });

        $scope.getBackgroundClass = function() {
            return $scope.isNightmode ?
                "nightmodeBackground" :
                "lightmodeBackground";
        };

        $scope.getFontClass = function() {
            return $scope.isNightmode ? "nightmodeFontColor" : "normalBlackLetters";
        };
    }
])

.controller("signupCtrl", [
    "$scope",
    "$stateParams",
    "sharedProps",
    "UserService",
    "$window",
    "$state", // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams, sharedProps, UserService, $window, $state) {
        //$window.localStorage.clear();
        $scope.user = {};
        $scope.sexOptions = [{ name: "Female", id: 0 }, { name: "Male", id: 1 }, { name: "Other", id: 2 }];
        $scope.user.sex = 0;
        $scope.user.birthday = new Date();

        $scope.maxdate = new Date();

        $scope.register = function() {
            UserService.Create($scope.user).then(function(response) {
                if (response.success) {
                    console.log("signup successfull");
                    $state.go("login");
                } else {
                    console.log("signup unsuccessfull");
                }
                console.log($window.localStorage.users);
            });
        };
    }
])

.controller("loginCtrl", [
    "$scope",
    "$stateParams",
    "sharedProps",
    "$location",
    "AuthenticationService",
    "$state",
    "$window",
    "$ionicPopup", "$ionicActionSheet", "$timeout", // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function(
        $scope,
        $stateParams,
        sharedProps,
        $location,
        AuthenticationService,
        $state,
        $window,
        $ionicPopup, $ionicActionSheet, $timeout
    ) {
        function createUserSettings() {
            sharedProps.addData("isNightmode", false);
            sharedProps.addData("cachenewsEnabled", false);
            sharedProps.addData("fontsize", 100);
            //sharedProps.addData("subFontsize", 70);
            sharedProps.addData("markupEnabled", false);
            sharedProps.addData("hideEnabled", false);
            sharedProps.addData("tolerance", 50);
        }

        function showFailedToLoginPopup() {
            var promptAlert = $ionicPopup.show({
                title: "Error",
                template: '<span>Failed to login!</span>',
                buttons: [{
                    text: "OK",
                    type: "button-positive",
                    onTap: function(e) {}
                }]
            });
        };

        $scope.login = function() {
            AuthenticationService.Login(
                $scope.login.username,
                $scope.login.password,
                function(response) {
                    if (response.success) {
                        AuthenticationService.SetCredentials(
                            $scope.login.username,
                            $scope.login.password
                        );
                        createUserSettings();
                        $state.go("eyeReader.newsFeed");
                        console.log("login successfull");
                    } else {
                        showFailedToLoginPopup();
                        console.log("failed to login");
                    }
                }
            );
        };
    }
])

.controller("articleCtrl", [
    "$scope",
    "$stateParams",
    "sharedProps", // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams, sharedProps) {
        $scope.$on("$ionicView.beforeEnter", function() {
            if (sharedProps.getData("isNightmode") != undefined) {
                $scope.isNightmode = sharedProps.getData("isNightmode").value;
            }
            var f = sharedProps.getData("fontsize");
            console.log("fontsize article: " + f.value);
            if (f != undefined) {
                $scope.selectedFontsizeVal = f.value;
            } else {
                $scope.selectedFontsizeVal = 100;
            }

            $scope.fontsize = { 'font-size': ($scope.selectedFontsizeVal) + '%' }
        });

        $scope.article = $stateParams.article;

        $scope.getBackgroundClass = function() {
            return $scope.isNightmode ?
                "nightmodeBackground" :
                "lightmodeBackground";
        };

        $scope.getFontClass = function() {
            return $scope.isNightmode ? "nightmodeFontColor" : "normalBlackLetters";
        };

        $scope.getNightmodeHeaderClass = function() {
            return $scope.isNightmode ?
                "nightmodeHeaderClass" :
                "normalHeaderClass";
        };
    }
])

.controller("savedArticlesCtrl", [
    "$scope",
    "$stateParams",
    "sharedProps", // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams, sharedProps) {
        $scope.$on("$ionicView.beforeEnter", function() {
            if (sharedProps.getData("isNightmode") != undefined) {
                $scope.isNightmode = sharedProps.getData("isNightmode").value;
            }
            var f = sharedProps.getData("fontsize");
            if (f != undefined) {
                $scope.selectedFontsizeVal = f.value;
            } else {
                $scope.selectedFontsizeVal = 100;
            }
            console.log("fontsize: " + $scope.selectedFontsizeVal);

            $scope.fontsize = { 'font-size': $scope.selectedFontsizeVal + '%' }
            $scope.fontsizeSmaller = { 'font-size': ($scope.selectedFontsizeVal - 20) + '%' }
        });

        $scope.getBackgroundClass = function() {
            return $scope.isNightmode ?
                "nightmodeBackground" :
                "lightmodeBackground";
        };

        $scope.getFontClass = function() {
            return $scope.isNightmode ? "nightmodeFontColor" : "normalBlackLetters";
        };

        $scope.getNightmodeHeaderClass = function() {
            return $scope.isNightmode ?
                "nightmodeHeaderClass" :
                "normalHeaderClass";
        };
    }
])

.controller("statisticsCtrl", [
    "$scope",
    "$stateParams",
    "sharedProps", // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams, sharedProps) {
        $scope.$on("$ionicView.beforeEnter", function() {
            if (sharedProps.getData("isNightmode") != undefined) {
                $scope.isNightmode = sharedProps.getData("isNightmode").value;
            }
            var f = sharedProps.getData("fontsize");
            if (f != undefined) {
                $scope.selectedFontsizeVal = f.value;
            } else {
                $scope.selectedFontsizeVal = 100;
            }
            console.log("fontsize: " + $scope.selectedFontsizeVal);

            $scope.fontsize = { 'font-size': $scope.selectedFontsizeVal + '%' }
            $scope.fontsizeSmaller = { 'font-size': ($scope.selectedFontsizeVal - 20) + '%' }
        });

        $scope.getBackgroundClass = function() {
            return $scope.isNightmode ?
                "nightmodeBackground" :
                "lightmodeBackground";
        };

        $scope.getFontClass = function() {
            return $scope.isNightmode ? "nightmodeFontColor" : "normalBlackLetters";
        };

        $scope.getNightmodeHeaderClass = function() {
            return $scope.isNightmode ?
                "nightmodeHeaderClass" :
                "normalHeaderClass";
        };
    }
])

.controller("reportArticleCtrl", [
    "$scope",
    "$stateParams",
    "sharedProps", // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams, sharedProps) {
        $scope.$on("$ionicView.beforeEnter", function() {
            if (sharedProps.getData("isNightmode") != undefined) {
                $scope.isNightmode = sharedProps.getData("isNightmode").value;
            }
        });

        $scope.getBackgroundClass = function() {
            return $scope.isNightmode ?
                "nightmodeBackground" :
                "lightmodeBackground";
        };
    }
]);