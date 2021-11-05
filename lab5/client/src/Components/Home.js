import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import ImageList from './ImageList';
import queries from '../queries';

function Home() {
	return (
		<div>
			<ImageList />
		</div>
	);
}

export default Home;
