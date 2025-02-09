export type PromptObject = {
    title: string,
    promptContent: string,
    effectiveness: number,
    tags: string[]
}

export type Prompts = {
    promptsContent: Array<PromptObject>
}
