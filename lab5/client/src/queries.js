import { gql } from '@apollo/client';

const GET_UNSPLASHIMAGES = gql`
	query {
		unsplashImages(pageNum: 1) {
			_id
			url
			posterName
			description
			userPosted
			binned
		}
	}
`;

const GET_USERPOSTEDIMAGES = gql`
	query {
		userPostedImages {
			_id
			url
			posterName
			description
			userPosted
			binned
		}
	}
`;

const GET_BINNEDIMAGES = gql`
	query {
		binnedImages {
			_id
			url
			posterName
			description
			userPosted
			binned
		}
	}
`;

let exported = {
	GET_UNSPLASHIMAGES,
	GET_USERPOSTEDIMAGES,
	GET_BINNEDIMAGES,
};

export default exported;
