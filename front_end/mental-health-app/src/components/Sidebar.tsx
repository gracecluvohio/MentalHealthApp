import Brightness7OutlinedIcon from "@mui/icons-material/Brightness7Outlined";
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
import { default as Icon, default as SvgIcon } from "@mui/material/SvgIcon";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import logo from "../assets/Solace_transparent.png";
import AngryIcon from "../assets/angry-svgrepo-com.svg";
import IconMapping from "./types";

const drawerWidth = 240;

{
  /* <SvgIcon component={AngryIcon} inheritViewBox/> */
}
// : IconMapping
// const iconMapping = {
//   1 : AngryIcon

// }

export default function ResponsiveDrawer(
  { changeEntry }: any, // ignore warnings for these
  { changeEntriesRecord }: any
) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const [entries, setEntries] = React.useState<Record<number, Date>>({
    0: new Date(),
  });
  const [newID, setNewID] = React.useState<number>(1);
  // const [curEntryID, setCurEntryID] = React.useState<number>(1);

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

  const handleClickCreate = () => {
    const dateObj: Date = new Date();
    const newEntry = {
      id: newID,
      date: dateObj,
    };
    // changeEntry(newID + 1);
    setNewID(newID + 1);
    setEntries((prevEntries) => ({
      ...prevEntries,
      [newEntry.id]: newEntry.date,
    }));
    changeEntriesRecord(newEntry);
  };
  <Brightness7OutlinedIcon />;

  const drawer = (
    <div>
      <React.Fragment>
        <Toolbar />
        <Button variant="contained" onClick={handleClickCreate}>
          Create new entry
        </Button>
        {/** If the button above is clicked, open the create entry dialog as below */}
        <List>
          {Object.entries(entries)
            .map(([id, date], index) => (
              <React.Fragment key={id}>
                <ListItem disablePadding>
                  <ListItemButton onClick={() => changeEntry(Number(id))}>
                    <ListItemText primary={date.toLocaleString()} />
                    <div style={{}}></div>
                  </ListItemButton>
                </ListItem>
                {index < Object.entries(entries).length - 1 && <Divider />}
              </React.Fragment>
            ))
            .reverse()}
        </List>
      </React.Fragment>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <div>
            <img style={{ width: 100, height: 100 }} src={logo} alt="Logo" />
          </div>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
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
            display: { xs: "block", sm: "none" },
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
            display: { xs: "none", sm: "block" },
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
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
      </Box>
    </Box>
  );
}
