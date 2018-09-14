import axios from 'axios';

var api = {
    fetchPopularRepos: function (lang) {
        var encodedURI = window.encodeURI("http://api.github.com/search/repositories?q=stars:>1+language:" + lang + "&sort=stars&order=desc&type=Repositories");
        return axios.get(encodedURI).then(function (result) {
                return result.data.items
            }
        );
    }
};

export default api;