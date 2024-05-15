import { useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { useCharacter } from "../Provider/CharacterProvider";
import PreviewImage from "./PreviewImage";
import { toast } from "react-toastify";

const GenerateImage = () => {
  const fileRef = useRef<any>(null);
  const { editCharacterImage, characters } = useCharacter();
  const character = characters.filter((o) => o.isSelected === true);

  const formik = useFormik({
    initialValues: {
      file: null,
    },
    validationSchema: Yup.object().shape({
      file: Yup.mixed().required("Profile picture is required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const reader = new FileReader();
        reader.readAsDataURL(values.file!);
        (reader.onload = () => {
          const base64Image = reader.result;
          const addOtherInformation = {
            ...values,
            image: base64Image,
          };
          editCharacterImage(
            character[0].id,

            addOtherInformation.image
          );
        }),
          toast.success("Image Updated Successfully", {
            position: "top-right",
            className: "p-10",
            theme: "dark",
          });
        setSubmitting(false);
      } catch (error) {
        toast.success("Image not Updated", {
          position: "top-right",
          theme: "dark",
        });
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="bg-chatBoxGrey w-full flex  flex-col items-center">
      <h1 className="text-pink text-4xl sm:text-6xl font-semibold mt-10">
        Update Profile Picture
      </h1>
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col justify-center"
      >
        {/* Profile Picture Input */}
        <div className="mt-5">
          <input
            hidden
            ref={fileRef}
            type="file"
            id="file"
            name="file"
            accept="image/*"
            onChange={(event) => {
              formik.setFieldValue("file", event.currentTarget.files![0]);
            }}
          />
          <div className=" flex flex-col items-center mt-1">
            <PreviewImage
              file={formik.values.file}
              classNameCSS="h-96 w-96 rounded-none"
            />
            <button
              className="input-button border border-pink text-pink rounded-lg px-2  "
              type="button"
              onClick={() => {
                fileRef.current.click();
              }}
            >
              Upload
            </button>
          </div>
          {formik.errors.file && formik.touched.file && (
            <div>{formik.errors.file}</div>
          )}
        </div>

        {/* Submit Button */}
        <button
          className="text-fadeWhite bg-pink text-2xl px-2 py-1 rounded-md mt-9"
          type="submit"
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default GenerateImage;
