import styles from './calendar-header.module.css';
import { SecondaryDarkButtonWithImage } from '@/components/generic/buttons/button-img';
import { Dayjs } from 'dayjs';
import { Dispatch, SetStateAction, useState } from 'react';

export function CalendarHeader(
    {
        currentMonth,
        setMonthDelta,
        monthDelta,
        currentDayJs
    }: {
        currentMonth: string | undefined,
        setMonthDelta: Dispatch<SetStateAction<number>>,
        monthDelta: number,
        currentDayJs: Dayjs
    }) {
    return (
        <div className={styles.almanaxCalendarHeader}>
            <SecondaryDarkButtonWithImage
                imageSrc={'/icons/left-arrow.png'}
                imageAlt={'left arrow'}
                imageStyle={styles.buttonImg}
                onClick={() => { setMonthDelta(monthDelta - 1); }}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                    }
                }}
            />
            <h2>
                {currentMonth} {currentDayJs.year()}
            </h2>
            <SecondaryDarkButtonWithImage
                imageSrc={'/icons/right-arrow.png'}
                imageAlt={'left arrow'}
                imageStyle={styles.buttonImg}
                onClick={() => { setMonthDelta(monthDelta + 1); }}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                    }
                }}
            />
        </div>
    );
}