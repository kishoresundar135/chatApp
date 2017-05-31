angular.module('chatApp', ['ui.router'])

    .config([
        '$stateProvider',
        '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {

            $stateProvider
                .state('home', {
                    url: '/home',
                    templateUrl: '/home.html',
                    controller: 'MainCtrl',
                    resolve: {
                        postPromise: ['posts', function(posts) {
                            return posts.getAll();
                        }]
                    }
                })

            $urlRouterProvider.otherwise('home');
        }
    ])

    // Main controller
    .controller('MainCtrl', [
        '$scope',
        'posts',
        function($scope, posts){

            $scope.posts = posts.posts;
            $scope.addPost = function() {

                if ($scope.msg === '') { return; }
                posts.create({

                    msg: $scope.msg,
                    timestamp: Date(),
                });
                $scope.msg = '';
                posts.getAll();
                //$scope.link = '';
            };

            $scope.deletePost = function() {
                posts.delete();
            }

        }])


    // Angular service
    .factory('posts', ['$http', function($http){

        var o = {
            posts: []
        };

        o.getAll = function() {
            return $http.get('/posts').success(function(data) {
                angular.copy(data, o.posts);
            });
        };

        o.create = function(post) {
            return $http.post('/posts', post).success(function(data) {
                o.posts.push(data);
            });
        };

        o.delete = function() {
            return $http.delete('/posts/').success(function(data) {
                angular.copy(data, o.posts);
            });
        }

        return o;
    }])
