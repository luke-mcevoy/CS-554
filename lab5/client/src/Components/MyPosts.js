import React from 'react';
import ImageList from './ImageList';

function MyPosts() {
	return (
		<div>
			<ImageList uploadAPost={true} addToBin={true} deleteFromBin={true} />
		</div>
	);
}

export default MyPosts;
