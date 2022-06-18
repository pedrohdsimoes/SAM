import React, { useState, useEffect } from 'react'
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
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ImageGallery from '../imageGallery';
import app from '../../../firebase/firebase.js';
import { getStorage, ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";

export default function CountryMedia() {
    const [value, setValue] = React.useState(0);
    let location = useLocation();
    const country_url = 'https://countryflagsapi.com/svg/' + location.state.code;
    const [image, setImage] = useState(null);
    const [files, setFiles] = useState('');

    //Gets Images from firebase and sets URLs in array: files
    useEffect(() => {
        const fetchImages = async () => {
            let storage = getStorage(app);
            let result = await listAll(ref(storage, `${location.state.countryName.toUpperCase()}/`));

            let urlPromises = result.items.map(imageRef => getDownloadURL(imageRef));
            return Promise.all(urlPromises);

        }

        const loadImages = async () => {
            const urls = await fetchImages();
            setFiles(urls);
        }
        loadImages();
    }, []);



    function handleChooseFile(e) {
        if (e.target.files[0]) {
            setImage(e.target.files[0])

        }
    }

    function handleUpload() {
        let file = image;
        var storage = getStorage(app);
        var storageRef = ref(storage, `${location.state.countryName.toUpperCase()}/` + file.name);
        uploadBytes(storageRef, file).then((snapshot) => {
            console.log('Uploaded file!');

        })

    }

    let navigate = useNavigate();
    function handleHomePage() {
        navigate('/map', { replace: true });
    }

    return (
        <div >
            <div className="heading" >
                <h1 style={{ fontSize: '55px', backgroundImage: `url(${country_url})`, backgroundSize: 'cover', backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent', display: 'inline-block', WebkitTextStroke: '0.65px', WebkitTextStrokeColor: '#ffffff', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>{location.state.countryName.toUpperCase()}

                </h1>

                <IconButton style={{ float: 'right' }} onClick={handleHomePage}>
                    <TravelExploreIcon sx={{ color: 'rgb(17, 154, 65)' }} fontSize="large" />
                </IconButton>
                <IconButton style={{ float: 'right' }} onClick={handleUpload}>
                    <CloudUploadIcon sx={{ color: '#eec023' }} fontSize="large" />
                </IconButton>
                <IconButton style={{ float: 'right' }}>
                    <label className="custom-file-upload">
                        <input
                            style={{ display: 'none' }}
                            type="file" onChange={handleChooseFile}
                            accept="audio/*,video/*,image/*" id="myFileInput"
                        />
                        <CloudUploadIcon sx={{ color: '#ffffff' }} fontSize="large" />
                    </label>
                </IconButton>
            </div>

            <div>
                <Box sx={{ pb: 7 }}>
                    <div>



                    </div>
                    <ImageGallery files={files} />
                    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                        <BottomNavigation
                            style={{ color: '11222c' }}
                            showLabels
                            value={value}
                            onChange={(event, newValue) => {
                                setValue(newValue);
                            }}
                            sx={{
                                "& .Mui-selected, .Mui-selected > svg": {
                                    color: "#eec023"
                                }
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