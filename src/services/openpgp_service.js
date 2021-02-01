
var openpgp = require('openpgp');

var options = {
    numBits: 1024,
    userId: 'user@localhost',
    passphrase: 'password'
};

const pubkey = `-----BEGIN PGP PUBLIC KEY BLOCK-----

mQENBGAKpCIBCACbcKEoV6Jy2+mjKeGhTrD6E2maoHx+5wutTyTEWDimcQ3/sq0c
itVUzBAz+RPgMsO7iV8gr8XF5wR39tptgIG0D+4D19OFGpiuk5ktEA6kaOYGgfAr
ORQ1HMeFe9klvzvbeXOpws3Z9STbYkZFCKfm6eX6UJVyMhVpw7o3tE4KnP8DEdkI
ZSfuQm2vHJU7WWfKwHmrJcQAdLCbULDduhhbz8jCj0g22bhW90LZCbh8CPgO6idX
4u2WLm/t3KwkUn5JATFieF+zVKwqOARm6Onn1p0TyGJSixddRzHpJOrcUSo5Q8nU
tjQNUUpJHGlknFOfSZNI5EubLGb7okKlJrszABEBAAG0IW9zdHJvZmZlbnQgPG9z
dHJvZmZlbnRAZ21haWwuY29tPokBVAQTAQgAPhYhBP7BO3Asrnb0fgL7fOQUa8US
uxOUBQJgCqQiAhsDBQkDwmcABQsJCAcCBhUKCQgLAgQWAgMBAh4BAheAAAoJEOQU
a8USuxOUV8wH/R8PkvQTZLG8Nb/e26SUCcbi8aY2iDvKT9po4Cd3LB541G5l+7LS
yJ0fmNZJ4ARHM2y6SeWrogocmB1v8FHcmQqHQSVe4z8Bp13M4gebpGyJF0DiPMu4
bjMwIf6dDy0qMLxFpv3o/kQt4YWcdyQkQVs+9zHZXNGoj5k7p0GXDiYJd/iIkefZ
pfCetD++vda9qeX+RiUFuPM5cbIU9E6VGcivzz4e3zKbcvhJe1OTVjASb2knXhPY
bd+/QoFBUqlpiOBoyRjN/GKb/l/6e+OHq9ZVump+9lIK3sWDEn0nbHW3RKtfwHWc
pQNFBdnlVv+0mD1uY6rmfhaTa7vqEP1TU8W5AQ0EYAqkIgEIAPA7aaELqqW+wsDO
ptwZDz+KDsF209F3cxxXDd50QTyXqEE6R9KAknow8CWiFjKIh+AB6HxnBHySOerw
ttuN6vIWu1fid3uMVxtNXJxjb5vKcq+aA509f2n/mr5qRpxDFqnHWiV8PObncee/
O4yjYkGqDCMAgqSyCiOryxaOF+zWQjdWcqbd9KPMeTMs6c+TLHQiIUENErAZjTxc
uASngZ0LPuI4CKeTklNM3Ju5c8cqHGeS/yF0bKnGFyL+CTtCntI7JWUf3PMkWYEw
0/25cANKBB9LcQG6FkOz6BxUGF/7/BA1VYnihwpEVK2FbGaXWGMzxdICEhduLK96
WCSzMgsAEQEAAYkBPAQYAQgAJhYhBP7BO3Asrnb0fgL7fOQUa8USuxOUBQJgCqQi
AhsMBQkDwmcAAAoJEOQUa8USuxOUt2UH/3TO2wbSdMdgARDQYP8WRWB67U759f/m
SV03J4ZOUG6G3t1408fwJ0vsS2jJQ24U4k0bfTeJOKz92JDi/3NoAQ1kWYfTY8ha
YdItDJli979oebe+TItH65qC8THo+5w5fN4QYHhptqjlkAFkv/Pj5kxCKpJVD14t
EnxOTJrXej78bsIkGb9aAxo3WblBmeGrlnCOkwh3tZn/YaIGWSZWylo+d390HYWr
jwTomdarIlUBiSrm1rHAhWvRT9WeHDZ9SpI+Sf/dP95+mA4YCmKtGOOhV1KTzHRy
EuxKGC8R+0wxpUODCh+q9Le4odddcU1JcvsD2S3t9pSZv0ypXfoB10c=
=zF8K
-----END PGP PUBLIC KEY BLOCK-----`
const privkey = `
`

const encryptDecryptFunction = async() => {
    const privKeyObj = (await openpgp.key.readArmored(privkey)).keys[0]
    await privKeyObj.decrypt(passphrase)

    const options = {
        message: openpgp.message.fromText('Hello, World!'),       // input as Message object
        publicKeys: (await openpgp.key.readArmored(pubkey)).keys, // for encryption
        privateKeys: [privKeyObj]                                 // for signing (optional)
    }

    openpgp.encrypt(options).then(ciphertext => {
        encrypted = ciphertext.data // '-----BEGIN PGP MESSAGE ... END PGP MESSAGE-----'
        return encrypted
    })
    .then(encrypted => {
        const options = {
            message: await openpgp.message.readArmored(encrypted),    // parse armored message
            publicKeys: (await openpgp.key.readArmored(pubkey)).keys, // for verification (optional)
            privateKeys: [privKeyObj]                                 // for decryption
        }

        openpgp.decrypt(options).then(plaintext => {
            console.log(plaintext.data)
            return plaintext.data // 'Hello, World!'
        })

    })
}

encryptDecryptFunction()
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