import { useTranslations } from "next-intl";
import { PrimaryLink } from "@/components/generic/links/link";

export function ShoppingListLink() {
    const t = useTranslations('header');
    return (
        <PrimaryLink label={t('shopping')} href={'/shopping'} />
    );
}