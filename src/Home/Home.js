import React from 'react';
import Nav from '../Nav/Nav';
import Pagination from '../Pagination/Pagination';
import "../Home/Home.css"

export default function Home() {
    return(
        <div>
           <Nav/>
           <div className='pagination'>
                <Pagination/>
           </div>
        </div>
    )
};
