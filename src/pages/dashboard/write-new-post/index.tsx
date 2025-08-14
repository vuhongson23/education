import classNames from "classnames/bind";
import slugify from "slugify";

import CustomTextEditor from "~/components/custom-text-editor";
import { Formik, type FormikProps } from "formik";
import MultiInput from "~/components/multi-input";
import { POST_STATUS } from "~/constant/constant";
import styles from "./WriteNewPost.module.scss";
import Upload from "~/components/image-upload";
import FormRow from "~/components/form-row";
import Button from "~/components/button";
import { toast } from "react-toastify";
import { postDataAPI } from "~/utils/api";
import { URL_CREATE_NEW_POST } from "~/api/end-point";

interface FormValuesPost {
  title: string;
  slug: string;
  thumbnail: string;
  author: string;
  category: number;
  status: number;
  content: string;
}

const categoryList = [
  {
    label: "Khoa học",
    value: 1,
  },
  {
    label: "Công nghệ",
    value: 2,
  },
  {
    label: "Đời sống",
    value: 3,
  },
];

const postStatus = [
  {
    label: "Published",
    value: POST_STATUS.PUBLISHED,
  },
  {
    label: "Pending",
    value: POST_STATUS.PENDING,
  },
  {
    label: "Draft",
    value: POST_STATUS.DRAFT,
  },
  {
    label: "Rejected",
    value: POST_STATUS.REJECTED,
  },
];

const cx = classNames.bind(styles);

const WriteNewPost = () => {
  const handleAddNewPost = async (
    values: FormValuesPost,
    formikHelper: any
  ) => {
    const payload = {
      ...values,
      category: Number(values.category),
      slug: slugify(values.slug || values.title),
    };
    console.log("🚀 ~ handleAddNewPost ~ payload:", payload);
    try {
      const response = await postDataAPI(URL_CREATE_NEW_POST, payload);
      if (response.status === 201) {
        toast.success("Create new post successfully");
        formikHelper.resetForm();
      }
    } catch (error) {
      toast.error("Create new post failed");
    }
  };

  return (
    <Formik
      initialValues={{
        title: "",
        slug: "",
        thumbnail: "",
        author: "",
        category: 0,
        status: POST_STATUS.PENDING,
        content: "",
      }}
      onSubmit={(values, formikHelper) =>
        handleAddNewPost(values, formikHelper)
      }
    >
      {(formik: FormikProps<FormValuesPost>) => (
        <div className={cx("wrapper")}>
          <h1 className={cx("title")}>Write new post</h1>
          <div className={cx("post-form")}>
            <form onSubmit={formik.handleSubmit}>
              <Upload name="thumbnail" className={cx("thumbnail-upload")} />
              <FormRow className={cx("form-row")}>
                <MultiInput
                  type="text"
                  name="title"
                  label="Title"
                  className={cx("input-form")}
                  placeholder="Enter title of post..."
                  required
                />
                <MultiInput
                  type="text"
                  name="slug"
                  label="Slug"
                  className={cx("input-form")}
                  placeholder="Enter slug of post..."
                />
              </FormRow>
              <FormRow className={cx("form-row")}>
                <MultiInput
                  type="text"
                  name="author"
                  label="Author"
                  className={cx("input-form")}
                  placeholder="Enter author of post..."
                  required
                />
                <MultiInput
                  type="select"
                  name="category"
                  label="Category"
                  options={categoryList}
                  className={cx("select-form")}
                  required
                />
              </FormRow>
              <MultiInput
                type="radio"
                name="status"
                label="Status"
                options={postStatus}
                className={cx("radio-form")}
                disabled
                required
              />
              <CustomTextEditor
                name="content"
                label="Content"
                className={cx("editor")}
                required
                placeholder="Write your post content here..."
              />
              <Button type="submit" variant="primary" className={cx("add-btn")}>
                Add
              </Button>
            </form>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default WriteNewPost;
