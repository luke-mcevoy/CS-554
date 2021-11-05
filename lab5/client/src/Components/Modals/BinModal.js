import React, { useState } from 'react';

import '../App.css';
import ReactModal from 'react-modal';
import { useQuery, useMutation } from '@apollo/client';
//Import the file where my query constants are defined
import queries from '../../queries';

//For react-modal
ReactModal.setAppElement('#root');
const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
		width: '50%',
		border: '1px solid #28547a',
		borderRadius: '4px',
	},
};

function BinModal(props) {
	const [binImage] = useMutation(queries., {
		update(cache, { data: { addEmployee } }) {
			const { employees } = cache.readQuery({ query: queries.GET_EMPLOYEES });
			cache.writeQuery({
				query: queries.GET_EMPLOYEES,
				data: { employees: employees.concat([addEmployee]) },
			});
		},
	});
}

export default BinModal;
