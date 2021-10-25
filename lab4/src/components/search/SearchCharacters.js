import React from 'react';

const SearchCharacters = (props) => {
	const handleChanges = (e) => {
		props.searchValue(e.targets.value);
	};
	return (
		<form
			method="POST"
			onSubmit={(e) => {
				e.preventDefault();
			}}
			name="formName"
			className="center"
		>
			<label>
				<span>Search Characters:</span>
				<input
					autoComplete="off"
					type="text"
					name="searchTerm"
					onChange={handleChanges}
				/>
			</label>
		</form>
	);
};

export default SearchCharacters;
