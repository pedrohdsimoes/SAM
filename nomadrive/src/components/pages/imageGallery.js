import React, { useState, useEffect } from 'react'
import app from '../../firebase/firebase.js';
import { getStorage, ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";

export default function ImageGallery() {

    const [image, setImage] = useState(null);
    const [url, setUrl] = useState('');
    const [files, setFiles] = useState();

    useEffect(() => {
        const fetchImages = async () => {
            let storage = getStorage(app);
            let result = await listAll(ref(storage, 'folder/'));

            let urlPromises = result.items.map(imageRef => getDownloadURL(imageRef));
            console.log(urlPromises)
            return Promise.all(urlPromises);

        }

        const loadImages = async () => {
            const urls = await fetchImages();
            setFiles(urls);
        }
        loadImages();
    }, []);

    console.log(files)

    function handleChange(e) {
        if (e.target.files[0]) {
            setImage(e.target.files[0])
            console.log(image);
        }
    }

    function handleUpload() {
        let file = image;
        var storage = getStorage(app);
        var storageRef = ref(storage, 'folder/' + file.name);
        uploadBytes(storageRef, file).then((snapshot) => {
            console.log('Uploaded file!');
            // var progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes)) * 100
            // this.setState({ progress })

        }, (error) => {
            throw error
        }, () => {


        })
        getDownloadURL(ref(storageRef))
            .then((url) => {
                console.log("URL: " + url);
                setUrl(url);
            })
    }

    return (
        <div className="App">
            <h4>upload image</h4>

            <input type="file" id="file" onChange={handleChange} />


            <button className="button" onClick={handleUpload}>Upload</button>
            <img
                className="ref"
                src={url || "https://via.placeholder.com/400x300"}
                alt="Uploaded Images"
                height="300"
                width="400"
            />
        </div>
    )
}
