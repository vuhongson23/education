import FormRow from "~/components/form-row";
import MultiInput from "~/components/multi-input";

interface CategoryFormProps {
  titleForm?: string;
  action?: string;
}

const CategoryForm = ({ titleForm }: CategoryFormProps) => {
  return (
    <>
      <h2>{titleForm}</h2>
      <FormRow>
        <MultiInput
          type="text"
          name="image"
          placeholder="Enter your image..."
          label="Image"
        />
        <MultiInput
          type="text"
          name="name"
          placeholder="Enter your name..."
          label="Name"
        />
      </FormRow>
      <FormRow>
        <MultiInput
          type="text"
          name="password"
          placeholder="Enter your password..."
        />
      </FormRow>
    </>
  );
};

export default CategoryForm;
