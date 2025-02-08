import close from '../assets/close.svg'

type TagButtonProps = {
    name: string
}

export default function TagButton({ name }: TagButtonProps) {
    return (
        <>
            <span className="tagButton"><img src={close} /> {name}</span>
        </>
    )
}