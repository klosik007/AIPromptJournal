import { PromptObject } from "../types/Prompts"

export default function PromptContent({ title, promptContent, effectiveness, tags }: PromptObject) {
    return (
        <>
            <div className="box">
                <b>{title}</b>
                <p>{promptContent}</p>
                <b>Effectiveness</b>
                <p>{effectiveness}</p>
                <b>Tags</b>
                <p>{tags.join(", ")}</p>
            </div>
        </>
    )
}
