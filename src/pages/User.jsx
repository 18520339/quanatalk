import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { getUserByHandle } from '../redux/actions/user.actions';

// Components
import ScreamDialog from '../components/ScreamDialog';
import Scream, { ScreamSkeleton } from '../components/Scream';
import Profile, { ProfileSkeleton } from '../components/Profile';

export default function User({ match }) {
    const { scream, user } = useSelector(state => state);
    const dispatch = useDispatch();

    const [profile, setProfile] = useState({});
    const [screamParam, setScreamParam] = useState('');

    useEffect(() => {
        const handle = match.params.handle;
        const screamId = match.params.screamId;
        if (screamId) setScreamParam(screamId);

        dispatch(getUserByHandle(handle));
        axios
            .get(`/user/${handle}`)
            .then(res => setProfile(res.data.user))
            .catch(console.error);
    }, [dispatch, match.params]);

    return (
        <Grid container spacing={2}>
            <Grid item sm={8} xs={12}>
                {scream.loading ? (
                    <ScreamSkeleton />
                ) : scream.allScreams.length === 0 ? (
                    <p>No screams from this user</p>
                ) : (
                    scream.allScreams.map(scream => (
                        <Scream key={scream.screamId} scream={scream}>
                            <ScreamDialog
                                screamId={scream.screamId}
                                openDialog={scream.screamId === screamParam}
                            />
                        </Scream>
                    ))
                )}
            </Grid>
            <Grid item sm={4} xs={12}>
                {user.loading && scream.loading ? (
                    <ProfileSkeleton />
                ) : (
                    <Profile profile={profile} />
                )}
            </Grid>
        </Grid>
    );
}
