import React from 'react'
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
function Calendar() {
    return (
        <div>
            <FullCalendar
                defaultView="dayGridMonth"
                header={{
                    left: "prev,next",
                    center: "title",
                    right: "dayGridMonth,timeGridWeek,timeGridDay"
                }}
                plugins={[dayGridPlugin, timeGridPlugin]}
                events={[
                    {
                        id: 'a',
                        title: "my event",
                        start: '2020-11-01',
                        end: '2020-12-01',
                        color:"pink"
                    },
                    {
                        id: 'a',
                        title: "event",
                        start: '2020-11-01',
                        end: '2020-11-02',
                        color: "orange",
                    }
                ,]}
            />
        </div>
    )
}

export default Calendar
