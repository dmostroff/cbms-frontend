import api from "@/services/apiService"
import cs from '@/services/commonService'

function clearLocalStorage() {
  localStorage.removeItem(api.AUTHORIZATION);
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
          localStorage.setItem('username', retval.data.user.username);
          let user = retval.data.user;
          let d = new Date()
          d.setMinutes(d.getMinutes()+60)
          let exp_date = d.toISOString();
          if( retval.data.user_login){
            exp_date = retval.data.user_login.exp_date
          }
          localStorage.setItem('exp_date', exp_date); 
          localStorage.setItem('user', JSON.stringify(user)); 
        }
        return retval;
      },

      store_authorization_token( resp) {
        Object.keys(resp.headers).forEach( k => {
          localStorage.setItem( k, resp.headers[k]);
        });
        localStorage.setItem(api.AUTHORIZATION, resp.headers[api.AUTHORIZATION]); 
        // if ( 'headers' in resp && api.AUTHORIZATION in resp.headers) {
        //   localStorage.setItem(api.AUTHORIZATION, resp.headers[api.AUTHORIZATION]); 
        // }
      },

      clear_authorization_token() {
        localStorage.removeItem(api.AUTHORIZATION);

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
          retval = ( localStorage.getItem( api.AUTHORIZATION) && ( exp_date > cur_time))
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
