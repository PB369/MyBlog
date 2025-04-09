import { useEffect, useRef, useState } from "react";

interface UseCheckEllipsisTagReturn {
  visibleTags: string[],
  hasEllipsis: boolean,
  divRef: React.RefObject<HTMLDivElement | null>;
}

export const useCheckEllipsisTag = (tagsList: string[]):UseCheckEllipsisTagReturn => {
  const [hasEllipsis, setHasEllipsis] = useState<boolean>(false);
  
  const [visibleTags, setVisibleTags] = useState<string[]>([]);
  
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(()=>{
    if(!divRef.current) return;
    
    const observer = new ResizeObserver(() => {
      const tagsContainer = divRef.current!;
      const spanList = Array.from(tagsContainer.children) as HTMLElement[];
      let tagsTotalWidth = 0;
      let tagsOverflow = false;
      const visibleTagsList:string[] = [];

      for(let i = 0; i < spanList.length; i++) {
        const span = spanList[i];
        tagsTotalWidth += span.offsetWidth;
        if(tagsTotalWidth > tagsContainer.offsetWidth){
          tagsOverflow = true;
          break;
        }
        
        visibleTagsList.push(span.innerHTML);
        console.log(`Tags Width: ${tagsTotalWidth} px`)
        console.log(`Container Width: ${tagsContainer.offsetWidth} px`)
      }
    
      setHasEllipsis(tagsOverflow);
      setVisibleTags(visibleTagsList);
    });

    observer.observe(divRef.current);
    return () => observer.disconnect();
  }, [tagsList])

  return { visibleTags, hasEllipsis, divRef };
}