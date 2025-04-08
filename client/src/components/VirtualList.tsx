import React, { useRef, useState, useEffect, useCallback } from 'react';

interface Props<T> {
  items: T[];
  itemHeight?: number;
  buffer?: number;
  renderItem: (item: T, index: number) => React.ReactNode;
}

export const VirtualList = <T,>({
  items,
  itemHeight = 500,
  buffer = 5,
  renderItem,
}: Props<T>): JSX.Element => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => setWindowHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalHeight = items.length * itemHeight;
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - buffer);
  const visibleCount = Math.ceil(windowHeight / itemHeight) + 2 * buffer;
  const endIndex = Math.min(items.length, startIndex + visibleCount);
  const visibleItems = items.slice(startIndex, endIndex);

  const handleScroll = useCallback(() => {
    const scroll = containerRef.current?.scrollTop || 0;
    setScrollTop(scroll);
  }, []);

  useEffect(() => {
    const ref = containerRef.current;
    if (ref) ref.addEventListener('scroll', handleScroll);
    return () => ref?.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div className="virtual-list"
      ref={containerRef}
      style={{ overflowY: 'auto', height: windowHeight, position: 'relative' }}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        {visibleItems.map((item, i) => {
          const index = startIndex + i;
          return (
            <div
              key={index}
              style={{
                position: 'absolute',
                top: index * itemHeight,
                height: itemHeight,
                width: '100%',
              }}
            >
              {renderItem(item, index)}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default VirtualList;