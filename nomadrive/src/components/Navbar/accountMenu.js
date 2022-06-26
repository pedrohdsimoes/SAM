import * as React from "react";
import { useEffect } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'


export default function AccountMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const authentication = getAuth();
    let logged = true;
    let authToken = sessionStorage.getItem('Auth Token')

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = (event) => {
        event.preventDefault();

        signOut(authentication).then(() => {
            // Sign-out successful.
            // console.log("LOGOUT")
            logged = false;
            let profile = document.getElementById("profile")
            profile.style.display = "none";

        }).catch((error) => {
            // An error happened.
        });
    };

    useEffect(() => {
        onAuthStateChanged(authentication, (user) => {
            if (user) {
                logged = true;
                // console.log("LOGGED USER: " + user.uid);
                let profile = document.getElementById("profile")
                if(profile !== null)
                    profile.style.display = "block";
            }
            else {
                logged = false;
                // console.log("NO USER LOGGED IN")
            }
        });

    }, [])


    if (logged && authToken) {
        return (
            <React.Fragment>

                <Box id="profile"
                    sx={{ display: "flex", alignItems: "center", textAlign: "center", float: "right" }}>

                    <IconButton className="profile"
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 4 }}

                    >
                        <Avatar sx={{ width: 32, height: 32 }}>P</Avatar>
                    </IconButton>

                </Box>
                <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                        elevation: 0,
                        sx: {
                            overflow: "visible",
                            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                            mt: 1.5,
                            "& .MuiAvatar-root": {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1
                            },
                            "&:before": {
                                content: '""',
                                display: "block",
                                position: "absolute",
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: "background.paper",
                                transform: "translateY(-50%) rotate(45deg)",
                                zIndex: 0
                            }
                        }
                    }}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                    <MenuItem>
                        <Avatar /> Profile </MenuItem>
                    <Divider />
                    <MenuItem>
                        <ListItemIcon>
                            <Settings fontSize="small" />
                        </ListItemIcon>
                        Settings
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                        <ListItemIcon>
                            <Logout fontSize="small" />
                        </ListItemIcon>
                        Logout
                    </MenuItem>
                </Menu>

            </React.Fragment>

        );
    }

}
