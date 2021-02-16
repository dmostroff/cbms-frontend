import api from "@/services/apiService"
import cs from '@/services/commonService'

export default {
    
    /* auth role */
    async getAuthRoles() {
        let resp = await api.getHttpRequest('/auth/roles');
        return cs.requestResponse( resp);
    },

    async getAuthRoleById( id) {
        let resp = await api.getHttpRequest('/auth/role/'+id);
        return cs.requestResponse( resp);
    },

    async postAuthRole( postData) {
        let formData = cs.getFormData( postData)
        let resp = await api.postHttpRequest('/auth/role', formData);
        return cs.requestResponse( resp);
    },
    
    async getAuthUserRole() {
        let resp = await api.getHttpRequest('/auth/user_role');
        return cs.requestResponse( resp);
    },

    async getAuthUserRoleByAuthId( auth_id) {
        let resp = await api.getHttpRequest('/auth/'+auth_id+'auth_user_role');
        return cs.requestResponse( resp);
    },

    async getAuthUserRoleById( id) {
        let resp = await api.getHttpRequest('/auth/user_role/'+id);
        return cs.requestResponse( resp);
    },

    async postAuthUserRole( postData) {
        let formData = cs.getFormData( postData)
        let resp = await api.postHttpRequest('/auth/user_role', formData);
        return cs.requestResponse( resp);
    },
    
    /* auth permission */
    async getAuthPermissions() {
        let resp = await api.getHttpRequest('/auth/permissions');
        return cs.requestResponse( resp);
    },

    async getAuthPermissionById( id) {
        let resp = await api.getHttpRequest('/auth/permission/'+id);
        return cs.requestResponse( resp);
    },

    async postAuthPermission( postData) {
        let formData = cs.getFormData( postData)
        let resp = await api.postHttpRequest('/auth/permission', formData);
        return cs.requestResponse( resp);
    },
    
    /* auth users */
    async getAuthUsers() {
        let resp = await api.getHttpRequest('/auth/users');
        return cs.requestResponse( resp);
    },

    async getAuthUserById( id) {
        let resp = await api.getHttpRequest('/auth/user/'+id);
        return cs.requestResponse( resp);
    },

    async postAuthUser( postData) {
        let formData = cs.getFormData( postData)
        let resp = await api.postHttpRequest('/auth/user', formData);
        return cs.requestResponse( resp);
    },
    
    async getAuthRolePermission() {
        let resp = await api.getHttpRequest('/auth/role_permission');
        return cs.requestResponse( resp);
    },

    async getAuthRolePermissionByAuthId( auth_id) {
        let resp = await api.getHttpRequest('/auth/'+auth_id+'role_permission');
        return cs.requestResponse( resp);
    },

    async getAuthRolePermissionById( id) {
        let resp = await api.getHttpRequest('/auth/role_permission/'+id);
        return cs.requestResponse( resp);
    },

    async postAuthRolePermission( postData) {
        let formData = cs.getFormData( postData)
        let resp = await api.postHttpRequest('/auth/role_permission', formData);
        return cs.requestResponse( resp);
    },
    
}