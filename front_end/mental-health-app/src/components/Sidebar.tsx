import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import * as React from "react";
import {Session} from "../types.tsx";
import MoodIndicator from "./MoodIndicator.tsx";

const drawerWidth = 240;


export default function Sidebar(
    {
        sessions,
        entryDate,
        setEntryDate,
        createNewEntry,
    }: {
        sessions: Record<string, Session>;
        entryDate: string | null;
        setEntryDate: (date: string) => void;
        createNewEntry: () => void;
    }
) {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [isClosing, setIsClosing] = React.useState(false);

    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };

    const handleDrawerToggle = () => {
        if (!isClosing) {
            setMobileOpen(!mobileOpen);
        }
    };

    const drawer = (
        <div>
            <React.Fragment>
                <div style={{paddingTop: "30px"}}></div>
                <Button variant="contained" onClick={createNewEntry}>
                    Create new entry
                </Button>
                {/** If the button above is clicked, open the create entry dialog as below */}
                <List>
                    {Object.keys(sessions)
                        .map((date, index) => (
                            <React.Fragment key={date}>
                                <ListItem disablePadding>
                                    <ListItemButton onClick={() => setEntryDate(date)}>
                                        <ListItemText primary={(new Date(date)).toLocaleString()}/>
                                        <link
                                            rel="stylesheet"
                                            href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
                                        />
                                        <MoodIndicator mood={sessions[date].mood}></MoodIndicator>
                                    </ListItemButton>
                                </ListItem>
                                {(index < Object.keys(sessions).length - 1) && <Divider/>}
                            </React.Fragment>
                        ))
                        .reverse()}
                </List>
            </React.Fragment>
        </div>
    );

    return (
        <Box sx={{display: "flex"}}>
            <CssBaseline/>
            <AppBar
                position="fixed"
                sx={{
                    width: {sm: `calc(100% - ${drawerWidth}px)`},
                    ml: {sm: `${drawerWidth}px`},
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{mr: 2, display: {sm: "none"}}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <div>
                        <img
                            style={{width: 100, height: 100}}
                            src="https://res.cloudinary.com/dijcxemmw/image/upload/v1716704362/Solace_transparent_jwdfl5.png"
                            alt="Logo"
                        />
                    </div>
                    {(entryDate !== null) ?
                        <h2>{(new Date(entryDate)).toLocaleString()}</h2>
                        : <> </>
                    }
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{width: {sm: drawerWidth}, flexShrink: {sm: 0}}}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onTransitionEnd={handleDrawerTransitionEnd}
                    onClose={handleDrawerClose}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: {xs: "block", sm: "none"},
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: drawerWidth,
                        },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: {xs: "none", sm: "block"},
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: drawerWidth,
                        },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: {sm: `calc(100% - ${drawerWidth}px)`},
                }}
            >
                <Toolbar/>
            </Box>
        </Box>
    );
}
