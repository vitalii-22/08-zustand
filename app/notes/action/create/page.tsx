import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./CreateNote.module.css";

// interface CreateNoteProps {
//   children: React.ReactNode;
// }

export async function generateMetadata({ params }: NoteDetailsProps) {
  const { id } = await params;
  const note = await fetchNoteById(id);
  return {
    title: "Create note",
    description: "Page for writing note",
    openGraph: {
      title: ` ${note.title}`,
      description: `${note.content}`,
      url: "https://08-zustand-silk.vercel.app/",
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
