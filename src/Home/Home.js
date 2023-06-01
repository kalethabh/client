import React, { useEffect } from 'react';
import Nav from '../Nav/Nav';
import Pagination from '../Pagination/Pagination';
import "../Home/Home.css"
import { useDispatch } from 'react-redux';
import { getPokemons } from '../redux/actions';

export default function Home() {
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getPokemons());
    }, [dispatch]);

    return(
        <div>
           <Nav/>
           <div className='pagination'>
                <Pagination/>
           </div>
        </div>
    )
};
