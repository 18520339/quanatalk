import React from 'react';
import { Tooltip, IconButton } from '@material-ui/core';

export default function TipButton({
    title,
    className,
    onClick,
    children,
    ...rest
}) {
    return (
        <Tooltip title={title} placement='top'>
            <IconButton className={className} onClick={onClick} {...rest}>
                {children}
            </IconButton>
        </Tooltip>
    );
}
