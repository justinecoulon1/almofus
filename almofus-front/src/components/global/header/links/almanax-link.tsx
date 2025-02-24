import { useTranslations } from "next-intl";
import { SecondaryLink } from "@/components/generic/links/link";

export function AlmanaxLink() {
    const t = useTranslations('header');
    return (
        <SecondaryLink label={t('almanax')} href={'/almanax'} />
    );
}