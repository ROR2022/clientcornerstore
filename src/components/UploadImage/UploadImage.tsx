import {useState,useEffect, FC} from 'react'
//import PropTypes from 'prop-types'
import Image from 'next/image';
import { useMediaQuery } from 'usehooks-ts';

interface UploadImageProps {
  setDataImg: (data: any) => void;
  dataImg?: any;
}

const UploadImage: FC<UploadImageProps> = ({setDataImg, dataImg}) => {
  const [images, setImages] = useState<any>([]);
  const [widthImage, setWidthImage] = useState('80%');
  
  const isDesktop = useMediaQuery('(min-width: 992px)');
  const isTablet = useMediaQuery('(min-width: 600px) and (max-width: 991px)');


  useEffect(() => {
    //determinar si dataImg tiene un url de imagen valido y agregarlo a images
    const isUrl = (str:any) => {
      const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
      return !!pattern.test(str);
    }
    if(isUrl(dataImg)){
      setImages([dataImg])
    }
    if(dataImg === null){
      setImages([])
    }
    if(isDesktop) setWidthImage('20vw')
    if(isTablet) setWidthImage('60%')
  }, [dataImg])

  const handleChange = (e:any) => {
    const myImg = e.target.files[0];
    setDataImg(myImg);
    setImages((images:any) => [URL.createObjectURL(myImg)]);
    return URL.revokeObjectURL(myImg);
  };



  const deleteImage = (blob:any) => {
    setImages(images.filter((x:any) => x !== blob));
    setDataImg(null);
  };

  useEffect(() => {
   
    // console.log("images:..", images);
    //setDataImg(images)
  }, [images]);

  return (
    <div className=" p-3">
      {images.length === 0 && (
        <div className="button">
          <label className="btn btn-primary">
            <input
              type="file"
              className="visually-hidden"
              onChange={handleChange}
            />
            Upload
          </label>
        </div>
      )}

      {/* <label className="fs-5">Elige tu imagen:</label>
      <input className="ms-auto me-auto d-block my-3" type="file" onChange={handleChange} /> */}

      {images.map((row:any, index:any) => (
        <div className="d-flex flex-column align-items-center" key={index}>  
          <img
            style={{ width: widthImage }}
            className="mb-3 rounded"
            src={row}
            alt={row}
          />
          <button
            className="btn btn-outline-danger"
            onClick={() => deleteImage(row)}
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};



export default UploadImage