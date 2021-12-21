class ImageUploader {
    async upload(file) {
        const url = process.env.REACT_APP_CLOUDINARY_IMAGE_URL;
        const data = new FormData();
        data.append('file', file);
        data.append('upload_preset', process.env.REACT_APP_CLOUDINARY_PRESET_NAME)
        
        const result = await fetch( //클라우디너리에 data를 보냄.
            url,
            {
                method: 'POST',
                body: data
            }
        );
        return await result.json();
    }
}

export default ImageUploader;