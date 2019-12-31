import React from 'react';
import { Link } from 'react-router-dom';

//components
import MovieMarquee from '../components/MovieMarquee';


function Home() {
    return (
        <div className="home-container">
            <div className="white-side"></div>
            <div className="home-content">
                <Link to="/movies" className="title1">
                    <div className="text1">
                        <p>THIS WEEK'S</p>
                        <h1>MOVIE</h1>
                    </div>
                    <div className="text2">!</div>
                    <div className="text3">></div>
                </Link>
                <div className="title2">
                    <div className="text1">NOW SHOWING...</div>
                    <MovieMarquee />
                </div>
            </div>
        </div>
    )
}


export default Home;