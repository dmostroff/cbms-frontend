var CryptoJS = require( 'crypto-js');
var AES = require("crypto-js/aes");
var SHA256 = require("crypto-js/sha256");
/// console.log(SHA256("Message"));
let key = 'my key'
let c = AES.encrypt( 'tree tops', key).toString()
console.log( c)
let d = AES.decrypt( c, key)
var originalText = d.toString(CryptoJS.enc.Utf8);
console.log(originalText)
