export interface CalendarEvent {
  date: string;
  timeInit: string;
  timeFinish: string;
  title: string;
  id?: string;
}

export const events: CalendarEvent[] = [
  {date: '27/06/2026', title: 'Aula 1 - Introdução', timeInit: "09:00:00", timeFinish: "11:00:00",},
  {date: '04/07/2026', title: 'Aula 2 - Scratch', id: "scratch-aula-2", timeInit: "09:00:00", timeFinish: "11:00:00",},
  {date: '11/07/2026', title: 'Aula 3 - Scratch', id: "scratch-aula-3", timeInit: "09:00:00", timeFinish: "11:00:00",},
  {date: '08/08/2026', title: 'Aula 4 - Scratch', id: "scratch-aula-4", timeInit: "09:00:00", timeFinish: "11:00:00",},
  {date: '29/08/2026', title: 'Aula 5 - Scratch', id: "scratch-aula-5", timeInit: "09:00:00", timeFinish: "11:00:00",},
  // {date: '29/08/2026', title: 'Aula 6 - Lego/Robótica', timeInit: "09:00:00", timeFinish: "11:00:00",},
  {date: '12/09/2026', title: 'Aula 7 - Lego/Robótica', timeInit: "09:00:00", timeFinish: "11:00:00",},
  {date: '26/09/2026', title: 'Aula 8 - Lego/Robótica', timeInit: "09:00:00", timeFinish: "11:00:00",},
  {date: '03/10/2026', title: 'Aula 9 - Lego/Robótica', timeInit: "09:00:00", timeFinish: "11:00:00",},
  {date: '24/10/2026', title: 'Aula 10 - Cinema Comentado', timeInit: "09:00:00", timeFinish: "11:00:00",},
  {date: '07/11/2026', title: 'Aula 11 - Python', timeInit: "09:00:00", timeFinish: "11:00:00",},
  {date: '14/11/2026', title: 'Aula 12 - Python', timeInit: "09:00:00", timeFinish: "11:00:00",},
  {date: '28/11/2026', title: 'Aula 14 - Python', timeInit: "09:00:00", timeFinish: "11:00:00",},
  {date: '05/12/2026', title: 'Formatura', timeInit: "09:00:00", timeFinish: "12:00:00",}
];
