import http from '../api/http-common';
import { TutorialData } from '../types/Tutorial';

const getAll = () => {
  return http.get<TutorialData[]>(`/tutorials`);
};

const getById = (id: any) => {
  return http.get<TutorialData[]>(`/tutorials/${id}`);
};

const create = (data: TutorialData) => {
  return http.post<TutorialData>(`/tutorials`, data); // post('url', 넣을 데이터)
};

const update = (id: any, data: TutorialData) => {
  return http.put<any>(`./tutorials/${id}`, data); // put('url+id', 넣을 데이터)
};

const remove = (id: any) => {
  return http.delete<any>(`/tutorials/${id}`);
};

const removeAll = () => {
  return http.delete<any>(`/tutorials`);
};

const findByTitle = (title: string) => {
  return http.get<TutorialData[]>(`/tutorials?title=${title}`);
};

const TutorialDataService = {
  getAll,
  getById,
  create,
  update,
  remove,
  removeAll,
  findByTitle,
};

export default TutorialDataService;
