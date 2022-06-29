import React, { useState, useCallback, useEffect } from "react";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
import SelectedImage from "./SelectedImage";
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import { IconButton } from '@mui/material';
import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import Paper from '@mui/material/Paper'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { getStorage, ref, uploadBytes, getDownloadURL, listAll, deleteObject } from "firebase/storage";
import app from '../../firebase/firebase.js';
import LoadingButton from '@mui/lab/LoadingButton';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function ImageGallery(files) {
    const [trackIndex, setTrackIndex] = useState(0);
    const [loading, setLoading] = useState(false);




    const photos = [];
    const musicTracks = [];
    for (let i in files.files) {
        let jsonPhotos;
        let jsonMusic;
        if (files.files[i].includes(".png") || files.files[i].includes(".jpeg") || files.files[i].includes(".jpg")) {
            jsonPhotos = JSON.stringify({ src: files.files[i], width: 4, height: 3 }, null, 4);
            photos.push(JSON.parse(jsonPhotos));
        }
        else if (files.files[i].includes(".mp3")) {
            console.log(files)
            jsonMusic = JSON.stringify({ name: "", src: files.files[i] }, null, 4);
            musicTracks.push(JSON.parse(jsonMusic));
        }
    }

    const handleClickPrevious = () => {
        setTrackIndex((currentTrack) =>
            currentTrack === 0 ? musicTracks.length - 1 : currentTrack - 1
        );
    };

    const handleClickNext = () => {
        setTrackIndex((currentTrack) =>
            currentTrack < musicTracks.length - 1 ? currentTrack + 1 : 0
        );
    };

    const [currentImage, setCurrentImage] = useState(0);
    const [viewerIsOpen, setViewerIsOpen] = useState(false);
    let selectedUrls = [];

    function handleMusicDelete() {
        setLoading(true);
        var storage = getStorage(app);
        var storageRef = ref(storage, musicTracks[trackIndex].src);
        // Delete the file
        deleteObject(storageRef).then(() => {
            // File deleted successfully
            setLoading(false);
            toast.success(`Track ${trackIndex + 1} Deleted`);

        }).catch((error) => {
            // Uh-oh, an error occurred!
            setLoading(false);
        });

    }

    let imageRenderer = useCallback(

        ({ index, left, top, key, photo }) => (
            < SelectedImage
                selected={files.selectAll ? true : false}
                key={key}
                margin={"2px"}
                index={index}
                photo={photo}
                left={left}
                top={top}
                selectedUrls={selectedUrls}
            />
        ),
        [files.selectAll]
    );
    if (!files.deleteIcon) imageRenderer = null;

    const openLightbox = useCallback((event, { photo, index }) => {
        setCurrentImage(index);
        setViewerIsOpen(true);


    }, []);

    const closeLightbox = () => {
        setCurrentImage(0);
        setViewerIsOpen(false);
    };


    var musicSrc;
    var musicName;
    var header;
    if (musicTracks.length === 0) {
        musicSrc = null;
        musicName = null;
        header = "No Audios to Play"
    }
    else {
        musicSrc = musicTracks[trackIndex].src;
        musicName = musicTracks[trackIndex].name;
        header = `Track ${trackIndex + 1}`;
    }



    return (
        <div>

            <Gallery photos={photos} onClick={openLightbox} renderImage={imageRenderer} />
            <ModalGateway>
                {viewerIsOpen ? (
                    <Modal onClose={closeLightbox} >
                        <Carousel
                            currentIndex={currentImage}
                            views={photos.map(x => ({
                                ...x,
                                srcset: x.srcSet,
                                caption: x.title
                            }))}

                        />
                    </Modal>
                ) : null}
            </ModalGateway>
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                <AudioPlayer
                    style={{

                        backgroundColor: "#eec023",
                        borderRadius: "1rem"
                    }}
                    src={musicSrc}
                    onPlay={(e) => console.log("onPlay")}
                    showSkipControls={true}
                    showJumpControls={false}
                    header={header}
                    onClickPrevious={handleClickPrevious}
                    onClickNext={handleClickNext}
                    onEnded={handleClickNext}
                    customAdditionalControls={
                        [
                            <LoadingButton
                                size="large"
                                onClick={handleMusicDelete}
                                loading={loading}
                                loadingPosition="start"
                                startIcon={<DeleteOutlineIcon />}
                            >

                            </LoadingButton>,
                            RHAP_UI.LOOP

                        ]
                    }
                // other props here
                />

            </Paper>
            <ToastContainer />
        </div>
    );

}
