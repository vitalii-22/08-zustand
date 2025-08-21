import Link from "next/link";
import css from "./SidebarNotes.module.css";

export const tags: string[] = [
  "All",
  "Work",
  "Personal",
  "Meeting",
  "Shopping",
  "Todo",
];

export default function SidebarNotes() {
  return (
    <>
      <Link href="/notes/action/create">Create note</Link>
      <ul className={css.menuList}>
        {tags.map((tag) => (
          <li key={tag} className={css.menuItem}>
            <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
              {tag}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
