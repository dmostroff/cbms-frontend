// this is temporary until we incorporate it into the back end
import api from '@/services/apiService'

const namedRoutes = [ 'arix', 'ptpe', 'merchants', 'transactions_recent', 'transactions-bydate', 'transactions-batchcheck', 'rs-submission-contact', 'transaction-batch-check-drag-and-drop'];
const role = {
    admin: namedRoutes,
    default: ["ptpe", "transactions-batchcheck", "rs-submission-contact", "transaction-batch-check-drag-and-drop"]
}
const user_grants = {
    dano: { grants: role.admin, startPage: "clients" },
    raphael: { grants: role.admin, startPage: "creditsummary" },
    default: { grants: role.admin, startPage: 'creditsummary'}
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