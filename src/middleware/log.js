// src/middleware/log.js
export default {
  log({ next, to }) {
    console.log('Log', to.name);
  
    return next();
  }
}