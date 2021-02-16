// src/middleware/log.js
export default {
  log({ next, to }) {
    console.log(to.name);
  
    return next();
  }
}