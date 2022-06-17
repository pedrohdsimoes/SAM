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
import { red } from '@mui/material/colors';
import { ImageGallery } from './imageGallery';

export default function CountryMedia() {
    const [value, setValue] = React.useState(0);
    const [file, setFile] = React.useState();
    let location = useLocation();
    console.log(location)
    const country_url = 'https://countryflagsapi.com/svg/' + location.state.code;
    function handleChooseFile(e) {
        console.log(e.target.files[0]);
        setFile(URL.createObjectURL(e.target.files[0]));
        // localStorage.setItem("teste", JSON.stringify(e.target.files[0]));

    }

    let navigate = useNavigate();
    function handleHomePage() {
        navigate('/map', { replace: true });
    }

    return (
        <div>
            <div className="heading" >
                <h1 style={{ fontSize: '30px', backgroundImage: `url(${country_url})`, backgroundSize: 'cover', backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent', display: 'inline-block', WebkitTextStroke: '0.65px', WebkitTextStrokeColor: '#ffffff', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>{location.state.countryName.toUpperCase()}
                    {/* <img style={{ height: '40px', paddingLeft: "10px" }} src='https://countryflagsapi.com/svg/pt'></img> */}

                </h1>
                <IconButton style={{ float: 'right' }} onClick={handleHomePage}>
                    <TravelExploreIcon sx={{ color: red[500] }} fontSize="large" />
                </IconButton>
            </div>

            <div>
                <Box sx={{ pb: 7 }}>
                    <div>
                        <h2>Add Image:</h2>
                        <label className="custom-file-upload">
                            <input
                                style={{ display: 'none' }}
                                type="file" onChange={handleChooseFile}
                                accept="audio/*,video/*,image/*" id="myFileInput"
                            />
                            Upload Memories
                        </label>



                    </div>
                    <img src={file} />
                    {/* <ImageGallery /> */}
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
        </div >
    );
}