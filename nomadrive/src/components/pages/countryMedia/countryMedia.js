import React, { useState, useEffect } from 'react'
import './countryMedia.css';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import Paper from '@mui/material/Paper'
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Collections from '@mui/icons-material/Collections';
import VideoLibrary from '@mui/icons-material/VideoLibrary';
import { useLocation } from "react-router-dom";
import { Button, IconButton } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ImageGallery from '../imageGallery';
import app from '../../../firebase/firebase.js';
import { getStorage, ref, uploadBytes, getDownloadURL, listAll, deleteObject } from "firebase/storage";
import Zoom from '@mui/material/Zoom';
import CloseIcon from '@mui/icons-material/Close';
import Stack from '@mui/material/Stack';
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

export default function CountryMedia() {
    const [value, setValue] = React.useState(0);
    let location = useLocation();
    const country_url = 'https://countryflagsapi.com/svg/' + location.state.code;
    const [image, setImage] = useState(null);
    const [files, setFiles] = useState('');
    const userID = sessionStorage.getItem('userID');
    const [deleteIcon, setDeleteIcon] = useState(false);
    const [selectAll, setSelectAll] = useState(false);

    const toggleSelectAll = () => {
        setSelectAll(!selectAll);
    };

    const toggleDelete = () => {
        setDeleteIcon(!deleteIcon);

        let deleteMenu = document.getElementById("delete_menu");
        let uploadMenu = document.getElementById("upload_menu");
        if (deleteIcon) {
            setSelectAll(false);
            deleteMenu.style.display = "none";
            uploadMenu.style.display = "block"
        }
        else {
            deleteMenu.style.display = "block";
            uploadMenu.style.display = "none";
        }


    };
    //Gets Images from firebase and sets URLs in array: filesß
    const fetchImages = async () => {
        let storage = getStorage(app);

        let result = await listAll(ref(storage, `${userID}/${location.state.countryName.toUpperCase()}/`));
        let urlPromises = result.items.map(imageRef => getDownloadURL(imageRef));
        return Promise.all(urlPromises);

    }

    const loadImages = async () => {
        const urls = await fetchImages();
        setFiles(urls);
    }
    useEffect(() => {
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
        var storageRef = ref(storage, `${userID}/${location.state.countryName.toUpperCase()}/` + file.name);

        uploadBytes(storageRef, file).then((snapshot) => {
            console.log('Uploaded file!');
            loadImages();
        })

    }

    function handleDelete() {

        var storage = getStorage(app);

        if (selectAll) {
            for (let i = 0; i < files.length; i++) {
                var storageRef = ref(storage, files[i]);
                // Delete the file
                deleteObject(storageRef).then(() => {
                    // File deleted successfully
                    if (i == files.length - 1) {
                        loadImages();
                        toggleDelete();
                        localStorage.removeItem('selectedUrls');
                    }
                }).catch((error) => {
                    // Uh-oh, an error occurred!
                });
            }
        } else {
            let selectedUrls = JSON.parse(sessionStorage.getItem('selectedUrls'))
            for (let i = 0; i < selectedUrls.length; i++) {
                var storageRef = ref(storage, selectedUrls[i]);
                // Delete the file
                deleteObject(storageRef).then(() => {
                    // File deleted successfully
                    if (i == selectedUrls.length - 1) {
                        loadImages();
                        toggleDelete();
                        localStorage.removeItem('selectedUrls');
                    }
                }).catch((error) => {
                    // Uh-oh, an error occurred!
                });
            }

        }

    }

    return (
        <div >
            <div className="heading" >
                <h1 style={{ fontSize: '55px', backgroundImage: `url(${country_url})`, backgroundSize: 'cover', backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent', display: 'inline-block', WebkitTextStroke: '0.65px', WebkitTextStrokeColor: '#ffffff', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>{location.state.countryName.toUpperCase()}

                </h1>
                <Stack id="upload_menu" direction="row" spacing={0.3} style={{ float: 'right' }}>
                    <Zoom in={!deleteIcon}>
                        <IconButton >
                            <label className="custom-file-upload">
                                <input
                                    style={{ display: 'none' }}
                                    type="file" onChange={handleChooseFile}
                                    accept="audio/*,video/*,image/*" id="myFileInput"
                                />
                                <CloudUploadIcon sx={{ color: '#ffffff' }} fontSize="large" />
                            </label>
                        </IconButton>
                    </Zoom>
                    <Zoom in={!deleteIcon}>
                        <IconButton onClick={handleUpload}>
                            <CloudUploadIcon sx={{ color: '#eec023' }} fontSize="large" />
                        </IconButton>
                    </Zoom>

                    <Zoom in={!deleteIcon}>
                        <IconButton onClick={toggleDelete}>
                            <DeleteOutlineIcon sx={{ color: 'red' }} fontSize="large" />
                        </IconButton>
                    </Zoom>
                </Stack>

                {/* SELECT IMAGES TO DELETE FROM PAGE */}
                <Stack id="delete_menu" direction="row" spacing={1} style={{ float: 'right' }}>
                    <Zoom in={deleteIcon}>
                        <Button variant="outlined" onClick={toggleSelectAll}>SELECT ALL</Button>
                    </Zoom>
                    <Zoom in={deleteIcon}>
                        <Button variant="outlined" startIcon={<DeleteOutlineIcon />} color="error" onClick={handleDelete}>DELETE</Button>
                    </Zoom>
                    <Zoom in={deleteIcon}>
                        <IconButton style={{ padding: '2px' }} onClick={toggleDelete}>
                            <CloseIcon sx={{ color: '#eec023' }} fontSize="large" />
                        </IconButton>
                    </Zoom>
                </Stack>
            </div>

            <div>
                <Box sx={{ pb: 7 }}>
                    <div>



                    </div>
                    <ImageGallery files={files} deleteIcon={deleteIcon} selectAll={selectAll} />
                    {/* <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                        <BottomNavigation
                            style={{ color: '#11222c' }}
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
                    </Paper> */}
                </Box>
            </div>
        </div >
    );
}