import { useFormik } from "formik";
import * as Yup from "yup";
import { v4 as uuidV4 } from "uuid";
import { useCharacter } from "../Provider/CharacterProvider";
import { toast } from "react-toastify";
import InputField from "../Components/InputField";

const EditCharacterForm = ({
  setFormVisibility,
}: {
  setFormVisibility: (e: boolean) => void;
}) => {
  const { characters, editCharacter } = useCharacter();
  const character = characters.filter((o) => o.isSelected === true);

  const initialValues = {
    name: character[0].name,
    userName: character[0].userName,
    personality: character[0].personality,
    work: character[0].work,
    hobbies: character[0].hobbies,
    relationship: character[0].relationship,
    about: character[0].about,
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
  });

  const {
    values,

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

    onSubmit: (values) => {
      const addOtherInformation = {
        ...values,
        id: uuidV4(),
      };

      editCharacter(
        character[0].id,
        addOtherInformation.name,
        character[0].image as string,
        addOtherInformation.userName,
        character[0].isSelected,
        addOtherInformation.work,
        addOtherInformation.personality,
        addOtherInformation.hobbies,
        addOtherInformation.relationship,
        addOtherInformation.about
      );

      setFormVisibility(false);
      toast.success("Profile Updated", {
        position: "top-right",
        theme: "dark",
      });
    },
  });

  return (
    <>
      <div>
        <form onSubmit={handleSubmit} className=" relative">
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
            className="input-button border border-pink text-pink rounded-lg absolute right-0 mt-3 px-2"
            type="submit"
          >
            Edit
          </button>
        </form>
      </div>
    </>
  );
};

export default EditCharacterForm;
