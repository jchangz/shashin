const imgPromise = (url) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.addEventListener('error', (err) => reject(err));
        img.src = url;
    });
}

export default imgPromise