import React from 'react';
import { Tooltip, IconButton } from '@material-ui/core';

export default function TipButton({ tip, className, onClick, children }) {
    return (
        <Tooltip title={tip} placement='top'>
            <IconButton className={className} onClick={onClick}>
                {children}
            </IconButton>
        </Tooltip>
    );
}
