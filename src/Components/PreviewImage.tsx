import { useState } from "react";
import { RxAvatar } from "react-icons/rx";

const PreviewImage = ({
  file,
  classNameCSS,
}: {
  file: any;
  classNameCSS?: string;
}) => {
  const [preview, setPreview] = useState<any>(null);

  if (file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPreview(reader.result);
    };
  }

  return (
    <div>
      {preview ? (
        <img
          src={preview}
          alt="preview"
          className={`${classNameCSS} h-8 w-8 text-xl rounded-full`}
        />
      ) : (
        <RxAvatar className="text-3xl" />
      )}
    </div>
  );
};

export default PreviewImage;
