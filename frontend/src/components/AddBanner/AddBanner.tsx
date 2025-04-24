import styles from './css/AddBanner.module.scss'
import blackPlusIcon from '../../../public/OtherIcons/blackPlus-icon.png'

type Props = {
    isNewArticle: boolean,
    banner_url: string,
    banner_alt: string,
}

const AddBanner = ({isNewArticle, banner_url, banner_alt}: Props) => {
    return (
        <>
            <button className={styles.addBannerBtn}>
                <img src={isNewArticle ? undefined : banner_url} alt={isNewArticle ? "" :banner_alt} className={styles.banner}/>
                <div className={styles.addDivLabel}>
                    <div className={styles.plusIcon}>
                        <img src={blackPlusIcon} alt="plus-icon" />
                    </div>
                    <p className={styles.addText}>Add an image</p>
                </div>
            </button>
        </>
    )
}

export default AddBanner