import React, { useState, useEffect } from 'react'
import './countryMedia.css';
import Box from '@mui/material/Box';
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
import "react-h5-audio-player/lib/styles.css";
import Tooltip from '@mui/material/Tooltip';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import LoadingButton from '@mui/lab/LoadingButton';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { EmailShareButton, FacebookMessengerShareButton, EmailIcon } from "react-share";


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

export default function CountryMedia() {
    const [value, setValue] = React.useState(0);
    let location = useLocation();
    const country_url = 'https://countryflagsapi.com/svg/' + location.state.code;
    const [image, setImage] = useState(null);
    const [files, setFiles] = useState('');
    const userID = sessionStorage.getItem('userID');
    const [deleteIcon, setDeleteIcon] = useState(false);
    const [selectAll, setSelectAll] = useState(false);
    const [open, setOpen] = useState(false);
    const [preview, setPreview] = useState("");
    const [loading, setLoading] = useState(false);
    const [audioName, setAudioName] = useState("");

    let authentication = getAuth();
    let authToken = sessionStorage.getItem('Auth Token')

    onAuthStateChanged(authentication, (user) => {
        if (!user) {
            // no user logged in 
            let signUp = document.getElementById("signUp")
            if (signUp !== null)
                signUp.style.display = "flex"

            let signIn = document.getElementById("signIn")
            if (signIn !== null)
                signIn.style.display = "flex"
        }
    });

    if (!authToken) {
        // no user logged in
        let signUp = document.getElementById("signUp")
        if (signUp !== null)
            signUp.style.display = "flex"

        let signIn = document.getElementById("signIn")
        if (signIn !== null)
            signIn.style.display = "flex"
    }
    else {
        // user already logged in -> SignUp btn and SignIn btn disappear 
        let signUp = document.getElementById("signUp")
        if (signUp !== null)
            signUp.style.display = "none"

        let signIn = document.getElementById("signIn")
        if (signIn !== null)
            signIn.style.display = "none"
    }



    const handleOpenUploadPage = () => {
        setOpen(true);
    };
    const handleCloseUploadPage = () => {
        setOpen(false);
        setPreview("")
    };


    const toggleSelectAll = () => {
        setSelectAll(!selectAll);
    };

    const toggleDelete = () => {
        console.log(files)
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
    //Gets Images from firebase and sets URLs in array: files
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
    });



    function handleChooseFile(e) {
        if (e.target.files[0]) {
            setImage(e.target.files[0])
            if (e.target.files[0].type.includes("image/")) setPreview(URL.createObjectURL(e.target.files[0]));
            else if (e.target.files[0].type.includes("audio/")) setPreview("https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80");

        }

    }



    function handleUpload() {

        let file = image;
        if (file != null) setLoading(true);
        else toast.error('Choose file before uploading');

        if (file.type.includes("audio/")) setAudioName(file.name);
        var storage = getStorage(app);
        var storageRef = ref(storage, `${userID}/${location.state.countryName.toUpperCase()}/` + file.name);


        uploadBytes(storageRef, file).then((snapshot) => {

            console.log('Uploaded file!');
            setLoading(false);
            loadImages();

            handleCloseUploadPage();
        })

    }

    function handleDelete() {

        var storage = getStorage(app);
        let selectedUrls = JSON.parse(sessionStorage.getItem('selectedUrls'))
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
                    toast.error('Select the images you want to delete');
                });
            }

        }

    }
    console.log(files)

    const test = "https://firebasestorage.googleapis.com/v0/b/nomadrive-7f72f.appspot.com/o/GPKjfiZcsSZS7qc8xxGp5xBRQ2z1%2FBRAZIL%2Fagustin-diaz-gargiulo-7F65HDP0-E0-unsplash.jpg?alt=media&token=acac8664-e5a2-4c46-8419-1fc6d9bdb1e1"
    return (
        <div >
            <div className="heading" >
                <h1 style={{ fontSize: '55px', backgroundImage: `url(${country_url})`, backgroundSize: 'cover', backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent', display: 'inline-block', WebkitTextStroke: '0.65px', WebkitTextStrokeColor: '#ffffff', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>{location.state.countryName.toUpperCase()}</h1>
            </div>
            <div className="files">
                <BootstrapDialog
                    onClose={handleCloseUploadPage}
                    aria-labelledby="customized-dialog-title"
                    open={open}
                >
                    <BootstrapDialogTitle id="customized-dialog-title" onClose={handleCloseUploadPage}>
                        UPLOAD YOUR FILES
                    </BootstrapDialogTitle>
                    <Box
                        id="preview_img"
                        component="img"
                        sx={{
                            height: 333,
                            width: 550,
                            objectFit: "contain"
                        }}
                        src={preview}
                    />

                    <DialogActions>
                        <Button
                            variant="outlined" autoFocus
                            component="label"
                            style={{ marginRight: '5px' }}
                        >
                            CHOOSE FILE
                            <input
                                style={{ display: 'none' }}
                                type="file" onChange={handleChooseFile}
                                accept="audio/*,video/*,image/*" id="myFileInput"
                                hidden
                                multiple
                            />
                        </Button>
                        <LoadingButton
                            variant="outlined"
                            onClick={handleUpload}
                            loading={loading}
                            loadingPosition="start"
                            startIcon={<CloudUploadIcon />}
                        >
                            UPLOAD
                        </LoadingButton>
                    </DialogActions>
                    <ToastContainer />
                </BootstrapDialog>
                <Stack id="upload_menu" direction="row" spacing={0.3} style={{ float: 'right' }}>
                    <Zoom in={!deleteIcon}>
                        <Tooltip title="Share photos with email">
                            <EmailShareButton subject={`NomaDrive ${location.state.countryName.toUpperCase()} Photos`} body="NomaDrive Photos: " separator={files}>
                                <EmailIcon size={32} round={true} />
                            </EmailShareButton>
                        </Tooltip>
                    </Zoom>
                    <Zoom in={!deleteIcon}>
                        <Tooltip title="Upload your files">
                            <IconButton onClick={handleOpenUploadPage}>
                                <CloudUploadIcon sx={{ color: '#eec023' }} fontSize="large" />
                            </IconButton>
                        </Tooltip>


                    </Zoom>

                    <Zoom in={!deleteIcon}>
                        <Tooltip title="Click to select the files you want to delete">
                            <IconButton onClick={toggleDelete}>
                                <DeleteOutlineIcon sx={{ color: 'red' }} fontSize="large" />
                            </IconButton>
                        </Tooltip>
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
                        <IconButton style={{ padding: '8px' }} onClick={toggleDelete}>
                            <CloseIcon sx={{ color: '#eec023' }} fontSize="large" />
                        </IconButton>
                    </Zoom>
                </Stack>
                <ToastContainer />
            </div>

            <div>
                <Box sx={{ pb: 7 }}>
                    <div>



                    </div>
                    <ImageGallery files={files} deleteIcon={deleteIcon} selectAll={selectAll} audioName={audioName} />

                </Box>
            </div>
        </div >
    );
}