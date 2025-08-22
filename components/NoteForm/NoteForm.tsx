import { useId } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import type { FormikHelpers } from "formik";
import * as Yup from "yup";

import css from "./NoteForm.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { NewNoteData } from "../../types/note";
import { createNote } from "@/lib/api";
import { useRouter } from "next/router";

// interface NoteFormProps {
// }

const OrderFormSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Title must be at least 3 characters")
    .max(50, "Title is too long")
    .required("Title is required"),
  content: Yup.string().max(500, "Content is too long"),
  tag: Yup.string()
    .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"])
    .required("Tag is required"),
});

interface OrderFormValues {
  title: string;
  content: string;
  tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
}

const initialValues: OrderFormValues = {
  title: "",
  content: "",
  tag: "Todo",
};

export default function NoteForm() {
  const fieldId = useId();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (noteData: NewNoteData) => createNote(noteData),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["notes"],
      });
    },
  });

  const router = useRouter();

  const handleCancel = () => router.push("/notes/filter/all");

  const handleSubmit = (formData: FormData) => {
    const values = Object.fromEntries(formData);
    console.log(values);
  };

  // const handleSubmit = (
  //   values: OrderFormValues,
  //   formikHelpers: FormikHelpers<OrderFormValues>
  // ) => {
  //   mutate(values);
  //   formikHelpers.resetForm();
  // };
  return (
    <form action={handleSubmit}>
      <label>
        Title
        <input type="text" name="title" />
      </label>

      <label>
        Content
        <textarea name="content"></textarea>
      </label>

      <label>
        Tag
        <select name="tag" className={css.select}>
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </label>

      <div>
        <button type="submit">Create</button>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </form>

    // <Formik
    //   initialValues={initialValues}
    //   validationSchema={OrderFormSchema}
    //   onSubmit={handleSubmit}
    // >
    //   <Form className={css.form}>
    //     <fieldset>
    //       <div className={css.formGroup}>
    //         <label htmlFor={`${fieldId}-title`}>Title</label>
    //         <Field
    //           id={`${fieldId}-title`}
    //           type="text"
    //           name="title"
    //           className={css.input}
    //         />
    //         <ErrorMessage name="title" component="span" className={css.error} />
    //       </div>
    //       <div className={css.formGroup}>
    //         <label htmlFor={`${fieldId}-content`}>Content</label>
    //         <Field
    //           id={`${fieldId}-content`}
    //           as="textarea"
    //           name="content"
    //           rows={8}
    //           className={css.textarea}
    //         />
    //         <ErrorMessage
    //           name="content"
    //           component="span"
    //           className={css.error}
    //         />
    //       </div>
    //       <div className={css.formGroup}>
    //         <label htmlFor={`${fieldId}-tag`}>Tag</label>
    //         <Field
    //           as="select"
    //           id={`${fieldId}-tag`}
    //           name="tag"
    //           className={css.select}
    //         >
    //           <option value="Todo">Todo</option>
    //           <option value="Work">Work</option>
    //           <option value="Personal">Personal</option>
    //           <option value="Meeting">Meeting</option>
    //           <option value="Shopping">Shopping</option>
    //         </Field>
    //         <ErrorMessage name="tag" component="span" className={css.error} />
    //       </div>
    //     </fieldset>

    //     <div className={css.actions}>
    //       <button type="submit" className={css.submitButton}>
    //         Create note
    //       </button>
    //     </div>
    //   </Form>
    // </Formik>
  );
}
