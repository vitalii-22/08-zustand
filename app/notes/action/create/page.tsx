import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./CreateNote.module.css";

// interface CreateNoteProps {
//   children: React.ReactNode;
// }

export async function generateMetadata() {
  return {
    title: "Create note",
    description: "Page for writing note",
    https: "https://08-zustand-silk.vercel.app/notes/action/create",
    openGraph: {
      title: "Create note",
      description: "Page for writing note",
      https: "https://08-zustand-silk.vercel.app/notes/action/create",
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "Note hub image",
        },
      ],
    },
  };
}

export default function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>

        <NoteForm />
      </div>
    </main>
  );
}
