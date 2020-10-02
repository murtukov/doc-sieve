import React from 'react';
import {Alignment, Button, Navbar, NavbarDivider, NavbarGroup, NavbarHeading} from "@blueprintjs/core";
import {useMatch, useNavigate} from "@reach/router";
import {createUseStyles} from "react-jss";

function Topbar() {
    const navigate = useNavigate();
    const match = useMatch('*');
    const c = useStyles();

    return (
        <Navbar className={c.root}>
            <NavbarGroup align={Alignment.LEFT}>
                <NavbarHeading>DocSieve</NavbarHeading>
                <NavbarDivider />
                <Button
                    icon='text-highlight'
                    text="Edior"
                    active={match.uri === '/editor'}
                    onClick={() => navigate('editor')}
                    minimal
                />
                <Button
                    icon="document"
                    text="Wizard"
                    active={match.uri === '/wizard'}
                    onClick={() => navigate('wizard')}
                    minimal
                />
            </NavbarGroup>
        </Navbar>
    );
}

const useStyles = createUseStyles({
    root: {
        position: 'fixed',
        top: 0
    }
});

export default Topbar;