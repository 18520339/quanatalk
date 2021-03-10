import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';

import Scream from '../components/Scream';

export default function Home() {
    const [screams, setScreams] = useState(null);
    useEffect(() => {
        axios
            .get('/screams')
            .then(res => setScreams(res.data))
            .catch(console.error);
    }, []);

    return (
        <Grid container spacing={2}>
            <Grid item sm={8} xs={12}>
                {screams ? (
                    screams.map(scream => (
                        <Scream key={scream.screamId} scream={scream} />
                    ))
                ) : (
                    <p>Loading...</p>
                )}
            </Grid>
            <Grid item sm={4} xs={12}>
                <p>Profile...</p>
            </Grid>
        </Grid>
    );
}
