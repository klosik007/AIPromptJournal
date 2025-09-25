import React from "react";

type PromptsModalProps = {
  modalVisibility: string;
  setModalVisibilityOnClose: (value: string) => void;
}

export function TagsModal({ modalVisibility, setModalVisibilityOnClose }: PromptsModalProps) {
    //TODO: make this function reusable
    window.onclick = function(event) {
        const modal = document.getElementById("tagsModal");

        if (event.target === modal) {
            setModalVisibilityOnClose('none');
        }
    }

    //TODO: make this function reusable
    const closeModal = () => {
        setModalVisibilityOnClose('none');
    }

    return (
        <div id="tagsModal" className="modal" style={{display: modalVisibility}}>
            <div className="modalContent">
                <span className="close" onClick={closeModal}>&times;</span>
                <h2>Modal Header</h2>
                <p>Tags Modal</p>
            </div>
        </div>
    );
}