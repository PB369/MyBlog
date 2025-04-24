import styles from './css/AddBanner.module.scss'
import blackPlusIcon from '../../../public/OtherIcons/blackPlus-icon.png'
import { useRef, useState } from 'react'

type Props = {
    isNewArticle: boolean,
    banner_url: string,
    banner_alt: string,
}

const AddBanner = ({isNewArticle, banner_url, banner_alt}: Props) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [bannerURL, setBannerURL] = useState(banner_url);

    const handleBtnClick = () => {
        inputRef.current?.click()
    }

    const handleBannerChoice = (event: React.ChangeEvent<HTMLInputElement>) => {
        const image = event.target.files?.[0]
        if(image){
            console.log(image);
            banner_url=URL.createObjectURL(image);
            setBannerURL(banner_url)
        }
    }

    return (
        <>
            <button className={styles.addBannerBtn} onClick={handleBtnClick}>
                <img src={bannerURL} alt={isNewArticle ? "" :banner_alt} className={styles.banner}/>
                <div className={styles.addDivLabel}>
                    <div className={styles.plusIcon}>
                        <img src={blackPlusIcon} alt="plus-icon" />
                    </div>
                    <p className={styles.addText}>Add an image</p>
                </div>
            </button>
            <input type="file" accept='image/*' ref={inputRef} style={{display:"none"}} onChange={handleBannerChoice} />
        </>
    )
}

export default AddBanner