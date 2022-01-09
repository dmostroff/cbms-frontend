export default {
  auth({ next, router }) {
    if (!localStorage.getItem('authorization')) {
      return router.push({ name: 'login' });
    }
  
    return next();
  }
}
