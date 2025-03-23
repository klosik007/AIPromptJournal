import close from "../assets/close.svg";

type TagButtonProps = {
  name: string;
  onClick: (name: string) => () => void;
};

export default function TagButton({ name, onClick }: TagButtonProps) {
  return (
    <>
      <span className="display-inline-flex tag-button" onClick={onClick(name)}>
        <img src={close} />
        {name}
      </span>
    </>
  );
}
