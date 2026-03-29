import { useEffect, useState } from "react";
import "./RunningLine.css";

const RunningLine = () => {
    const [show, setShow] = useState(true);

    // ✅ future backend compatible structure
    const data = [
        {
            type: "news",
            title: "New Tournament Registration Open",
            createdAt: "2026-03-28",
        },
        {
            type: "event",
            title: "Summer Camp 2026",
            eventDate: "2026-04-05",
        },
        {
            type: "gallery",
            title: "Archery Championship 2026",
            createdAt: "2026-03-27",
        },
    ];

    // ✅ format text (UI clean)
    const formatText = (item) => {
        if (item.type === "news") {
            return `📰 ${item.title}`;
        }

        if (item.type === "event") {
            return `🏆 ${item.title} - Register Now`;
        }

        if (item.type === "gallery") {
            return `📸 ${item.title} Album updated`;
        }

        return item.title;
    };

    // ✅ main filter logic
    const getValidData = () => {
        const today = new Date();

        return data.filter((item) => {
            // news + gallery = 3 days
            if (item.type === "news" || item.type === "gallery") {
                const created = new Date(item.createdAt);
                const diff = (today - created) / (1000 * 60 * 60 * 24);
                return diff <= 3;
            }

            // event = till event date
            if (item.type === "event") {
                const eventDate = new Date(item.eventDate);
                return today <= eventDate;
            }

            return false;
        });
    };

    const validData = getValidData();

    useEffect(() => {
        if (validData.length === 0) {
            setShow(false);
        }
    }, [validData]);

    if (!show) return null;

    return (
        <div className="running-line">
            <div className="running-track">
                {validData.map((item, index) => (
                    <span
                        key={index}
                        className="running-item"
                        dangerouslySetInnerHTML={{
                            __html: highlightText(formatText(item)),
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

const highlightText = (text) => {
    return text.replace(
        /Tournament|Camp|Batch|Album|Register/gi,
        (match) => `<span class="highlight">${match}</span>`
    );
};

export default RunningLine;