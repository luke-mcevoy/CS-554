import React from 'react';
import ImageList from './ImageList';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

function MyPosts() {
	return (
		<div>
			{/* <button>Upload a Post</button> */}
			<button>
				<Link to="/new-posts">Upload a Post</Link>
			</button>
			<ImageList />
		</div>
	);
}

export default MyPosts;
