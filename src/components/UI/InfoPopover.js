import React from 'react';

import {Popover} from "react-bootstrap";


const InfoPopover = (props) => {
    return (
        <Popover id="popover-basic">
            <Popover.Content>
                {props.children}
            </Popover.Content>
        </Popover>
    )
}

export default InfoPopover;