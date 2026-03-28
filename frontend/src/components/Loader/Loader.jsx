import React, { useState, useEffect, useRef } from "react";
import "./Loader.css";

const Loader = () => {
    return (
        <div className="loader-wrapper">
            <div className="loader-box">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
            </div>
        </div>
    );
};

export default Loader;