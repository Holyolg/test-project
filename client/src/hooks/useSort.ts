import { useMemo, useState } from 'react';

type SortDirection = 'ASC' | 'DESC';

function useSort<T extends { id: number }>(
	items: T[]
  ): [T[], SortDirection, () => void] {
	const [sortBy, setSortBy] = useState<SortDirection>('ASC');
	
	const sortedItems = useMemo(() => {
		if (sortBy === 'ASC') {
			return [...items].sort((a, b) => b.id - a.id)
		}
		return items;
	}, [items, sortBy]);
	
	const handleSortClick = () => {
		setSortBy((prev) => (prev === 'ASC' ? 'DESC' : 'ASC'));
	}
	
	return [sortedItems, sortBy, handleSortClick]
}

export default useSort;
