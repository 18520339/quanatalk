import React from 'react';
import { Link } from 'react-router-dom';
import { Favorite as FavoriteIcon, FavoriteBorder } from '@material-ui/icons';
import TipButton from './TipButton';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { likeScream, unlikeScream } from '../../redux/actions/scream.actions';

export default function LikeButton({ screamId }) {
    const { authenticated, likes } = useSelector(state => state.user);
    const dispatch = useDispatch();

    const onLike = () => dispatch(likeScream(screamId));
    const onUnlike = () => dispatch(unlikeScream(screamId));

    if (!authenticated)
        return (
            <Link to='/signin'>
                <TipButton title='Like'>
                    <FavoriteBorder color='primary' />
                </TipButton>
            </Link>
        );
    return likes && likes.find(like => like.screamId === screamId) ? (
        <TipButton title='Unlike' onClick={onUnlike}>
            <FavoriteIcon color='primary' />
        </TipButton>
    ) : (
        <TipButton title='Like' onClick={onLike}>
            <FavoriteBorder color='primary' />
        </TipButton>
    );
}
