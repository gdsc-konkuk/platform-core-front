import { useState, ChangeEvent } from 'react';
import PlusIcon from '/icons/plus.svg';
import DeleteIcon from '/icons/delete.svg';

export default function ImageUpload() {
  const [images, setImages] = useState<string[]>([]);

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div className="flex gap-3">
        <label className="flex items-center justify-center w-[123px] h-[151px] bg-[#E3E3E3] rounded-lg cursor-pointer">
          <img src={PlusIcon} alt="plus" className="w-6 h-6" />
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            className="hidden"
          />
        </label>
        <div className="flex gap-3">
          {images.map((image, index) => (
            <div key={index} className="relative">
              <img
                src={image}
                alt={`upload-${index}`}
                className="w-[206px] h-[151px] object-contain rounded-lg bg-[#E3E3E3]"
              />
              <img
                src={DeleteIcon}
                alt="delete"
                className="absolute -top-3 -right-3 w-6 h-6 cursor-pointer"
                onClick={() => handleRemoveImage(index)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
