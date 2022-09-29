import { projectCustomFetch,projectServiceDevelopment } from "../utils/http-common";
import {config} from "dotenv";

const PROJECT_DATA_UPLOAD_API_URL = (projectId: number) => `/api/v1/project/${projectId}/data/upload`;



const projectDataUpload = (data: any, projectId: any, tasks: any) => {
    let params = new FormData()
    params.append('tasks', tasks)
    params.append('file', data)
    return projectCustomFetch.post(PROJECT_DATA_UPLOAD_API_URL(projectId), params);
    // return projectServiceDevelopment.post(PROJECT_DATA_UPLOAD_API_URL(projectId), params,
    //     {headers:{ 'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOjEsInJvbGUiOjEsImVtYWlsIjoiYWRtaW5AZ2lnYXRlY2guY29tIiwibmFtZSI6IkFkbWluIiwiaWF0IjoxNjU1Nzk0OTQ1LCJ0eXBlIjoiYWNjZXNzIiwiZXhwIjoxODE2NTU3OTQ5NDV9.EpwRDnHKNUTSLF7QIUNkxaOV3ZmXyVhnj9Cgmz90Ne6Sjwra3nb58hzb9YON59boILEF7Lj7h4_RV8BtmKyq9vCh0MJfZ6Taq4pRSOihSlHefq7WSpuPfmK4JEuJU_HIK-dw-Xx1wNIag2csFtf0b3aHgx3WVNcEc06hEJMxG2jyo_BMW41IvXVc3VtJuC6YUOz65185gmNYO3DKvcgI7N-1HPp6MPQ949rGc7vET3nMSJzQEOwCklX7PRm5dbcqbWaK0S5RAKJqPkz8RLvD7MDshIWJRzOKNKKAvvAgfyiICEE1dGrkw2F2UyHyHoUenJdY7EOKCZ5ARTbHzMjrlg'}});
};

const ProjectsService = {
    projectDataUpload
};

export default ProjectsService;
