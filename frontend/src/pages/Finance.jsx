import React from "react";
import "./Finance.css";

export default function Finance() {
    return (
        <section className="finance-page">

            <div className="finance-hero">
                <h1>Finance & Fees</h1>
                <p>Transparent pricing for all training programs</p>
            </div>

            <div className="finance-section">
                <h2>Training Fees</h2>

                <div className="fee-cards">
                    <div className="fee-card">
                        <h3>Beginner</h3>
                        <p className="price">₹1500 / month</p>
                        <ul>
                            <li>Basic Training</li>
                            <li>Fitness Sessions</li>
                            <li>Weekly Practice</li>
                        </ul>
                    </div>

                    <div className="fee-card premium">
                        <h3>Intermediate</h3>
                        <p className="price">₹2500 / month</p>
                        <ul>
                            <li>Advanced Coaching</li>
                            <li>Competition Prep</li>
                            <li>Diet Guidance</li>
                        </ul>
                    </div>

                    <div className="fee-card">
                        <h3>Professional</h3>
                        <p className="price">₹4000 / month</p>
                        <ul>
                            <li>Personal Coach</li>
                            <li>National Level Training</li>
                            <li>Performance Analysis</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="finance-section">
                <h2>Payment Options</h2>

                <div className="payment-methods">
                    <div className="payment-card">UPI / Google Pay</div>
                    <div className="payment-card">Debit / Credit Card</div>
                    <div className="payment-card">Cash Payment</div>
                </div>
            </div>

            <div className="finance-section highlight">
                <h2>Scholarship Program</h2>
                <p>
                    Talented players can apply for scholarships based on performance.
                    Up to 50% fee discount available.
                </p>
            </div>

        </section>
    );
}