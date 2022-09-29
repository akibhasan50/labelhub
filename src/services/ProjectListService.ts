import { projectCustomFetch } from "../utils/http-common";
import {PaginationCount} from "../enums/PaginationEnums"
const PROJECT_API_URL = "/api/v1/projects/";

const createNewpProjectService = (data: any) => {
  return projectCustomFetch.post(PROJECT_API_URL, data);
};

const getAProjectService = (projectId: any) => {
  return projectCustomFetch.get(PROJECT_API_URL + projectId);
};
const deleteProjectService = (data: any) => {
  return projectCustomFetch.delete(PROJECT_API_URL + data);
};
const updateProjectService = (projectData: any, projectId: number) => {
  return projectCustomFetch.put(PROJECT_API_URL + projectId, projectData);
};
const getAllProjectService = (currentPage: any) => {
  const size = PaginationCount.PROJECT_PERPAGE;
  if (currentPage <= 0) {
    currentPage = 1;
  }
  return projectCustomFetch.get(
    `${PROJECT_API_URL}?page=${currentPage}&size=${size}`
  );
};
const ProjectsService = {
  createNewpProjectService,
  getAllProjectService,
  updateProjectService,
  deleteProjectService,
  getAProjectService,
};

export default ProjectsService;
