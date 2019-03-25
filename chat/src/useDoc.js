import { useEffect, useState } from 'react';
import { db } from './firebase';

export default function useDoc(path) {
	console.log(path, 'path');

	const [doc, setDoc] = useState(null);
	useEffect(() => {
		console.log(path, 'path');
		return db.doc(path).onSnapshot(doc => {
			setDoc({
				...doc.data(),
				id: doc.id,
			});
		});
	}, [path]);
	return doc;
}
