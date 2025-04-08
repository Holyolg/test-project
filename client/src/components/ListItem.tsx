import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';

interface Props {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
  onClick: (id: number) => void;
}

const ListItem: React.FC<Props> = ({ id, name, description, onClick, isActive }) => {
  return (
    <li className={isActive ? 'list-item active' : 'list-item'}>
      <div className={'list-item-actions'}>
                <span>ID: <b>{id}</b></span> 
                <Button onClick={onClick} id={id} disabled={isActive}>
                    {isActive ? 'Active' : 'Set Active'}
                </Button>
            </div>
       <Link to={`/${id}`}>  
            <span>{name}</span>
            <p className={'list-item__description'}>{description}</p>
        </Link>
    </li>
  );
};


export default ListItem;
