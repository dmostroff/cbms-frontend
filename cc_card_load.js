filename = 'C:\\Projects\\cbms\\db\\credit_cards.csv'
var CryptoJS = require( 'crypto-js');
var AES = require("crypto-js/aes");
//var SHA256 = require("crypto-js/sha256")
/// console.log(SHA256("Message"));
let VUE_APP_CRYPT_KEY='HrVGW3kWHe58z02SoouJ3BgVcPPg5RBy3fRP'
let key = VUE_APP_CRYPT_KEY

// let d = AES.decrypt( c, key)
// var originalText = d.toString(CryptoJS.enc.Utf8);
// console.log(originalText)// fs.open( filename, 'r', (err, fd) => {
// 	if( err) {
// 		console.log(err);
// 		//throw err;
// 	}

// 	var t = fs.readFileSync( fd);
    
//     console.log('234')
// 	console.log(t);
// });

function quoteit(a) { return "'"+a+"'"; }

var lineReader = require('readline').createInterface({
	input: require('fs').createReadStream(filename)
  });
  
  let ii = 0
  lineReader.on('line', function (line) {
	  vals = line.split('\t')
	  if ( ii === 0) {
		  cols = vals;
	  } else {
		datavals = {}
		cols.forEach( (col,ii) => datavals[col] = vals[ii])
		let first_name = datavals['card_holder'].split(' ')[1]
		let last_name = datavals['card_holder'].split(' ')[0]
		let account_info = AES.encrypt([datavals['cc_number'], datavals['cc_exp'], datavals['cvv'], datavals['pin']].join('\t'), key).toString()
		let login = AES.encrypt( [datavals['cc_login'], datavals['cc_pwd']].join('\t'), key).toString()
		let credit_limit = datavals['credit_limit'].replace('$', '').replace(',','')
		if( credit_limit === '') { credit_limit = 'null'}
		let last_checked = (datavals['last_checked'].trim() === '---' || datavals['last_checked'] === '' ) ? 'null' : quoteit(datavals['last_checked'])
		let last_charge = (datavals['last_charge'].trim() === '---' || datavals['last_charge'] === '' ) ? 'null' : quoteit(datavals['last_charge'])
		indata = [
			quoteit(first_name)
			, quoteit(last_name)
			, quoteit(datavals['company'])
			, quoteit(datavals['card_name'])
			, quoteit('1900-01-01')
			, quoteit(account_info)
			, quoteit(login)
			, quoteit('OPEN')
			, credit_limit
			, last_checked
			, last_charge
		].join( ",")
		let sql = 'SELECT client.f_cc_account_insert('+indata+');'
		console.log( sql)
	  }
	  ii++
  });