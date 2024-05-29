'use client';

import { useRef, useState } from 'react';

import Image from 'next/image';
import classes from './image-picker.module.css';

const ImagePicker = ({ label, name }) => {

  const [pickedImage, setPickedImage] = useState(null);
  const imageInput = useRef();

  const handlePickClick = () => {
    imageInput.current.click();
  };

  /**
   * ရွေးထားတဲ့ image ကို preview ပြချင်လို့
   * event.target.files[0]
   * multiple file တွေပါလာခဲ့ရင်လည်း ပထမတစ်ခုပဲ ရွေးမှာမို့..
   */
  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (!file) {
      setPickedImage(null);
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPickedImage(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  };

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!pickedImage && <p>No Image Picked Yet.</p>}
          {pickedImage && (<Image src={pickedImage} alt="The image is selected by the user." fill />)}
        </div>
        <input ref={imageInput} onChange={handleImageChange} className={classes.input} type="file" id={name} accept="image/png, image/jpeg" name={name} required/>
        <button className={classes.button} type="button" onClick={handlePickClick}>
          Pick an Image
        </button>
      </div>
    </div>
  );
};

export default ImagePicker;