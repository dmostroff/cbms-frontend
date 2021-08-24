import axios from "axios";

const baseUrl = 'http://' + process.env.VUE_APP_BASE_URL;
console.log(baseUrl, process.env.NODE_ENV, process.env.VUE_APP_TITLE, process.env.VUE_APP_VERSION, process.env.VUE_APP_MODE)

function get_config(httpmethod) {
    let options = {
        method: httpmethod,
        headers: {
            'Content-Type': 'application/json',
        }
    }
    let jwt = localStorage.getItem('jwt');
    if (jwt) {
        options.headers['Authorization'] = `Bearer ${jwt}`;
    }
    return options;
}

// const options = {
//     method: 'post',
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem('jwt')}`,
//     }
//   };

export default {
    getHttpRequest: (url) => {
        let fullUrl = `${baseUrl}/${url}`;
        let config = get_config('get');
        return axios.get(fullUrl, config)
            .then(function (response) {
                // handle success
                return response;
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            });
    },

    postHttpRequest(url, formdata) {
        let fullUrl = `${baseUrl}/${url}`;
        let config = get_config('put');
        return axios.post(fullUrl, formdata, config)
            .then((response) => {
                // handle success
                return response;
            })
            .catch((error) => {
                // handle error
                console.log(error);
            })
            .finally(() => {
                // always executed
            });
    },

    deleteHttpRequest(url, formdata=null) {
        let fullUrl = `${baseUrl}/${url}`;
        let config = get_config('delete');
        return axios.delete(fullUrl, formdata, config)
            .then((response) => {
                // handle success
                return response;
            })
            .catch((error) => {
                // handle error
                console.log(error);
            })
            .finally(() => {
                // always executed
            });
    },

}