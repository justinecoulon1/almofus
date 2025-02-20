import Image from "next/image";

export function GenericButtonWithImage({
    buttonStyle,
    buttonLabel,
    onClick,
    onKeyDown,
    imageSrc,
    imageStyle,
    imageLabel,
    imageSize = 512
}: {
    buttonStyle: string;
    buttonLabel?: string;
    onClick: () => void;
    onKeyDown: (e: any) => void;
    imageSrc: string;
    imageStyle: string;
    imageLabel: string;
    imageSize?: number;
}) {
    return (
        <button className={buttonStyle} onClick={onClick} onKeyDown={onKeyDown}>
            <Image
                className={imageStyle}
                src={imageSrc}
                alt={imageLabel}
                width={imageSize}
                height={imageSize}
            />
        </button>
    )
}