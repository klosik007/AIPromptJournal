import close from '../assets/close.svg'

type TagButtonProps = {
    name: string
}

export default function TagButton({ name }: TagButtonProps) {
    return (
        <>
            <span className="display-inline-flex tag-button"><img src={close} />{name}</span>
        </>
    )
}