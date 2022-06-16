import React from 'react';
import './countryMedia.css';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import Paper from '@mui/material/Paper'
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Collections from '@mui/icons-material/Collections';
import VideoLibrary from '@mui/icons-material/VideoLibrary';

export default function CountryMedia() {
    const [value, setValue] = React.useState(0);
    const [file, setFile] = React.useState();

    function handleChooseFile(e) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
        console.log(file);
    }
    return (
        <div>
            <div className="heading">
                <h1>CountryMedia</h1>

            </div>
            <div>
                <h2>Add Image:</h2>
                <input type="file" onChange={handleChooseFile} />
                <img src={file} />
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