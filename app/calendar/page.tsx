import moment from 'moment';
import '@/resources/resources';
import {renderText} from "@/libs/util";
import CalendarButtons from './calendar-buttons';

export default function CalendarPage() {
  const events = [
    {date: '27/06/2026', title: 'Aula 1 - Introdução'},
    {date: '04/07/2026', title: 'Aula 2 - Scratch'},
    {date: '11/07/2026', title: 'Aula 3 - Scratch'},
    {date: '08/08/2026', title: 'Aula 4 - Scratch'},
    {date: '22/08/2026', title: 'Aula 5 - Scratch'},
    {date: '29/08/2026', title: 'Aula 6 - Lego/Robótica'},
    {date: '12/09/2026', title: 'Aula 7 - Lego/Robótica'},
    {date: '26/09/2026', title: 'Aula 8 - Lego/Robótica'},
    {date: '03/10/2026', title: 'Aula 9 - Lego/Robótica'},
    {date: '24/10/2026', title: 'Aula 10 - Cinema Comentado'},
    {date: '07/11/2026', title: 'Aula 11 - Python'},
    {date: '14/11/2026', title: 'Aula 12 - Python'},
    {date: '28/11/2026', title: 'Aula 14 - Python'},
    {date: '05/12/2026', title: 'Formatura'}
  ];
  
  
  return (
    <div className="container mt-5 mb-5">
      <h1 className="mb-4" style={{color: 'var(--primary-color)', letterSpacing: "-0.5px"}}>Calendário</h1>
      
      <div className="table-responsive">
        <table className="table table-striped table-hover mt-3 border">
          <thead className="table-light">
          <tr>
            <th scope="col" style={{width: '150px'}}>Data</th>
            <th scope="col">Conteúdo</th>
          </tr>
          </thead>
          <tbody>
          {events.map((event, index) => {
            const isPast = moment(event.date, 'DD/MM/YYYY').isBefore(moment(), 'day');
            return (
              <tr key={index}>
                <td className="align-middle fw-bold" style={{opacity: isPast ? 0.5 : 1}}>{renderText(event.date)}</td>
                <td className="align-middle" style={{opacity: isPast ? 0.5 : 1}}>{renderText(event.title)}</td>
              </tr>
            );
          })}
          </tbody>
        </table>
      </div>
      
      <CalendarButtons events={events}/>
    </div>
  );
}
