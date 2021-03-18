import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { Profile, Scream, ScreamDialog } from '../components';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { getScreams } from '../redux/actions/scream.actions';

export default function Home() {
    const { credentials } = useSelector(state => state.user);
    const { allScreams, loading } = useSelector(state => state.scream);
    const dispatch = useDispatch();
    useEffect(() => dispatch(getScreams()), [dispatch]);

    return (
        <Grid container spacing={2}>
            <Grid item sm={8} xs={12}>
                {!loading ? (
                    allScreams.map(scream => (
                        <Scream key={scream.screamId} scream={scream}>
                            <ScreamDialog screamId={scream.screamId} />
                        </Scream>
                    ))
                ) : (
                    <p>Loading...</p>
                )}
            </Grid>
            <Grid item sm={4} xs={12}>
                <Profile profile={credentials} />
            </Grid>
        </Grid>
    );
}
