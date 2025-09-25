import React from "react";

type PromptsModalProps = {
  modalVisibility: string;
  setModalVisibilityOnClose: (value: string) => void;
}

export function PromptsModal({ modalVisibility, setModalVisibilityOnClose }: PromptsModalProps) {
    window.onclick = function(event) {
        const modal = document.getElementById("promptsModal");

        if (event.target === modal) {
            setModalVisibilityOnClose('none');
        }
    }

    const closeModal = () => {
        setModalVisibilityOnClose('none');
    }

    return (
        <div id="promptsModal" className="modal" style={{display: modalVisibility}}>
            <div className="modalContent">
                <span className="close" onClick={closeModal}>&times;</span>
                <p>Some text in the Modal..</p>
            </div>
        </div>
    );
}