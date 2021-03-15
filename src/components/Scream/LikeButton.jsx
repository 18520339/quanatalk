import React from 'react';
import { Link } from 'react-router-dom';
import { Favorite as FavoriteIcon, FavoriteBorder } from '@material-ui/icons';
import TipButton from '../Shared/TipButton';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { likeScream, unlikeScream } from '../../redux/actions/scream.actions';

export default function LikeButton({ screamId }) {
    const { authenticated, likes } = useSelector(state => state.user);
    const dispatch = useDispatch();
    if (!authenticated)
        return (
            <Link to='/signin'>
                <TipButton tip='Like'>
                    <FavoriteBorder color='primary' />
                </TipButton>
            </Link>
        );
    return likes && likes.find(like => like.screamId === screamId) ? (
        <TipButton
            tip='Unlike'
            onClick={() => dispatch(unlikeScream(screamId))}
        >
            <FavoriteIcon color='primary' />
        </TipButton>
    ) : (
        <TipButton tip='Like' onClick={() => dispatch(likeScream(screamId))}>
            <FavoriteBorder color='primary' />
        </TipButton>
    );
}
