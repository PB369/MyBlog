type Props = {
    isNewArticle: boolean,
    content: string,
}

const AddParagraph = ({isNewArticle, content}: Props) => {
  let haveAddParagraph: boolean = false;

  return (
    <>
        {(() => {
            if(isNewArticle) {
            haveAddParagraph = true;
            return <p>Add a paragraph</p>
            } else {
                haveAddParagraph = false;
                return content.split("\n\n").map((text, index, arr) =>
                (
                <div key={index}>
                    <p>{text}</p>
                    {index !== (arr.length - 1) && <br/>}
                </div>)
                )
            }
        })()}
        {haveAddParagraph ? null : <><br/><p>Add a paragraph</p></>}
    </>
    )
}

export default AddParagraph