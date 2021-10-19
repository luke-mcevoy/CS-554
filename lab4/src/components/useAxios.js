import { useEffect, useState } from 'react';
import axios from 'axios';

const md5 = require('blueimp-md5');
const publickey = '3c595077cf2e884efee1655fdbbd3e56';
const privatekey = 'f030b6590489ed73c2de64024dec779077d67597';
const ts = new Date().getTime();
const stringToHash = ts + privatekey + publickey;
const hash = md5(stringToHash);

const useAxios = (baseUrl) => {
	const url = baseUrl + '?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;
	const [state, setState] = useState({ data: null, loading: true });

	useEffect(() => {
		axios.get(url).then(({ data }) => {
			setState({ data: data, loading: false });
		});
	}, [url, setState]);

	return state;
};

export default useAxios;
