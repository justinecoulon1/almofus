import { CharacterDto } from '@/utils/api/dto/character.dto';
import { useTranslations } from 'next-intl';
import styles from './calendar-day.module.css';

export function CalendarDay({ characters, dayindex }: { characters: CharacterDto[], dayindex: number }) {
    const t = useTranslations('almanax-page');
    return (
        <div className={styles.calendarDayContainer}>
            <p>
                {dayindex}
            </p>
        </div >
    );
}
