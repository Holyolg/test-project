import React, { useCallback, useMemo, useState,  } from 'react';
import { ListItem, SubTitle, VirtualList } from '../components';
import { useData, useSort, useDebounce } from '../hooks';

const ListPage: React.FC = () => {
    const {items, loading, error} = useData();
    const [sortedItems, sortBy, handleSortClick] = useSort(items);
    
    const [activeItemId, setActiveItemId] = useState<number | null>(null);
    const [query, setQuery] = useState<string>('');
    
    const debouncedQuery = useDebounce(query, 200);

    const handleItemClick = useCallback((id: number | null) => {
        setActiveItemId(id);
    }, []);
    
    const handleQueryChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    }, []);

    const filteredItems = useMemo(() => {
        if (!debouncedQuery) return sortedItems;
    
        const safeQuery = query.toLowerCase();
        return sortedItems.filter((item) =>
          `${item.id}`.toLowerCase().includes(safeQuery)
        );
      }, [sortedItems, query]);

  return (
    <div className="list-wrapper">
        <div className="list-header">
            <h1 className="list-title">Items List</h1>
            <SubTitle>{activeItemId ?? 'Empty'}</SubTitle>
            <button onClick={handleSortClick}>Sort ({sortBy === 'ASC' ? 'ASC' : 'DESC'})</button>
            <input type="number" placeholder={'Filter by ID'} value={query} onChange={handleQueryChange} />
        </div>
        <div className="list-container">
        <ul className="list">
          {loading && <span>Loading...</span>}
          {error && <span className="error">Error: {error}</span>}
          {!loading && !error && filteredItems.length === 0 && <span>No results</span>}
          <VirtualList
  items={filteredItems}
  itemHeight={150}
  renderItem={(item) => (
    <ListItem
      key={item.id}
      id={item.id}
      name={item.name}
      description={item.description}
      isActive={item.id === activeItemId}
      onClick={handleItemClick}
    />
  )}
/>
        </ul>
      </div>
    </div>
  );
};

export default ListPage;
