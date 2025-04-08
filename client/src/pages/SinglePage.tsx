import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Item } from '../hooks/useData';



function SinglePage() {
  const { id } = useParams();
  const [item, setItem] = useState<Item | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await fetch(`${process.env.API_URL}/items/${id}`);
        
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        
        const data = await response.json();
        setItem(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        <Link to="/">Go Back</Link>
        <p>Error: {error}</p>
      </div>
    );
  }

  if (!item) {
    return (
      <div>
        <Link to="/">Go Back</Link>
        <p>Item not found</p>
      </div>
    );
  }

  return (
    <div className="detail">
        <Link to={'/'}>Go Back</Link>
      <h2>Item Details</h2>
      <p>ID: {item.id}</p>
      <p>Name: {item.name}</p>
      <p>Description: {item.description}</p>
    </div>
  );
}

export default SinglePage;
