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

const GET_UNSPLASHIMAGES_PAGE = gql`
	query unsplashImagesPage($pageNum: Int!) {
		unsplashImages(pageNum: $pageNum) {
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

const UPLOAD_USERPOSTEDIMAGE = gql`
	mutation uploadUserImage(
		$url: String!
		$description: String
		$posterName: String
	) {
		uploadImage(url: $url, description: $description, posterName: $posterName) {
			_id
			url
			description
			posterName
		}
	}
`;

const DELETE_BINNEDIMAGE = gql`
	mutation deleteBinnedImage($_id: String!) {
		deleteImage(_id: $_id) {
			_id
		}
	}
`;

// const UPDATE_IMAGE = gql`
// 	mutation updateImage(
// 		$_id: String!
// 		$url: String
// 		$posterName: String
// 		$description: String
// 		$userPosted: Boolean
// 		$binned: Boolean
// 	) {
// 		updateImage(
// 			_id: $id
// 			url: $url
// 			binned: $binned
// 			posterName: $posterName
// 			description: $description
// 			userPosted: $userPosted
// 		) {
// 			_id
// 		}
// 	}
// `;

let exported = {
	GET_UNSPLASHIMAGES,
	GET_USERPOSTEDIMAGES,
	GET_BINNEDIMAGES,
	UPLOAD_USERPOSTEDIMAGE,
	DELETE_BINNEDIMAGE,
	// UPDATE_IMAGE,
};

export default exported;
