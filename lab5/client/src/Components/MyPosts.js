import { useQuery } from '@apollo/client';
import React from 'react';
import ImageList from './ImageList';
import queries from '../queries';

function MyPosts() {
	const { loading, error, data } = useQuery(queries.GET_USERPOSTEDIMAGES, {
		fetchPolicy: 'cache-and-network',
	});
	return (
		<div>
			<ImageList
				loading={loading}
				error={error}
				data={data}
				uploadAPost={true}
				addToBin={true}
				deleteFromBin={true}
			/>
		</div>
	);
}

export default MyPosts;
