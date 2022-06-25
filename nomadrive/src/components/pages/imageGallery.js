import React, { useState, useCallback } from "react";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
import SelectedImage from "./SelectedImage";
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import { IconButton } from '@mui/material';


export default function ImageGallery(files) {
    const photos = [];
    for (let i in files.files) {

        let json = JSON.stringify({ src: files.files[i], width: 4, height: 3 }, null, 4);
        photos.push(JSON.parse(json));
    }

    const [currentImage, setCurrentImage] = useState(0);
    const [viewerIsOpen, setViewerIsOpen] = useState(false);
    const [currentSrc, setCurrentSrc] = useState('');
    let selectedUrls = [];

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
        </div>
    );

}
