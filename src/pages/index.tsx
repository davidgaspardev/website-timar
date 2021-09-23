import { BannerSlider, Header } from "../components";
import Banner from "../components/banner";
import { banners } from "../helpers/contants";
import { BannerData } from "../helpers/types";

/**
 * Home Page
 * 
 * @returns {JSX.Element}
 */
export default function HomePage(): JSX.Element {

    // Return page
    return (
        <div>
            
            { /** BANNER */ }
            <section className="block" style={{
                height: "calc(var(--vh, 1vh) * 100)"
                // backgroundImage: "url(https://images.alphacoders.com/893/893791.png)"
            }} >

                <BannerSlider>

                    {
                        banners.map((banner: BannerData, index: number) => <Banner key={index} data={banner} />)
                    }

                </BannerSlider>

                <Header mode="scroll-to-fixed" />

            </section>

            { /** INTRODUTION */ }
            <section className="block children-center">
                <h1>COMO PODEMOS TE AJUDAR ?</h1>

                <div>

                </div>
            </section>

            { /** */ }
        </div>
    );
}