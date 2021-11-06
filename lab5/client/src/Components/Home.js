import { useQuery } from '@apollo/client';
import React from 'react';
import ImageList from './ImageList';
import queries from '../queries';

function Home() {
	const { loading, error, data } = useQuery(queries.GET_UNSPLASHIMAGES, {
		fetchPolicy: 'cache-and-network',
	});
	return (
		<div>
			<ImageList
				loading={loading}
				error={error}
				data={data}
				getMorePictures={true}
				addToBin={true}
			/>
		</div>
	);
}

export default Home;
