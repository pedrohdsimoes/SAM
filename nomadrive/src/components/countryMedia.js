import React from 'react';
import './countryMedia.css';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import Paper from '@mui/material/Paper'
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Collections from '@mui/icons-material/Collections';
import VideoLibrary from '@mui/icons-material/VideoLibrary';
import { useNavigate } from "react-router-dom";

export default function CountryMedia() {
    const [value, setValue] = React.useState(0);

    let navigate = useNavigate();
    function handleClick() {
        navigate('/', { replace: true });
    }

    return (
        <div>
            <div className="heading">
                <h1>CountryMedia</h1>

            </div>
            <div>
                <button onClick={handleClick}> HomePage </button >
            </div>
            <div>
                <Box sx={{ pb: 7 }}>
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