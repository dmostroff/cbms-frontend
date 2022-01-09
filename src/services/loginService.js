import api from "@/services/apiService"
import cs from '@/services/commonService'

function clearLocalStorage() {
  localStorage.removeItem('authorization');
  localStorage.removeItem('exp_date'); 
  localStorage.removeItem('user'); 
}

export default {
    async login(username, password) {
        this.clear_authorization_token();
        let login_info = { username: username, pwd: password }
        let resp = await api.postHttpRequest('onboard/login', login_info);
        const retval = cs.requestResponse( resp);
        if( retval.rc == 1 ) {
          this.store_authorization_token( resp);
          localStorage.setItem('username', retval.data.user_login.username); 
          localStorage.setItem('exp_date', retval.data.user_login.exp_date); 
          localStorage.setItem('user', JSON.stringify(retval.data.user)); 
        }
        return retval;
      },

      store_authorization_token( resp) {
        if ( 'headers' in resp && 'authorization' in resp.headers) {
          localStorage.setItem('authorization', resp.headers['authorization']); 
        }
      },

      clear_authorization_token() {
        localStorage.removeItem('authorization');

      },
      
      async logout() {
        let resp = await api.postHttpRequest('onboard/logout');
        const retval = cs.requestResponse( resp);
        clearLocalStorage();
        return retval;
      },

      isLoggedIn() {
        console.log(localStorage.getItem( 'username') );
        const cur_time = Date.parse(new Date().toISOString());
        const exp_date_text = localStorage.getItem( 'exp_date');
        let retval = false;
        if( exp_date_text) {
          const exp_date = Date.parse(exp_date_text);
          retval = ( localStorage.getItem( 'authorization') && ( exp_date > cur_time))
        }
        //console.log( retval, cur_time, exp_date)
        return retval
      },

      userName() {
        return localStorage.getItem( 'username');
      },

      clear() {
        clearLocalStorage();
      },
}
