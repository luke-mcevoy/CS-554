import { useQuery } from '@apollo/client';
import React from 'react';
import ImageList from './ImageList';
import queries from '../queries';

function Home() {
	return (
		<div>
			<ImageList getMorePictures={true} addToBin={true} />
		</div>
	);
}

export default Home;
