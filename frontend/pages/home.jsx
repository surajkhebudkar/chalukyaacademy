import Navbar from "../components/Navbar";

function Home() {
    return (
        <>
            <Navbar />

            <section className="hero section">
                <div className="container">

                    <div className="row align-items-center">

                        <div className="col-lg-6">
                            <h1>
                                Excellence in <span className="highlight">Sports</span>
                            </h1>

                            <p>
                                Welcome to Chalukya Sports Academy. Build your strength,
                                discipline and performance with expert coaching.
                            </p>

                            <button className="btn btn-primary">
                                Join Now
                            </button>
                        </div>

                        <div className="col-lg-6">
                            <img
                                src="/assets/img/health/staff-10.webp"
                                className="img-fluid"
                                alt="sports"
                            />
                        </div>

                    </div>

                </div>
            </section>

        </>
    );
}

export default Home;