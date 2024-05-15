import { useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import PreviewImage from "../Components/PreviewImage";
import { v4 as uuidV4 } from "uuid";
import { useCharacter } from "../Provider/CharacterProvider";
import { toast } from "react-toastify";
import InputField from "../Components/InputField";

const NewCharacterForm = ({
  setFormVisibility,
}: {
  setFormVisibility: (e: boolean) => void;
}) => {
  const { createCharacter } = useCharacter();
  const fileRef = useRef<any>(null);
  //   const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

  const initialValues = {
    file: null,
    name: "",
    userName: "",
    personality: "",
    work: "",
    hobbies: "",
    relationship: "",
    about: "",
  };

  const signUpSchema = Yup.object({
    name: Yup.string().min(2).max(25).required("Please enter your name"),
    userName: Yup.string()
      .min(2)
      .max(25)
      .required("Please enter your Username"),
    personality: Yup.string().min(2).max(25),
    work: Yup.string().min(2).max(25),
    hobbies: Yup.string().min(2).max(25),
    relationship: Yup.string().min(2).max(25),
    about: Yup.string(),
    file: Yup.mixed().nullable().required(),
  });

  const {
    values,
    setFieldValue,
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    touched,
  } = useFormik({
    initialValues,
    validationSchema: signUpSchema,
    validateOnChange: true,
    validateOnBlur: false,
    //// By disabling validation onChange and onBlur formik will validate on submit.
    onSubmit: (values) => {
      const reader = new FileReader();
      reader.readAsDataURL(values.file!); // Read file as base64
      (reader.onload = () => {
        const base64Image = reader.result;
        const addOtherInformation = {
          ...values,
          id: uuidV4(),
          image: base64Image,
        };
        createCharacter(
          addOtherInformation.id,
          addOtherInformation.name,
          addOtherInformation.image,
          addOtherInformation.userName,
          false,
          addOtherInformation.work,
          addOtherInformation.personality,
          addOtherInformation.hobbies,
          addOtherInformation.relationship,
          addOtherInformation.about
        );
        setFormVisibility(false);
      }),
        toast.success("New Character Created", {
          position: "top-right",
          theme: "dark",
        });
    },
  });

  return (
    <>
      <div>
        <form onSubmit={handleSubmit} className=" relative">
          <div className="flex flex-col">
            <label htmlFor="image">Image</label>

            <input
              ref={fileRef}
              hidden
              type="file"
              onChange={(event) => {
                if (event) {
                  setFieldValue("file", event.target!.files![0]);
                }
              }}
            />
            <div className="flex items-center mt-1">
              <PreviewImage file={values.file} />
              <button
                className="input-button border border-pink text-pink rounded-lg px-2  ml-2"
                type="button"
                onClick={() => {
                  fileRef.current.click();
                }}
              >
                Upload
              </button>
            </div>
            {touched.file && errors.file ? (
              <p className="form-error">{errors.file}</p>
            ) : null}
          </div>
          <InputField
            label="Name"
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.name && errors.name}
            placeholder="Name..."
          />
          <InputField
            label="User Name"
            name="userName"
            value={values.userName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.userName && errors.userName}
            placeholder="User Name..."
          />
          <InputField
            label="Personality"
            name="personality"
            value={values.personality}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.personality && errors.personality}
            placeholder="Personality..."
          />
          <InputField
            label="Work"
            name="work"
            value={values.work}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.work && errors.work}
            placeholder="Work..."
          />
          <InputField
            label="Hobbies"
            name="hobbies"
            value={values.hobbies}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.hobbies && errors.hobbies}
            placeholder="Hobbies..."
          />
          <InputField
            label="Relationship"
            name="relationship"
            value={values.relationship}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.relationship && errors.relationship}
            placeholder="Relationship..."
          />
          <InputField
            label="About"
            name="about"
            value={values.about}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.about && errors.about}
            placeholder="About..."
          />
          <button
            className="input-button border border-pink text-pink rounded-lg absolute right-1 mt-7 px-2 hover:bg-pink hover:text-fadeWhite"
            type="submit"
          >
            Create
          </button>
        </form>
      </div>
    </>
  );
};

export default NewCharacterForm;
