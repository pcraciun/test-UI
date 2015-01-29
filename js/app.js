'use strict';
var app = angular.module('app', []);

/* Controllers */
app.controller('postsController', ['$scope', '$http', '$window', 'localStorage',
    function($scope, $http, $window, localStorage) {

        $scope.articles = [];
        $scope.newPost = {};
        $scope.newPostForm = {};

        $scope.posts = JSON.parse(window.localStorage.getItem('posts')) || [];
        if ($scope.posts.length == 0) {


            $http.get("json/posts.json", {})
                .success(function (data) {
                    localStorage.updatePosts(data);
                    $scope.articles = data;
                })
                .error(function (data, status) {
                    console.log("Error loading posts: " + status);
                });
        } else {
            $scope.articles = $scope.posts;
        }

        $scope.removeArticle = function(index) {
            $scope.articles.splice(index,1);
            $scope.$apply();
            localStorage.updatePosts($scope.articles);
        };


        $scope.addArticle = function(post) {
            var id = getMaxId($scope.articles) + 1;

            var arr = post.tags.split(',');
            var tags = arr.sort().reduce(function(arr, el){
                if(!arr.length || arr.length && arr[arr.length - 1] != el) {
                    arr.push(el);
                }
                return arr;
            }, []);

            var newPost = {};
            newPost.id = id;
            newPost.title = post.title;
            newPost.body = post.body;
            newPost.tags = tags;

            $scope.articles.push(newPost);
            localStorage.updatePosts($scope.articles);
//            $scope.$apply();
            $scope.newPost = {};
        };

        function getMaxId(articles) {
            var maxId = 0;
            for (var i = 0; i < articles.length; i++) {
                if (articles[i].id > maxId) {
                    maxId = articles[i].id;
                }
            }
            return maxId;
        }

    }
]);


/*


window.onbeforeunload  = function() {
    localStorage.removeItem('posts');
    return '';
};


*/
