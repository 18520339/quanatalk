import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { getScreams } from '../redux/actions/scream.actions';

// Components
import ScreamDialog from '../components/ScreamDialog';
import Scream, { ScreamSkeleton } from '../components/Scream';
import Profile, { ProfileSkeleton } from '../components/Profile';

export default function Home() {
    const { scream, user } = useSelector(state => state);
    const dispatch = useDispatch();
    useEffect(() => dispatch(getScreams()), [dispatch]);

    return (
        <Grid container spacing={2}>
            <Grid item sm={8} xs={12}>
                {scream.loading ? (
                    <ScreamSkeleton />
                ) : (
                    scream.allScreams.map(scream => (
                        <Scream key={scream.screamId} scream={scream}>
                            <ScreamDialog screamId={scream.screamId} />
                        </Scream>
                    ))
                )}
            </Grid>
            <Grid item sm={4} xs={12}>
                {user.loading && scream.loading ? (
                    <ProfileSkeleton />
                ) : (
                    <Profile profile={user.credentials} />
                )}
            </Grid>
        </Grid>
    );
}
