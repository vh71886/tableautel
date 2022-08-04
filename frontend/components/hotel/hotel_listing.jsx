import React from 'react';
import { Link } from "react-router-dom";
import { TiHeartFullOutline } from 'react-icons/ti'
import { useEffect } from 'react';
import { createFavorite, deleteFavorite } from '../../util/favorite_api_util';
import { receiveFavorite, removeFavorite } from '../../actions/favorite_actions';

const HotelListing = props => {
    const { hotel, current_user } = props || {}; 

    useEffect( () => {
        debugger
    }, [hotel.currentUserFav])

    const removeFavoriteHotel = async () => {
        await deleteFavorite(hotel.favoriteId);
        dispatch(removeFavorite(hotel.favoriteId))
        hotel.currentUserFav = false;
    }

    const addFavoriteHotel = async () => {
        let favorite = {
            favoriter_id: current_user,
            favorited_id: hotel.id
        }

        await createFavorite(favorite);
        dispatch(receiveFavorite(favorite));
        hotel.currentUserFav = true;
    }

    const favoriteIcon = hotel.currentUserFav ? (
        <TiHeartFullOutline className='hotel-favorited-icon' onClick={removeFavoriteHotel} />
    ) : (
        <TiHeartFullOutline className='hotel-unfavorited-icon' onClick={addFavoriteHotel} />
    );

    return (
        <section className='hotel-listing-description'>
            <Link to={`/hotels/${hotel.id}`} >
                <img src={hotel.img1}
                    width='160px'
                    height='160px'
                />
                {/* <img src={hotel.img2} width='160px' height='160px' /> */}
                {/* <div id='hotel-card-1'></div> */}
                {/* <div id='hotel-card-2'></div> */}
            </Link>
            <li className='hotel-listing-item'>
                <Link to={`/hotels/${hotel.id}`} 
                    className='hotel-listing-name'>
                        {hotel.name}
                </Link>
                <p>{hotel.city}, {hotel.country}</p>
                <p>Total Rooms: {hotel.rooms}</p>
                <br></br>
            </li>
            {favoriteIcon}
        </section>
    )
}

export default HotelListing;