import { db } from './firebase';
import { useEffect, useState } from 'react';

export default function useCollection(path, orderBy) {
	const [docs, setDocs] = useState([]);
	useEffect(() => {
		let collection = db.collection(path);
		if (orderBy) {
			collection = collection.orderBy(orderBy);
		}
		// .doc('general')
		// .collection('messages')
		// .limit(5)
		return collection.onSnapshot(snapshot => {
			const docs = [];
			snapshot.forEach(doc => {
				docs.push({
					...doc.data(),
					id: doc.id,
				});
			});
			setDocs(docs);
		});
	}, [path, orderBy]);
	return docs;
}
