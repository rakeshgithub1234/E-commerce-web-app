var imageTypes=['.jpg','.jpeg','.png','.svg'];
var imageName='rakesh.mp3';
var result;
for (let i = 0; i < imageTypes.length; i++) {
    if(imageName.endsWith(imageTypes[i])){
        result="mass bro"
        break;
    }else{
        result="Unsupported Format !"
    } 
}
console.log(result);
    