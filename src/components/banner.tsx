import { BannerData } from '../helpers/types';
import Image from 'next/image';
import styles from '../styles/Banner.module.css';

type Props = {
    data: BannerData;
};

export default function Banner(props: Props): JSX.Element {
    // Destructuring assignment
    const { data }: Props = props;

    return (
        <div className={styles.bannerContainer} style={{
            backgroundImage: `url(${data.image})`
        }} >

            <div className={styles.bannerFilter} >

            </div>

            <div className={styles.bannerContent} >
                <h1>{data.title}</h1>
                <p>{data.description}</p>

                <a href={data.button.link} >{data.button.name}</a>
            </div>

        </div>
    );
}