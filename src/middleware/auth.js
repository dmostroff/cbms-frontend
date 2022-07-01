export default {
  auth({ next, router }) {
    if (!localStorage.getItem('authorization')) {
      console.log('Authorization', this.$route.path);
      console.log(this.$router.currentRoute)
      if( router.currentRoute.name !== 'login') {
        return router.push({ name: 'login' });
      }
    }
    return next();
  }
}
