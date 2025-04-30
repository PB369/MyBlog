import { useEffect, useRef, useState } from 'react';
import styles from './css/EditableParagraph.module.scss'
import { useThemedIcon } from '../../hooks/ConditionalsHooks';

type Props = {
    isNewArticle: boolean,
    content: string,
}

type Paragraph = {
    id: number,
    text: string,
}

const EditableParagraph = ({content}: Props) => {
    //It's important to note that the paragraphs here are represented as textarea tags, not as p tags.
    const confirmIconPath = useThemedIcon("check-icon.png");
    const deleteIconPath = useThemedIcon("trash-v2-icon.png");
    const copyIconPath = useThemedIcon("copy-icon.png");
    
    const [paragraphs, setParagraphs] = useState<Paragraph[]>([]);
    const [nextId, setNextId] = useState(0);
    const textAreaRefs = useRef<Record<number, HTMLTextAreaElement | null>>({});
    const [isFocused, setIsFocused] = useState<boolean>(false);

    useEffect(() => {
        if (content) {
            const paragraphsArray = content.split('-&@&-').filter(p => p.trim() !== '');
            const paragraphObjs = paragraphsArray.map((text, index) => ({
                id: index + 1,
                text: text.trim(),
            }));
            setParagraphs(paragraphObjs);
            setNextId(paragraphObjs.length + 1);
        }
    }, [content]);

    const adjustTextareasHeight = () => {
        Object.values(textAreaRefs.current).forEach((element) => {
            if (element) {
              element.style.height = "auto";
              element.style.height = element.scrollHeight + "px";
            }
        })
    };

    useEffect(() => {
        adjustTextareasHeight();
    }, [paragraphs]);

    const handleTextChange = (id: number, newText: string, textareaElement: HTMLTextAreaElement) => {
        setParagraphs((prev) =>
        prev.map((p) => (p.id === id ? { ...p, text: newText } : p))
        );
        textareaElement.style.height = "auto";
        textareaElement.style.height = textareaElement.scrollHeight + "px";
    };

    const handleAddParagraph = () => {
        const newParagraph = { id: nextId, text: "" };
        setParagraphs((prev) => [...prev, newParagraph]);
        setNextId((id) => id + 1);
        setTimeout(() => {
            const newParagraph = textAreaRefs.current[nextId];
            if(newParagraph){newParagraph.focus()}
        }, 0);
    };

    return (
        <div className={styles.contentContainer}>
        {paragraphs.map((p) => (
            <div className={styles.paragraphContainer}>
                <textarea
                    key={p.id}
                    ref={(el) => {textAreaRefs.current[p.id] = el}}
                    className={styles.textArea}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    onKeyDown={(e) => {if(e.key === 'Enter'){e.preventDefault(); (e.target as HTMLTextAreaElement).blur()}}}
                    value={p.text}
                    onChange={(e) => handleTextChange(p.id, e.target.value, e.target)}
                    // onKeyDown={(e) => e.key === "Enter" && setEditingId(null)}
                    rows={1}
                    spellCheck={isFocused}
                />
                <div className={styles.buttonsContainer}>
                    <button className={styles.confirmIcon}><img src={confirmIconPath} alt="delete-icon" /></button>
                    <button className={styles.deleteIcon}><img src={deleteIconPath} alt="delete-icon" /></button>
                </div>
                <br/>
            </div>
        )
        )}

        <p className={styles.addParagraph} onClick={handleAddParagraph}>
            Add a paragraph
        </p>
        </div>
        )
}

export default EditableParagraph