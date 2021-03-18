import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import { Profile, Scream, ScreamDialog } from '../components';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { getUserByHandle } from '../redux/actions/user.actions';

export default function User({ match }) {
    const { allScreams, loading } = useSelector(state => state.scream);
    const dispatch = useDispatch();

    const [profile, setProfile] = useState({});
    useEffect(() => {
        const handle = match.params.handle;
        dispatch(getUserByHandle(handle));
        axios
            .get(`/user/${handle}`)
            .then(res => setProfile(res.data.user))
            .catch(console.error);
    }, [dispatch, match.params.handle]);

    return (
        <Grid container spacing={2}>
            <Grid item sm={8} xs={12}>
                {!loading ? (
                    allScreams.length === 0 ? (
                        <p>No screams from this user</p>
                    ) : (
                        allScreams.map(scream => (
                            <Scream key={scream.screamId} scream={scream}>
                                <ScreamDialog screamId={scream.screamId} />
                            </Scream>
                        ))
                    )
                ) : (
                    <p>Loading...</p>
                )}
            </Grid>
            <Grid item sm={4} xs={12}>
                <Profile profile={profile} />
            </Grid>
        </Grid>
    );
}
