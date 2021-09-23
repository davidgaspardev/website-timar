import { ReactNode, Children, useEffect } from "react";
import styles from "../styles/BannerSlider.module.css";

/**
 * Properties
 * 
 * @type {Props}
 */
type Props = {
    children?: ReactNode;
};

/**
 * Banner Slider
 * 
 * @param {Props} props 
 * @returns {JSX.Element}
 */
export default function BannerSlider(props: Props): JSX.Element {
    // Destructuring assignment
    const { children }: Props = props;

    useEffect(() => {
        const bannerSlider = document.getElementById("banner-slider");
        let intervalSlider: NodeJS.Timer;

        if(bannerSlider) {
            intervalSlider = setInterval(() => {
                const currentPosition = Number.parseInt(getComputedStyle(bannerSlider).marginLeft);

                if(Math.abs(currentPosition) === ((Children.count(children) - 1) * window.innerWidth)) {
                    bannerSlider.style.marginLeft = "0px";
                } else {
                    bannerSlider.style.marginLeft = `${currentPosition - window.innerWidth}px`
                }
            }, 5000);
        }

        return () => {
            clearInterval(intervalSlider);
        };
    }, [ children ]);

    // Return component
    return (
        <div style={{ overflow: "hidden" }}>
            <div id="banner-slider" className={styles.bannersliderContainer} style={{
                width: `calc(100vw * ${Children.count(children)})`
            }} >
                {
                    children && Children.map(children, (child) => {
                        return (
                            <div>
                                { child }
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
}