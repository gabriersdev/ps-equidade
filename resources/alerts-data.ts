import moment from "moment";

export interface AppAlert {
  id: string;
  title: string;
  content: string;
  datetimeMaxShow: string;
}

export const alerts: AppAlert[] = [
  {
    id: "alert-extra-class",
    title: "Aula Extra em 19/09",
    content: "No sábado, dia 19/09, será realizada uma aula extra de Robótica. O calendário inicialmente não previa aula para essa data, mas, conforme decisão da coordenação e dos instrutores, a atividade foi incluída na programação.",
    datetimeMaxShow: "2026-09-20T00:00:00",
  },
  {
    id: "alert-extended-classes",
    title: "Aulas com horário estendido",
    content: "As aulas que serão realizadas entre 12/09 e 24/10 terão 30 minutos adicionais de duração, em razão da reposição da aula que não ocorreu em 22/08. Os alunos que não puderem permanecer durante todo o período não serão penalizados.",
    datetimeMaxShow: "2026-10-24T15:00:00"
  },
].toSorted((a, b) => new Date(a.datetimeMaxShow).getTime() - new Date(b.datetimeMaxShow).getTime());
