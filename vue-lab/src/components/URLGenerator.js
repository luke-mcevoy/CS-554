const md5 = require('blueimp-md5');
const publickey = '3c595077cf2e884efee1655fdbbd3e56';
const privatekey = 'f030b6590489ed73c2de64024dec779077d67597';
const ts = new Date().getTime();
const stringToHash = ts + privatekey + publickey;
const hash = md5(stringToHash);

const URLGenerator = (baseUrl) => {
	const url = baseUrl + '?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;
	return url;
};

export default URLGenerator;
