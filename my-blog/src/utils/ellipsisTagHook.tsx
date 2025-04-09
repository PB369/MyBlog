import { useEffect, useRef, useState } from "react";

export const useCheckEllipsisTag = (tagsList: string[]) => {
  const [hasEllipsis , setHasEllipsis] = useState<boolean>(false);
  
  const [visibleTags, setVisibleTags] = useState<string[]>([]);
  
  const div = useRef<HTMLDivElement>(null);

  useEffect(()=>{
    const tagsContainer = div.current;
    
    if(!tagsContainer) return;
  
    const spanList = Array.from(tagsContainer.children) as HTMLElement[];
    let tagsTotalWidth = 0;
    const visibleTagsList:string[] = []
    let tagsOverflow = false;
  
    for(let i = 0; i < spanList.length; i++) {
      const span = spanList[i];
      tagsTotalWidth += span.offsetWidth;
  
      if(tagsTotalWidth > tagsContainer.offsetWidth){
        tagsOverflow = true;
        break;
      }
      visibleTagsList.push(span.innerText);
    }
  
    setHasEllipsis(tagsOverflow);
    setVisibleTags(visibleTagsList);
  }, [tagsList])
}