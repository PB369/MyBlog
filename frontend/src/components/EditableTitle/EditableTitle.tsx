import { useEffect, useRef, useState } from 'react'
import styles from './css/EditableTitle.module.scss'

type Props = {
  isNewArticle: boolean,
  articleTitle: string,
  setArticleTitle: (value: string) => void,
}

const EditableTitle = ({articleTitle, setArticleTitle}: Props) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const titleRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(()=>{
    if(articleTitle) {
      setTitle(articleTitle)
    }
  }, [articleTitle]);

  useEffect(()=>{
    setArticleTitle(title);
  }, [title, setArticleTitle]);
  
  const handleTextChange = (newTitle: string) => {
    setTitle(newTitle);
    setArticleTitle(title);
  };

  const adjustTextareasHeight = () => {
    const titleElement = titleRef.current
    if (titleElement) {
      titleElement.style.height = "auto";
      titleElement.style.height = titleElement.scrollHeight + "px";
    }
};

useEffect(() => {
    const handleResize = () => {
        adjustTextareasHeight();
    };

    window.addEventListener('resize', handleResize);

    return () => {
        window.removeEventListener('resize', handleResize);
    };
}, []);


useEffect(() => {
    adjustTextareasHeight();
}, [title]);

  return (
    <textarea
      key={8}
      ref={titleRef}
      className={styles.title}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onKeyDown={(e) => {if(e.key === 'Enter'){e.preventDefault(); (e.target as HTMLTextAreaElement).blur()}}}
      value={title}
      placeholder={title === "" ? "Add a title" : ""}
      onChange={(event) => handleTextChange(event.target.value)}
      // onKeyDown={(e) => e.key === "Enter" && setEditingId(null)}
      rows={1}
      spellCheck={isFocused}
    />
  )
}

export default EditableTitle;