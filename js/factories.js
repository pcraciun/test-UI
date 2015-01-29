'use strict';

app.factory('localStorage', function($http) {
    var localStorage = {};

    localStorage.updatePosts = function(posts) {
        localStorage.posts = posts;
        window.localStorage['posts'] = JSON.stringify(posts);
    };

    return localStorage;

});