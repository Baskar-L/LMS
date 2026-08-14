export const validateEmail = (
  email
) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    email
  );
};

export const validateRequired =
  (value) => {
    return (
      value &&
      value.toString().trim() !== ""
    );
  };

export const validateCourse =
  (values) => {
    const errors = {};

    if (!values.title)
      errors.title =
        "Title is required";

    if (!values.description)
      errors.description =
        "Description is required";

    if (!values.instructorName)
      errors.instructorName =
        "Instructor Name is required";

    if (!values.category)
      errors.category =
        "Category is required";

    if (!values.duration)
      errors.duration =
        "Duration is required";

    return errors;
  };

export const validateStudent =
  (values) => {
    const errors = {};

    if (!values.name)
      errors.name =
        "Student Name is required";

    if (!values.email) {
      errors.email =
        "Email is required";
    } else if (
      !validateEmail(values.email)
    ) {
      errors.email =
        "Invalid Email";
    }

    return errors;
  };