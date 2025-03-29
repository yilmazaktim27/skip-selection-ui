import React, { useState, useEffect } from "react";
import "./SkipSelection.css";

const SkipSelection = () => {
    const [skips, setSkips] = useState([]);
    const [selectedSkipId, setSelectedSkipId] = useState(null);

    useEffect(() => {
        fetch("https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft")
            .then((res) => res.json())
            .then((data) => setSkips(data))
            .catch((error) => console.error("Error fetching skip data:", error));
    }, []);

    const handleSelect = (skipId) => {
        setSelectedSkipId((prevSelected) => (prevSelected === skipId ? null : skipId));
    };

    // Find the currently selected skip object (for bottom bar info).
    const selectedSkip = skips.find((skip) => skip.id === selectedSkipId);

    // Example: daily hire cost, if desired.
    let dayHirePrice = null;
    if (selectedSkip) {
        const totalPrice = selectedSkip.price_before_vat + selectedSkip.vat;
        dayHirePrice = (totalPrice / selectedSkip.hire_period_days).toFixed(2);
    }

    return (
        <div className="skip-selection-container">
            {/* TOP BAR: steps navigation */}
            <div className="top-bar">
                <div className="top-bar-content">
                    <nav className="steps-nav">
                        <ul className="steps">
                            <li className="completed"><span className="step-label">Postcode</span></li>
                            <li className="completed"><span className="step-label">Waste Type</span></li>
                            <li className="current"><span className="step-label-current">Select Skip</span></li>
                            <li><span className="step-label">Permit Check</span></li>
                            <li><span className="step-label">Choose Date</span></li>
                            <li><span className="step-label">Payment</span></li>
                        </ul>
                    </nav>
                </div>
            </div>

            {/* HERO HEADER SECTION */}
            <div className="hero-header">
                <h1>Choose Your Skip Size</h1>
                <h2>Select the skip size that best suits your needs</h2>
            </div>

            {/* MAIN CONTENT WRAPPER */}
            <div className="skip-selection-content">
                {/* Cards Grid */}
                <div className="cards-grid">
                    {skips.map((skip) => {
                        const isSelected = skip.id === selectedSkipId;
                        const totalPrice = skip.price_before_vat + skip.vat;
                        const pricePerWeek = (totalPrice / 2).toFixed(2);

                        // If skip is restricted for both road & heavy waste, disable selection
                        const selectDisabled = !skip.allowed_on_road && !skip.allows_heavy_waste;

                        return (
                            <div
                                key={skip.id}
                                className={`skip-card ${isSelected ? "selected" : ""}`}
                                onClick={() => !selectDisabled && handleSelect(skip.id)}
                            >
                                {/* Badge (top-right corner) */}
                                <div className="card-badge">{skip.size} Yards</div>

                                <div className="card-content">
                                    <h3 className="skip-title">{skip.size} Yard Skip</h3>
                                    <p className="hire-period">{skip.hire_period_days} day hire period</p>
                                    <p className="price">
                                        £{pricePerWeek} <span className="per-week">per week</span>
                                    </p>

                                    {/* Notices */}
                                    {!skip.allowed_on_road && <p className="notice">Private Property Only</p>}
                                    {!skip.allows_heavy_waste && (
                                        <p className="notice">Not Suitable for Heavy Waste</p>
                                    )}

                                    {/* Select/Unselect button */}
                                    <button
                                        className="select-button"
                                        disabled={selectDisabled}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            if (!selectDisabled) handleSelect(skip.id);
                                        }}
                                    >
                                        {isSelected ? "Unselect" : "Select This Skip >"}
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* BOTTOM BAR: Only show if a skip is selected */}
            {selectedSkip && (
                <div className="bottom-bar">
                    <div className="bottom-bar-content">
                        <div className="selected-skip-info">
                            <span className="skip-size">
                                {selectedSkip.size} Yard Skip
                            </span>
                            {dayHirePrice && (
                                <span className="skip-hire">
                                    £{dayHirePrice} day hire
                                </span>
                            )}
                        </div>
                        <div className="bottom-bar-actions">
                            <button className="back-button">Back</button>
                            <button className="continue-button">Continue</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SkipSelection;
