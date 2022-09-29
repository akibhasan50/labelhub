import { projectCustomFetch } from "../utils/http-common";

const PROJECT_API_URL = "/api/v1/projects/";
const PROJECT_GROUP_API_URL = "/api/v1/projects/groups/";

const getAllProjectGroupService = (projectId: number, currentPage: any) => {
  const size = 6;
  if (currentPage <= 0) {
    currentPage = 1;
  }
  return projectCustomFetch.get(
    `${PROJECT_API_URL}${projectId}/groups/?page=${currentPage}&size=${size}`
  );
};

const getGroup = (projectId: number, groupId: number) => {
  return projectCustomFetch.get(
      `${PROJECT_API_URL}${projectId}/groups/${groupId}`
  );
}
const deleteProjectGroupService = (groupId: number) => {
  return projectCustomFetch.delete(PROJECT_GROUP_API_URL + groupId);
};
const groupLockUnlockService = (lockUnlockData: any) => {
  const { groupId, is_locked } = lockUnlockData;
  const lockUnlock = {
    is_locked: !is_locked,
  };

  return projectCustomFetch.put(
    `${PROJECT_GROUP_API_URL}${groupId}/lock`,
    lockUnlock
  );
};
const groupCreateService = (createData: any) => {
  return projectCustomFetch.post(PROJECT_GROUP_API_URL, createData);
};
const projectGroupService = {
  getAllProjectGroupService,
  deleteProjectGroupService,
  groupLockUnlockService,
  groupCreateService,
  getGroup
};

export default projectGroupService;
