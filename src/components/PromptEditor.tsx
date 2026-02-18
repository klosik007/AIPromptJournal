import React, { useState, useEffect } from "react";
import { PromptObject } from "../types/Prompts";

type PromptEditorProps = {
  modalVisibility: string;
  setModalVisibilityOnClose: (value: string) => void;
  promptToEdit?: PromptObject;
  promptIndex?: number;
}

export function PromptEditor({ modalVisibility, setModalVisibilityOnClose, promptToEdit, promptIndex }: PromptEditorProps) {
    const [title, setTitle] = useState("");
    const [promptContent, setPromptContent] = useState("");
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [effectiveness, setEffectiveness] = useState(0);
    const [availableTags, setAvailableTags] = useState<string[]>([]);

    useEffect(() => {
        const storedTags = localStorage.getItem("tags");
        if (storedTags) {
            setAvailableTags(JSON.parse(storedTags));
        } else {
            const defaultTags = ["Debugging", "Code review", "Documentation"];
            setAvailableTags(defaultTags);
        }

        if (promptToEdit) {
            setTitle(promptToEdit.title);
            setPromptContent(promptToEdit.promptContent);
            setSelectedTags(promptToEdit.tags);
            setEffectiveness(promptToEdit.effectiveness);
        } else {
            setTitle("");
            setPromptContent("");
            setSelectedTags([]);
            setEffectiveness(0);
        }
    }, [promptToEdit, modalVisibility]);

    const closeModal = () => {
        setModalVisibilityOnClose('none');
    }

    const toggleTag = (tag: string) => {
        setSelectedTags(prev => 
            prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
        );
    }

    const handleSave = () => {
        const prompt: PromptObject = { title, promptContent, effectiveness, tags: selectedTags };
        const key = promptIndex !== undefined 
            ? Object.keys(localStorage).filter(k => k.includes("prompt_"))[promptIndex]
            : `prompt_${Date.now()}`;
        localStorage.setItem(key, JSON.stringify(prompt));
        closeModal();
    }

    return (
        <div id="promptEditorModal" className="modal" style={{display: modalVisibility}}>
            <div className="modalContent">
                <span className="close" onClick={closeModal}>&times;</span>
                <h2>{promptToEdit ? "Edit Prompt" : "Add New Prompt"}</h2>
                <div style={{marginBottom: '15px'}}>
                    <label>Title:</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} style={{width: '100%', padding: '8px', marginTop: '5px'}} />
                </div>
                <div style={{marginBottom: '15px'}}>
                    <label>Prompt Content:</label>
                    <textarea value={promptContent} onChange={(e) => setPromptContent(e.target.value)} style={{width: '100%', padding: '8px', marginTop: '5px', minHeight: '150px'}} />
                </div>
                <div style={{marginBottom: '15px'}}>
                    <label>Tags:</label>
                    <div style={{marginTop: '5px'}}>
                        {availableTags.map(tag => (
                            <label key={tag} style={{marginRight: '15px', display: 'inline-block'}}>
                                <input type="checkbox" checked={selectedTags.includes(tag)} onChange={() => toggleTag(tag)} style={{marginRight: '5px'}} />
                                {tag}
                            </label>
                        ))}
                    </div>
                </div>
                <div style={{marginBottom: '15px'}}>
                    <label>Effectiveness (0-5):</label>
                    <input type="number" min="0" max="5" value={effectiveness} onChange={(e) => setEffectiveness(Number(e.target.value))} style={{width: '60px', padding: '8px', marginLeft: '10px'}} />
                </div>
                <button onClick={handleSave}>Save</button>
                <button onClick={closeModal} style={{marginLeft: '10px'}}>Cancel</button>
            </div>
        </div>
    );
}
