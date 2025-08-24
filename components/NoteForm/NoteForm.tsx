"use client";

import { useId } from "react";
import * as Yup from "yup";

import css from "./NoteForm.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { NewNoteData } from "../../types/note";
import { createNote } from "@/lib/api";
import { useRouter } from "next/navigation";

// interface NoteFormProps {
// }

// const OrderFormSchema = Yup.object().shape({
//   title: Yup.string()
//     .min(3, "Title must be at least 3 characters")
//     .max(50, "Title is too long")
//     .required("Title is required"),
//   content: Yup.string().max(500, "Content is too long"),
//   tag: Yup.string()
//     .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"])
//     .required("Tag is required"),
// });

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

  const router = useRouter();

  // const handleCancel = () => router.push("/notes/filter/all");

  const { mutate } = useMutation({
    mutationFn: (noteData: NewNoteData) => createNote(noteData),
    onSuccess: () => {
      router.push("/notes/filter/All");
    },
  });

  const handleSubmit = (formData: FormData) => {
    const values = Object.fromEntries(formData) as unknown as NewNoteData;
    mutate(values);
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
    <form className={css.form} action={handleSubmit}>
      <div className={css.formGroup}>
        <label htmlFor={`${fieldId}-title`}>Title</label>
        <input
          id={`${fieldId}-title`}
          type="text"
          name="title"
          className={css.input}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor={`${fieldId}-content`}>Content</label>
        <textarea
          id={`${fieldId}-content`}
          name="content"
          className={css.textarea}
        ></textarea>
      </div>

      <div className={css.formGroup}>
        <label htmlFor={`${fieldId}-tag`}>Tag</label>
        <select id={`${fieldId}-tag`} name="tag" className={css.select}>
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        <button type="submit" className={css.submitButton}>
          Create note
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
