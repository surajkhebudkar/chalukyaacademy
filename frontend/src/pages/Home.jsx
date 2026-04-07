import { useState, useEffect } from "react";
import "./Home.css";
import RunningLine from "../components/runningLine/RunningLine";
import ImageSlider from "../components/imageSlider/ImageSlider";
import NewsSection from "../components/news/NewsSection";
import PhotoGallerySection from "../components/gallery/PhotoGallerySection";
import BestPlayersSection from "../components/bestPlayers/BestPlayersSection";


const Home = () => {
    const [text, setText] = useState("");
    const fullText = "Chalukaya Sports Academy";

    useEffect(() => {
        let index = 0;
        let isDeleting = false;
        let timeout;

        const typing = () => {
            if (!isDeleting) {
                setText(fullText.slice(0, index + 1));
                index++;

                if (index === fullText.length) {
                    isDeleting = true;
                    timeout = setTimeout(typing, 2000);
                    return;
                }
            } else {
                setText(fullText.slice(0, index - 1));
                index--;

                if (index === 0) {
                    isDeleting = false;
                }
            }

            timeout = setTimeout(typing, isDeleting ? 60 : 120);
        };

        typing();

        return () => clearTimeout(timeout);
    }, []);

    return (
        <>
            {/* HERO SECTION */}
            <section className="hero section-dark">

                {/* Background */}
                <div className="hero-bg"></div>

                {/* Floating Shapes */}
                <div className="circle circle1"></div>
                <div className="circle circle2"></div>
                <div className="circle circle3"></div>

                <div className="hero-container">

                    {/* LEFT */}
                    <div className="hero-left">
                        <h1>
                            Train With Intencity, Lets Rebuild Dencity <br />
                            {" "}
                            <span className="typing">{text}</span>
                        </h1>

                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </p>

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

                    {/* RIGHT */}
                    <div className="hero-right">
                        <img
                            src="/chalukyaimages/chlukyaphoto.png"
                            alt="academy"
                        />
                    </div>

                </div>
            </section>

            <RunningLine />
            <NewsSection />
            <ImageSlider />
            <PhotoGallerySection />
            <BestPlayersSection />
        </>
    );
};

export default Home;