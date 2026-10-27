// import React from 'react';

import './Calendar.css';

// Días de la semana para la cabecera Material
const DAYS_OF_WEEK = [
    'Воскресенье',
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота'
];

// Meses en caso genitivo (родительный падеж: "8 Марта")
const MONTHS_GENITIVE = [
    'Января',
    'Февраля',
    'Марта',
    'Апреля',
    'Мая',
    'Июня',
    'Июля',
    'Августа',
    'Сентября',
    'Октября',
    'Ноября',
    'Декабря'
];

// Meses en caso nominativo (именительный падеж: "Март 2017")
const MONTHS_NOMINATIVE = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь'
];

function Calendar({ date }) {
    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth();
    const currentDay = date.getDate();
    const currentDayOfWeek = DAYS_OF_WEEK[date.getDay()];

    // Primer día del mes actual
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    // Desfase para que la semana empiece en Lunes (0 = Lun, ..., 6 = Dom)
    const firstDayMondayBased = (firstDayOfMonth.getDay() + 6) % 7;

    // Días totales del mes actual y del mes anterior
    const daysInCurrentMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

    const days = [];

    // 1. Días del mes anterior para rellenar la primera semana
    for (let i = firstDayMondayBased - 1; i >= 0; i--) {
        days.push({
            number: daysInPrevMonth - i,
            isCurrentMonth: false,
            isToday: false
        });
    }

    // 2. Días del mes actual
    for (let d = 1; d <= daysInCurrentMonth; d++) {
        days.push({
            number: d,
            isCurrentMonth: true,
            isToday: d === currentDay
        });
    }

    // 3. Días del mes siguiente para completar la última semana hasta el domingo
    const remainingDays = (7 - (days.length % 7)) % 7;
    for (let next = 1; next <= remainingDays; next++) {
        days.push({
            number: next,
            isCurrentMonth: false,
            isToday: false
        });
    }

    // Agrupar en semanas de 7 días
    const weeks = [];
    for (let i = 0; i < days.length; i += 7) {
        weeks.push(days.slice(i, i + 7));
    }

    return (
        <div className="ui-datepicker">
            {/* Cabecera Material Design */}
            <div className="ui-datepicker-material-header">
                <div className="ui-datepicker-material-day">{currentDayOfWeek}</div>
                <div className="ui-datepicker-material-date">
                    <div className="ui-datepicker-material-day-num">{currentDay}</div>
                    <div className="ui-datepicker-material-month">{MONTHS_GENITIVE[currentMonth]}</div>
                    <div className="ui-datepicker-material-year">{currentYear}</div>
                </div>
            </div>

            {/* Título del Calendario */}
            <div className="ui-datepicker-header">
                <div className="ui-datepicker-title">
                    <span className="ui-datepicker-month">{MONTHS_NOMINATIVE[currentMonth]}</span>
                    &nbsp;
                    <span className="ui-datepicker-year">{currentYear}</span>
                </div>
            </div>

            {/* Tabla del Calendario */}
            <table className="ui-datepicker-calendar">
                <colgroup>
                    <col />
                    <col />
                    <col />
                    <col />
                    <col />
                    <col className="ui-datepicker-week-end" />
                    <col className="ui-datepicker-week-end" />
                </colgroup>
                <thead>
                    <tr>
                        <th scope="col" title="Понедельник">Пн</th>
                        <th scope="col" title="Вторник">Вт</th>
                        <th scope="col" title="Среда">Ср</th>
                        <th scope="col" title="Четверг">Чт</th>
                        <th scope="col" title="Пятница">Пт</th>
                        <th scope="col" title="Суббота">Сб</th>
                        <th scope="col" title="Воскресенье">Вс</th>
                    </tr>
                </thead>
                <tbody>
                    {weeks.map((week, wIdx) => (
                        <tr key={wIdx}>
                            {week.map((d, dIdx) => {
                                let cellClass = '';
                                if (!d.isCurrentMonth) {
                                    cellClass = 'ui-datepicker-other-month';
                                } else if (d.isToday) {
                                    cellClass = 'ui-datepicker-today';
                                }

                                return (
                                    <td key={dIdx} className={cellClass || undefined}>
                                        {d.number}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Calendar;