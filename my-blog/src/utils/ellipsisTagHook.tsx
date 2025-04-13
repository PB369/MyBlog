import { useEffect, useRef, useState } from "react";

interface UseCheckEllipsisTagReturn {
  visibleTags: string[],
  hasEllipsis: boolean,
  divRef: React.RefObject<HTMLDivElement | null>;
}

export const useCheckEllipsisTag = (tagsList: string[], urlPage: string):UseCheckEllipsisTagReturn => {
  const [hasEllipsis, setHasEllipsis] = useState<boolean>(false);

  const isDesktop = window.matchMedia("(min-width: 768px)");
  
  const [visibleTags, setVisibleTags] = useState<string[]>([]);
  
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(()=>{
    const totalTagsNum = tagsList.length;
    const tagsContainer = divRef.current!;
    const grandParant = tagsContainer.parentElement?.parentElement;
    if(!grandParant) return;
    
    const observer = new ResizeObserver(() => {
      if(!grandParant) return;
      const grandParantWidth = grandParant.offsetWidth;
      const spanList = Array.from(tagsContainer.children) as HTMLElement[];

      // the initial value is for correct calculation
      let tagsTotalWidth: number;
      if(urlPage === "/management" && isDesktop){
        tagsTotalWidth = 40 + 127;
      } else {
        tagsTotalWidth = 40;
      }

      let tagsOverflow = false;
      const visibleTagsList:string[] = [];

      for(let i = 0; i < spanList.length; i++) {
        if ((i) === totalTagsNum){
          tagsOverflow = false;
          break;
        } else {
          const span = spanList[i];
          const marginRight = parseFloat(getComputedStyle(span).marginRight);
          const marginLeft = parseFloat(getComputedStyle(span).marginLeft);
          tagsTotalWidth += (span.offsetWidth + marginRight + marginLeft);
          if(tagsTotalWidth > grandParantWidth){
            tagsOverflow = true;
            break;
          }
          visibleTagsList.push(span.innerHTML);
        }
        
      }
      console.log(`Tags Width: ${tagsTotalWidth} px`)
      console.log(`Container Width: ${grandParantWidth} px`)
      
      setHasEllipsis(tagsOverflow);
      setVisibleTags(visibleTagsList);
      tagsOverflow = false;
    });

    observer.observe(grandParant);
    return () => observer.disconnect();
  }, [tagsList])

  return { visibleTags, hasEllipsis, divRef };
}