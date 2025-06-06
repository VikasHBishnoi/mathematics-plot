import React, { useEffect, useRef } from "react";
import "./FeedbackPopup.scss";

interface FeedbackPopupProps {
    open: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    buttons: { label: string; onClick: () => void }[];
}

const FeedbackPopup: React.FC<FeedbackPopupProps> = ({
    open,
    onClose,
    title = "Feedback",
    children,
    buttons,
}) => {
    const popupRef = useRef<HTMLDivElement>(null);
    const firstBtnRef = useRef<HTMLButtonElement>(null);

    // Focus trap
    useEffect(() => {
        if (!open) return;
        const focusable = popupRef.current?.querySelectorAll<HTMLElement>(
            "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
        );
        const first = focusable?.[0];
        const last = focusable?.[focusable.length - 1];

        const handleTab = (e: KeyboardEvent) => {
            if (e.key !== "Tab" || !focusable) return;
            if (e.shiftKey) {
                if (document.activeElement === first) {
                    e.preventDefault();
                    last?.focus();
                }
            } else if (document.activeElement === last) {
                e.preventDefault();
                first?.focus();

            }
        }

        document.addEventListener("keydown", handleTab);
        return () => document.removeEventListener("keydown", handleTab);
    }, [open]);

    // Auto-focus first button
    useEffect(() => {
        if (open && firstBtnRef.current) {
            firstBtnRef.current.focus();
        }
    }, [open]);

    if (!open) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div
                className="modal-content"
                ref={popupRef}
                tabIndex={-1}
                onClick={e => e.stopPropagation()}
                aria-modal="true"
                role="dialog"
            >
                <h2>{title}</h2>
                <div className="modal-body">{children}</div>
                <div className="modal-actions">
                    {buttons.map((btn, idx) => (
                        <button
                            key={btn.label}
                            ref={idx === 0 ? firstBtnRef : undefined}
                            onClick={btn.onClick}
                        >
                            {btn.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FeedbackPopup;