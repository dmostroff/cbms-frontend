import api from "@/services/apiService"
import cs from '@/services/commonService'

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
        localStorage.removeItem('jwt');
        const retval = cs.requestResponse( resp);
        return retval;
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
