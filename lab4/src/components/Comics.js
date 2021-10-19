import useAxios from './useAxios';
import '../App.css';

const comicsURL = '';

const Comics = (props) => {
	let { comicsData, loading } = useAxios(comicsURL);

	if (loading) {
		return (
			<div>
				<h2>Loading...</h2>
			</div>
		);
	} else {
		return (
			<div>
				<h2>This is Comics page and we got your comics data: {comicsData}</h2>
			</div>
		);
	}
};

export default Comics;
