import React, { useState, useEffect } from "react";

type PromptsModalProps = {
  modalVisibility: string;
  setModalVisibilityOnClose: (value: string) => void;
}

export function TagsModal({ modalVisibility, setModalVisibilityOnClose }: PromptsModalProps) {
    const [tags, setTags] = useState<string[]>([]);
    const [newTag, setNewTag] = useState("");

    useEffect(() => {
        const storedTags = localStorage.getItem("tags");
        if (storedTags) {
            setTags(JSON.parse(storedTags));
        } else {
            const defaultTags = ["Debugging", "Code review", "Documentation"];
            localStorage.setItem("tags", JSON.stringify(defaultTags));
            setTags(defaultTags);
        }
    }, [modalVisibility]);

    window.onclick = function(event) {
        const modal = document.getElementById("tagsModal");
        if (event.target === modal) {
            setModalVisibilityOnClose('none');
        }
    }

    const closeModal = () => {
        setModalVisibilityOnClose('none');
    }

    const handleAddTag = () => {
        if (newTag.trim() && !tags.includes(newTag.trim())) {
            const updatedTags = [...tags, newTag.trim()];
            setTags(updatedTags);
            localStorage.setItem("tags", JSON.stringify(updatedTags));
            setNewTag("");
        }
    }

    const handleDeleteTag = (tagToDelete: string) => {
        const updatedTags = tags.filter(tag => tag !== tagToDelete);
        setTags(updatedTags);
        localStorage.setItem("tags", JSON.stringify(updatedTags));
    }

    return (
        <div id="tagsModal" className="modal" style={{display: modalVisibility}}>
            <div className="modalContent">
                <span className="close" onClick={closeModal}>&times;</span>
                <h2>Manage Tags</h2>
                <div style={{marginBottom: '15px'}}>
                    <input type="text" value={newTag} onChange={(e) => setNewTag(e.target.value)} placeholder="New tag name" style={{padding: '8px', marginRight: '10px'}} />
                    <button onClick={handleAddTag}>Add Tag</button>
                </div>
                <ul style={{listStyle: 'none', padding: 0}}>
                    {tags.map((tag, index) => (
                        <li key={index} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', borderBottom: '1px solid #ddd'}}>
                            <span>{tag}</span>
                            <button onClick={() => handleDeleteTag(tag)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}