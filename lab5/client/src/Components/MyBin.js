import React from 'react';
import ImageList from './ImageList';

function MyBin() {
	return (
		<div>
			<ImageList binnedQuery={true} removeFromBin={true} />
		</div>
	);
}

export default MyBin;
