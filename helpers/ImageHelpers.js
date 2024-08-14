


export function setImageUrl(image_url){


    return  image_url?image_url.toString().replace('http://127.0.0.1:8000/media/', '').replace('https%3A', 'https://'):'https://via.placeholder.com/150';

}

