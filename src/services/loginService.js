import api from "@/services/apiService"
import cs from '@/services/commonService'

function clearLocalStorage() {
  localStorage.removeItem('jwt');
  localStorage.removeItem('exp_date'); 
  localStorage.removeItem('user'); 
}

export default {
    async login(username, password) {
        let login_info = { username: username, pwd: password }
        let resp = await api.postHttpRequest('onboard/login', login_info);
        const retval = cs.requestResponse( resp);
        if( retval.rc == 1 ) {
            localStorage.setItem('username', retval.data.user_login.username); 
            localStorage.setItem('jwt', retval.data.user_login.token); 
            localStorage.setItem('exp_date', retval.data.user_login.exp_date); 
            localStorage.setItem('user', JSON.stringify(retval.data.user)); 
        }
        // const response = await fetch('/login_without_cookies', {method: 'post'});
        // const result = await response.json();
        // localStorage.setItem('jwt', result.access_token);
        return retval;
      },
      
      
      async logout() {
        let resp = await api.postHttpRequest('onboard/logout');
        const retval = cs.requestResponse( resp);
        clearLocalStorage();
        return retval;
      },

      isLoggedIn() {
        console.log(localStorage.getItem( 'username') )
        const cur_time = Date.parse(new Date().toISOString())
        const exp_date = Date.parse(localStorage.getItem( 'exp_date'));
        const retval = ( localStorage.getItem( 'jwt') && ( exp_date > cur_time))
        //console.log( retval, cur_time, exp_date)
        return retval
      },

      userName() {
        return localStorage.getItem( 'username');
      },

      clear() {
        clearLocalStorage();
      },
    //   async function makeRequestWithJWT() {
    //     const options = {
    //       method: 'post',
    //       headers: {
    //         Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    //       }
    //     };
    //     const response = await fetch('/protected', options);
    //     const result = await response.json();
    //     return result;
    //   }
}
