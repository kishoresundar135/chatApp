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
                    link: $scope.link,
                });
                $scope.msg = '';
                $scope.link = '';
            };

            $scope.deletePost = function(post) {
                posts.delete(post);
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
      
        o.delete = function(post) {
            return $http.delete('/posts/' + post._id).success(function(data) {
                angular.copy(data, o.posts);
            });
        }

        return o;
    }])
