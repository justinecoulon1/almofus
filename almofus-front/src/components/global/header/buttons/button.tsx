
export function Button({
    style,
    label,
    onClick,
    onKeyDown,
}: {
    style: string;
    label: string;
    onClick: () => void;
    onKeyDown?: (e: any) => void;
}) {
    return (
        <button className={style} onClick={onClick} onKeyDown={onKeyDown}>
            {label}
        </button>
    )
}