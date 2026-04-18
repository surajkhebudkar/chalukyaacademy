import { useState, useEffect } from "react";
import "./Home.css";
import RunningLine from "../components/runningLine/RunningLine";
import ImageSlider from "../components/imageSlider/ImageSlider";
import NewsSection from "../components/news/NewsSection";
import PhotoGallerySection from "../components/gallery/PhotoGallerySection";
import BestPlayersSection from "../components/bestPlayers/BestPlayersSection";
import VideoSection from "../components/videosection/VideoSection";

const Home = () => {
    const [text, setText] = useState("");
    const [text2, setText2] = useState("");

    const fullText = "Chalukyas Sports Academy";
    const fullText2 = "Chalukyas Micro Finance";

    useEffect(() => {
        let index1 = 0;
        let index2 = 0;
        let isDeleting = false;
        let timeout;

        const typing = () => {

            if (!isDeleting) {
                setText(fullText.slice(0, index1));
                setText2(fullText2.slice(0, index2));

                index1++;
                index2++;

                if (index1 > fullText.length && index2 > fullText2.length) {
                    isDeleting = true;
                    timeout = setTimeout(typing, 1500);
                    return;
                }

            } else {
                setText(fullText.slice(0, index1));
                setText2(fullText2.slice(0, index2));

                index1--;
                index2--;

                if (index1 === 0 && index2 === 0) {
                    isDeleting = false;
                }
            }

            timeout = setTimeout(typing, isDeleting ? 50 : 100);
        };

        typing();

        return () => clearTimeout(timeout);
    }, []);

    return (
        <>
            <section className="hero section-dark">

                <div className="hero-bg"></div>

                <div className="circle circle1"></div>
                <div className="circle circle2"></div>
                <div className="circle circle3"></div>

                <div className="hero-container">

                    <div className="hero-left">
                        <div className="parentcompany">
                            <h1>
                                Chalukyas Atmanirbhar Sports Foundation
                            </h1>
                        </div>
                        <div className="chaildcompony">
                            <h1 style={{
                                fontSize: "30px",
                            }}>
                                Train With Intencity, Lets Rebuild Dynasty <br />
                            </h1>

                            <h2 style={{
                                fontSize: "30px",
                                fontWeight: "700",
                                color: "#2563eb",
                                marginTop: "10px"
                            }}>
                                <span className="typing">{text}</span>
                            </h2>

                            <h2 style={{
                                marginTop: "8px",
                                fontSize: "30px",
                                fontWeight: "700",
                                color: "#2563eb",
                                letterSpacing: "1px"
                            }}>
                                <span className="typing2">{text2}</span>
                            </h2>
                        </div>

                        <div className="stats">
                            <div>
                                <h3>15+</h3>
                                <p>Years Experience</p>
                            </div>

                            <div>
                                <h3>5000+</h3>
                                <p>Players Trained</p>
                            </div>

                            <div>
                                <h3>50+</h3>
                                <p>Expert Coaches</p>
                            </div>
                        </div>
                    </div>

                    <div className="hero-right">
                        <img
                            src="/chalukyaimages/chlukyaphoto.png"
                            alt="academy"
                        />
                    </div>

                </div>
            </section>
            
            <VideoSection />
            <NewsSection />
            <ImageSlider />
            <PhotoGallerySection />
            <BestPlayersSection />
        </>
    );
};

export default Home;