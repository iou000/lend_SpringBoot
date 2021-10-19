class ImageUploader {
    async upload(file) {
        const url = 'https://api.cloudinary.com/v1_1/diuhf2vfm/upload';
        const data = new FormData();
        data.append('file', file);
        data.append('upload_preset', 'ghh2xyun')
        
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