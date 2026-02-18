import React, { useState, useEffect } from "react";
import { PromptObject } from "../types/Prompts";
import { PromptEditor } from "./PromptEditor";

type PromptsModalProps = {
  modalVisibility: string;
  setModalVisibilityOnClose: (value: string) => void;
}

export function PromptsModal({ modalVisibility, setModalVisibilityOnClose }: PromptsModalProps) {
    const [prompts, setPrompts] = useState<PromptObject[]>([]);
    const [editorVisible, setEditorVisible] = useState('none');
    const [editingPrompt, setEditingPrompt] = useState<PromptObject | undefined>();
    const [editingIndex, setEditingIndex] = useState<number | undefined>();

    useEffect(() => {
        const promptKeys = Object.keys(localStorage).filter(key => key.includes("prompt_"));
        const loadedPrompts = promptKeys.map(key => JSON.parse(localStorage.getItem(key) || "{}"));
        setPrompts(loadedPrompts);
    }, [modalVisibility, editorVisible]);

    window.onclick = function(event) {
        const modal = document.getElementById("promptsModal");
        if (event.target === modal) {
            setModalVisibilityOnClose('none');
        }
    }

    const closeModal = () => {
        setModalVisibilityOnClose('none');
    }

    const handleEdit = (index: number) => {
        setEditingPrompt(prompts[index]);
        setEditingIndex(index);
        setEditorVisible('block');
    }

    const handleAdd = () => {
        setEditingPrompt(undefined);
        setEditingIndex(undefined);
        setEditorVisible('block');
    }

    const handleDelete = (index: number) => {
        const promptKeys = Object.keys(localStorage).filter(key => key.includes("prompt_"));
        localStorage.removeItem(promptKeys[index]);
        setPrompts(prompts.filter((_, i) => i !== index));
    }

    return (
        <>
        <div id="promptsModal" className="modal" style={{display: modalVisibility}}>
            <div className="modalContent">
                <span className="close" onClick={closeModal}>&times;</span>
                <h2>Prompts</h2>
                <button onClick={handleAdd} style={{marginBottom: '15px'}}>Add New Prompt</button>
                <ul style={{listStyle: 'none', padding: 0}}>
                    {prompts.map((prompt, index) => (
                        <li key={index} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', borderBottom: '1px solid #ddd'}}>
                            <div>
                                <span>{prompt.title}</span>
                                <span style={{marginLeft: '10px', color: '#666'}}>★ {prompt.effectiveness}/5</span>
                                {prompt.tags.map((tag, i) => (
                                    <span key={i} style={{marginLeft: '10px', padding: '2px 8px', backgroundColor: '#666', color: '#fff', borderRadius: '4px', fontSize: '12px'}}>{tag}</span>
                                ))}
                            </div>
                            <div>
                                <button onClick={() => handleEdit(index)} style={{marginRight: '10px'}}>Edit</button>
                                <button onClick={() => handleDelete(index)}>Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
        <PromptEditor modalVisibility={editorVisible} setModalVisibilityOnClose={setEditorVisible} promptToEdit={editingPrompt} promptIndex={editingIndex} />
        </>
    );
}