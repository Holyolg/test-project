import { useEffect, useState, useRef  } from 'react';

export interface Item {
	id: number;
	name: string;
	description: string;	
}

interface useDataResult {
	items: Item[];
	loading: boolean;
	error: string | null;
}

function useData(): useDataResult {
	const [items, setItems] = useState<Item[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const isMounted = useRef(true);

	const fetchItems = async() => {
		try {
			setLoading(true);
			setError(null);
			const res = await fetch(`${process.env.API_URL}/items`)
			const data: Item[] = await res.json();
			
			if (isMounted.current) {
				setItems(data);
			}
		} catch (error) {
			setError(error.message ?? 'An error occurred while fetching items');
			console.error('Failed to fetch items', error);
		} finally {
			setLoading(false);	
		}
	}
	
	useEffect(() => {
		fetchItems();
		const interval = setInterval(fetchItems, 10000);

		return () => clearInterval(interval); 
	}, []);
	
	return {items, loading, error};
}

export default useData;
