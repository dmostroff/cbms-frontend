var openpgp = require('openpgp');

var options = {
    numBits: 1024,
    userId: 'user@localhost',
    passphrase: 'password'
};

openpgp.generateKeyPair(options).then(function(keypair) {

    var privkey = keypair.privateKeyArmored;
    var pubkey = keypair.publicKeyArmored;

    console.log("Pub key" + pubkey + "\n\n");

    var publicKey = openpgp.key.readArmored(pubkey);
    var pgpMessage = openpgp.encryptMessage(publicKey.keys,"Hello");

    console.log("Encrypted Message" + pgpMessage + "\n\n");

    }).catch(function(error) {
    // failure
    console.log("Error: " + error);
});