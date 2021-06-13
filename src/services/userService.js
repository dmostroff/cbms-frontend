// this is temporary until we incorporate it into the back end
import api from '@/services/apiService'

const namedRoutes = [ 'home', 'about'];
const adminRoutes = [' adminhome', 'authusers', 'cc-companies', 'cc-cards']
const clientRoutes = [ 'client', 'creditsummary']
const role = {
    admin: namedRoutes.concat(adminRoutes).concat(clientRoutes),
    user: namedRoutes.concat(clientRoutes),
    default: namedRoutes.concat(clientRoutes)
}
const user_grants = {
    dano: { grants: role.admin, startPage: "creditsummary" },
    raphael: { grants: role.admin, startPage: "creditsummary" },
    tzivia: { grants: role.user, startPage: "creditsummary" },
    default: { grants: role.default, startPage: 'creditsummary'}
}


export default {
    postLogin: (credentials) => {
        let formData = new FormData()
        formData.append( "username", credentials['username']);
        formData.append( "password", credentials['password']);
        return api.postHttpRequest('login', formData);
    },
    canAccess: ( item ) => {
        // let username = localStorage.getItem('username') || 'default';
        return item || true // user_grants[username].grants.includes(item);
    },
    defaultPage: () => {
        let username = localStorage.getItem('username') || 'default';
        let startPage = (username in user_grants) ? user_grants[username].startPage : user_grants.default.startPage;
        return startPage;
    }
}