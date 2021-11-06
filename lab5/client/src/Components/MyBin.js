import { useQuery } from '@apollo/client';
import React from 'react';
import ImageList from './ImageList';
import queries from '../queries';

function MyBin() {
	const { loading, error, data } = useQuery(queries.GET_BINNEDIMAGES, {
		fetchPolicy: 'cache-and-network',
	});
	console.log('binned images: ', data);
	return (
		<div>
			<ImageList
				loading={loading}
				error={error}
				data={data}
				binnedQuery={true}
				removeFromBin={true}
			/>
		</div>
	);
}

export default MyBin;
