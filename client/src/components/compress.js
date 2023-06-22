
const compress = async (image_url, WIDTH=500, quality = 90) => {

    let new_url = await new Promise((resolve)=>{
        let image = document.createElement("img");
        image.src = image_url;
        console.log(image_url.length)

        image.onload = (e) => {
            let canvas = document.createElement('canvas');
            if(WIDTH>=e.target.width)
            {
                return image_url;
                resolve(image_url);
            }
            let ratio = WIDTH / e.target.width;
            canvas.width = WIDTH;
            canvas.height = e.target.height * ratio;

            const context = canvas.getContext('2d');
            context.drawImage(image, 0, 0, canvas.width, canvas.height);

            resolve(context.canvas.toDataURL("image/jpeg", quality));
        }
    });
    
    console.log(new_url.length)
    // return {new_url, length:new_url.length};
    return new_url;
}

export default compress;