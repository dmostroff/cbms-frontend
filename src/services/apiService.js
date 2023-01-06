import axios from "axios";
import Router from "@/router"

const baseUrl = 'http://' + process.env.VUE_APP_BASE_URL;
console.log(baseUrl, process.env.NODE_ENV, process.env.VUE_APP_TITLE, process.env.VUE_APP_VERSION, process.env.VUE_APP_MODE)
export const AUTHORIZATION = "auctoritas"

function get_config(httpmethod) {
    let options = {
        method: httpmethod,
        headers: {
            // 'Content-Type': 'application/json',
            'Content-Type': "application/json; charset=utf-8",
        }
    }
    const auth_token = localStorage.getItem(AUTHORIZATION);
    if (auth_token) {
        options.headers[AUTHORIZATION] = auth_token;
    }
    return options;
}

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    if( 'rc' in response.data) {
        if (response.data.rc === -8 ) {
            console.log( 'EXPIRED TOKEN', Router.history.current.path, Router.history.current.name);
            if(Router.history.current.name !== "login") {
                Router.push( { name: 'login'});
            }
        } else if( AUTHORIZATION in response.headers) {
            localStorage.setItem(AUTHORIZATION, response.headers[AUTHORIZATION]); 
        }
    }
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });
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
                console.error(error.message);
                throw new Error(error.message)

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