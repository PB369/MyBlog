import styles from './css/AddBanner.module.scss'
import { useEffect, useRef, useState } from 'react'

type Props = {
    isNewArticle: boolean,
    setBannerFile: (image: File) => void,
    banner_url: string,
    banner_alt: string,
}

const AddBanner = ({isNewArticle, setBannerFile, banner_url, banner_alt}: Props) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [bannerURL, setBannerURL] = useState<string>(banner_url);
    const labelIconPath = bannerURL === "" ? "/OtherIcons/blackPlus-icon.png" : "/OtherIcons/blackChange-icon.png";

    useEffect(() => {
        if (banner_url) {
            setBannerURL(banner_url);
        }
    }, [banner_url]);

    const handleBtnClick = () => {
        inputRef.current?.click();
    }

    const handleBannerChoice = (event: React.ChangeEvent<HTMLInputElement>) => {
        const image = event.target.files?.[0]
        if(image){
            console.log(image);
            setBannerFile(image);
            banner_url=URL.createObjectURL(image);
            setBannerURL(URL.createObjectURL(image));
        }
    }

    return (
        <>
            <button className={styles.addBannerBtn} onClick={handleBtnClick}>
                <img src={bannerURL} alt={isNewArticle ? "" :banner_alt} className={styles.banner}/>
                <div className={styles.addDivLabel}>
                    <div className={styles.labelIcon}>
                        <img src={labelIconPath} alt="plus-icon" />
                    </div>
                    <p className={styles.addText}>{bannerURL === "" ? "Add an image" : "Change image"}</p>
                </div>
            </button>
            <input type="file" accept='image/*' ref={inputRef} style={{display:"none"}} onChange={handleBannerChoice} />
        </>
    )
}

export default AddBanner