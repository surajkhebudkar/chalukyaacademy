import React from "react";
import "./Finance.css";

export default function Finance() {
    return (
        <section className="finance-page">

            <div className="finance-hero">
                <h1>Finance & Loan Services</h1>
                <p>Easy Loan Options with Transparent Process</p>
            </div>

            <div className="finance-section">
                <h2>Available Loan Types</h2>

                <div className="loan-cards">

                    <div className="loan-card">
                        <h3>Personal Loan</h3>
                        <p className="amount">Up to ₹10,00,000</p>
                        <p className="rate">Interest Rate: 10.5% - 16% p.a.</p>
                        <ul>
                            <li>Quick Approval</li>
                            <li>No Collateral Required</li>
                            <li>Flexible EMI Options</li>
                        </ul>
                    </div>

                    <div className="loan-card premium">
                        <h3>Home Loan</h3>
                        <p className="amount">Up to ₹1,50,00,000</p>
                        <p className="rate">Interest Rate: 8.4% - 10% p.a.</p>
                        <ul>
                            <li>Low Interest Rate</li>
                            <li>Long Repayment Period</li>
                            <li>Balance Transfer Available</li>
                        </ul>
                    </div>

                    <div className="loan-card">
                        <h3>Car Loan</h3>
                        <p className="amount">Up to ₹25,00,000</p>
                        <p className="rate">Interest Rate: 8.8% - 12% p.a.</p>
                        <ul>
                            <li>New & Used Car Finance</li>
                            <li>Fast Processing</li>
                            <li>Low Down Payment</li>
                        </ul>
                    </div>

                    <div className="loan-card">
                        <h3>Bike Loan</h3>
                        <p className="amount">Up to ₹3,00,000</p>
                        <p className="rate">Interest Rate: 9% - 14% p.a.</p>
                        <ul>
                            <li>Easy Approval</li>
                            <li>Minimum Documentation</li>
                            <li>Flexible Tenure</li>
                        </ul>
                    </div>

                    <div className="loan-card">
                        <h3>Business Loan</h3>
                        <p className="amount">Up to ₹50,00,000</p>
                        <p className="rate">Interest Rate: 11% - 18% p.a.</p>
                        <ul>
                            <li>Working Capital Support</li>
                            <li>Business Expansion</li>
                            <li>Quick Disbursal</li>
                        </ul>
                    </div>

                    <div className="loan-card">
                        <h3>Education Loan</h3>
                        <p className="amount">Up to ₹20,00,000</p>
                        <p className="rate">Interest Rate: 9.5% - 13% p.a.</p>
                        <ul>
                            <li>Study in India & Abroad</li>
                            <li>Moratorium Period</li>
                            <li>Flexible Repayment</li>
                        </ul>
                    </div>

                </div>
            </div>

            <div className="finance-section">
                <h2>Required Documents</h2>

                <div className="documents-box">
                    <ul>
                        <li>Aadhar Card</li>
                        <li>PAN Card</li>
                        <li>Passport Size Photos</li>
                        <li>Bank Statement (Last 6 Months)</li>
                        <li>Salary Slip (Last 3 Months)</li>
                        <li>IT Return / Form 16</li>
                        <li>Address Proof</li>
                        <li>Income Proof</li>
                        <li>Property Papers (For Home Loan)</li>
                        <li>Vehicle Quotation (For Car/Bike Loan)</li>
                    </ul>
                </div>
            </div>

            <div className="finance-section">
                <h2>Why Choose Our Loan Services?</h2>

                <div className="features-grid">
                    <div className="feature-card">Fast Loan Approval</div>
                    <div className="feature-card">Low Interest Rates</div>
                    <div className="feature-card">Flexible EMI Options</div>
                    <div className="feature-card">Minimum Documentation</div>
                    <div className="feature-card">Trusted Financial Support</div>
                    <div className="feature-card">Expert Loan Guidance</div>
                </div>
            </div>

            <div className="finance-section highlight">
                <h2>Special Financial Assistance</h2>
                <p>
                    Get pre-approved loan offers with special discounts on
                    processing fees. Limited time support available for selected customers.
                </p>
            </div>

        </section>
    );
}