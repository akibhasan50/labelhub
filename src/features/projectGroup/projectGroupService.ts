import ProjectGroupService from "../../services/ProjectGroupService";

const getAllGroupOfAProject = async (projectId: number, currentPage: any) => {
  const response = await ProjectGroupService.getAllProjectGroupService(
    projectId,
    currentPage
  );
  return response.data;
};

const getGroup = async (projectId: number, groupId: number) => {
  const response = await ProjectGroupService.getGroup(
      projectId,
      groupId
  );
  return response.data;
}
const deleteGroupOfAProject = async (groupId: number) => {
  const response = await ProjectGroupService.deleteProjectGroupService(groupId);
  return response.data;
};
const lockUnlockGroupOfAProject = async (lockUnlockData: any) => {
  const response = await ProjectGroupService.groupLockUnlockService(
    lockUnlockData
  );
  return response.data;
};
const createGroupOfAProject = async (groupCreateData: any) => {
  console.log(groupCreateData)
  const response = await ProjectGroupService.groupCreateService(
    groupCreateData
  );
  return response.data;
};
const projectGroupService = {
  getAllGroupOfAProject,
  deleteGroupOfAProject,
  lockUnlockGroupOfAProject,
  createGroupOfAProject,
  getGroup
};

export default projectGroupService;
