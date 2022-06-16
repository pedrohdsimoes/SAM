import React from 'react';
import './countryMedia.css';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import Paper from '@mui/material/Paper'
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Collections from '@mui/icons-material/Collections';
import VideoLibrary from '@mui/icons-material/VideoLibrary';
import { useNavigate, useLocation } from "react-router-dom";
import { IconButton } from '@mui/material';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';


export default function CountryMedia() {
    const [value, setValue] = React.useState(0);
    const [file, setFile] = React.useState();
    let location = useLocation();
    function handleChooseFile(e) {
        console.log(e.target.files);
        localStorage.setItem(URL.createObjectURL(e.target.files[0]));
    }

    let navigate = useNavigate();
    function handleHomePage() {
        navigate('/', { replace: true });
    }

    return (
        <div>
            <div className="heading">
                <h1>{location.state.countryName}</h1>

            </div>

            <div>
                <Box sx={{ pb: 7 }}>
                    <div>
                        <h2>Add Image:</h2>
                        <input type="file" onChange={handleChooseFile} accept="audio/*,video/*,image/*" id="myFileInput" />
                        <img src={file} />
                        <IconButton onClick={handleHomePage}>
                            <TravelExploreIcon />
                        </IconButton>
                    </div>
                    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                        <BottomNavigation
                            showLabels
                            value={value}
                            onChange={(event, newValue) => {
                                setValue(newValue);
                            }}
                        >
                            <BottomNavigationAction label="Photos" icon={<Collections />} />
                            <BottomNavigationAction label="Videos" icon={<VideoLibrary />} />
                        </BottomNavigation>
                    </Paper>
                </Box>
            </div>
        </div>
    );
}