async function uploadImg(ev) {
    const CLOUD_NAME = "yinon1565"
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
    const UPLOAD_PRESET = 'ml_default';
    const formData = new FormData();
        if (ev.target) {
            formData.append('file', ev.target.files[0])
        } else {
            formData.append('file', ev)
        }
    formData.append('upload_preset', UPLOAD_PRESET); // second parameter is the upload preset

    return fetch(UPLOAD_URL, {
            method: 'POST',
            body: formData,
            secure:true
        })
        .then(res => res.json())
        .then(res => {
            return res
        })
        .catch(err => console.error(err))
}

export default {
    uploadImg
}
