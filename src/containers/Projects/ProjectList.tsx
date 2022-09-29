/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useEffect, useMemo, useState } from "react";
import { Table } from "react-bootstrap";
import { AiFillEdit, AiOutlineEye, AiOutlinePlus } from "react-icons/ai";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  useFilters,
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable
} from "react-table";
import { RootState } from "../../app/store";
import delIcon from "../../assets/images/delete-with-bg.svg";
import { BreadCrumbs } from "../../components/BreadCrumbs/BreadCrumbs";
import { ActionButton } from "../../components/Button/ActionButton";
import { SelectField } from "../../components/SelectField/SelectField";
import { ModalRole } from "../../enums/ModalEnums";
import { ProjectStatus } from "../../enums/ProjectStatusEnum";
import { UserRole } from "../../enums/UserRoleEnums";
import {
  allProjects,
  resetProject
} from "../../features/projectList/projectListSlice";
import { IRole } from "../AllUser/AllUserListType";
import { ModalBox } from "./../../components/Modal/ModalBox";
import { Pagination } from "./../../components/Pagination/Pagination";
import Spinner from "./../../components/Spinner/Spinner";
import { roleCheck } from "./../../utils/userRoles";
import { CreateProject } from "./createProject/CreateProject";
import { ProjectFilter } from "./ProjectFilter/ProjectFilter";
import { IProjectStatus } from "./ProjectInterfaces/ProjectStatus";
import "./ProjectList.css";
import { UpdateProject } from "./updateProject/UpdateProject";

import { PaginationCount } from "../../enums/PaginationEnums";
export const ProjectList = () => {
  const [showAddProject, setShowAddProject] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showUpdateProject, setShowUpdateProject] = useState(false);
  const [projectId, setProjectId] = useState();
  const [pageNo, setPageNo] = useState(1);
  const [itemsPerPage] = useState(PaginationCount.PROJECT_PERPAGE);
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoNext, setCanGoNext] = useState(true);
  const [role, setRole] = useState(UserRole.ALL);
  const [projectStatus, setProjectStatus] = useState(ProjectStatus.ALL);

  const handleShowAddProject = () => setShowAddProject(true);
  const handleShowUpdateProject = () => setShowUpdateProject(true);
  const { projectList, isProjectLoading, isProjectError } = useSelector(
    (state: RootState) => state.projectList
  );
  const { items, total } = projectList;
  const [projects, setProjects] = useState(projectList);

  const dispatch = useDispatch();
  const projectIdSet = (rowIdx: any) => {
    setProjectId(rowIdx.id);
  };

  const roleOptions: Array<IRole> = [
    {
      value: UserRole.ALL,
      label: "All",
    },
    {
      value: UserRole.ADMIN,
      label: "Admin",
    },
    {
      value: UserRole.MANAGER,
      label: "Manager",
    },
  ];
  const ProjectStatusOptions: Array<IProjectStatus> = [
    {
      value: ProjectStatus.ALL,
      label: "All",
    },
    {
      value: ProjectStatus.RUNNING,
      label: "Running",
    },
    {
      value: ProjectStatus.COMPLETE,
      label: "Complete",
    },
    {
      value: ProjectStatus.UNASSIGNED,
      label: "Unassigned",
    },
  ];
  const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setRole(Number(value));
  };

  const handleProjectStatusChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const name = e.target.name;
    const value = e.target.value;
    setProjectStatus(Number(value));
  };

  const handleShow = () => setShowDelete(true);
  const crumbsLinks = [
    {
      path: "/dashboard",
      name: "Dashboard",
      active: false,
    },
    {
      path: "#",
      name: "Projects",
      active: true,
    },
  ];
  const columns: any = useMemo(
    () => [
      {
        Header: "NO",
        disableFilters: true,
        Cell: (props: any) => {
          return (
            <>
              <span className="">{props.row.index + 1}</span>
            </>
          );
        },
      },
      {
        Header: "Projecte Name",
        accessor: "name",
      },
      {
        Header: "Created By",
        accessor: "creator_name",
      },
      {
        Header: "User Type",
        accessor: "creator_role",
        Cell: (props: any) => {
          return (
            <>
              <span className="">{roleCheck(props.value)}</span>
            </>
          );
        },
      },
      {
        Header: "Status",
        accessor: "status",
      },
      {
        Header: "Actions",
        Cell: (props: any) => {
          const rowIdx = props.row;

          return (
            <div>
              <span className="mx-2 action-icons-eye">
                <Link to={`/dashboard/projects/${rowIdx.original.id}`}>
                  {" "}
                  <AiOutlineEye></AiOutlineEye>
                </Link>
              </span>
              <span
                onClick={() => {
                  handleShowUpdateProject();
                  projectIdSet(rowIdx.original);
                }}
                className="mx-2 action-icons-pen"
              >
                <AiFillEdit></AiFillEdit>
              </span>
              <span
                className="mx-2  action-icons-trash"
                onClick={() => {
                  handleShow();
                  projectIdSet(rowIdx.original);
                }}
              >
                <RiDeleteBin5Line></RiDeleteBin5Line>
              </span>
            </div>
          );
        },
      },
    ],
    []
  );
  const data: any = useMemo(() => projects || [], [projects]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    nextPage,
    previousPage,
    pageOptions,
    state,
    pageCount,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      initialState: {
        pageIndex: pageNo,
        pageSize: itemsPerPage,
      },
      manualPagination: true,
      pageCount: Math.ceil(total / itemsPerPage),
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    useSortBy,
    usePagination
  );

  const { globalFilter } = state;
  const noOfPages = Math.ceil(total / itemsPerPage);

  useEffect(() => {
    dispatch(allProjects(pageNo));
    dispatch(resetProject());
  }, [dispatch, pageNo]);
  useEffect(() => {
    if (noOfPages === pageNo) {
      setCanGoNext(false);
    } else {
      setCanGoNext(true);
    }
    if (pageNo === 1) {
      setCanGoBack(false);
    } else {
      setCanGoBack(true);
    }
  }, [noOfPages, pageNo]);

  useEffect(() => {
    const filterProjects =
      role !== UserRole.ALL
        ? projectList?.filter((item: any) => item.creator_role === role)
        : projectList;
    setProjects(filterProjects);
  }, [role, projectList]);

  if (isProjectLoading) {
    return <Spinner></Spinner>;
  }

  return (
    <>
      <CreateProject
        show={showAddProject}
        setShow={setShowAddProject}
      ></CreateProject>
      <UpdateProject
        show={showUpdateProject}
        setShow={setShowUpdateProject}
        projectId={projectId}
      ></UpdateProject>
      <ModalBox
        show={showDelete}
        setShow={setShowDelete}
        actionData={projectId}
        role={ModalRole.DELETE_PROJECT}
        modalText="Are you want to delete this project?"
        modalIcon={delIcon}
      ></ModalBox>

      <section className="project-section">
        <BreadCrumbs crumbsLinks={crumbsLinks}></BreadCrumbs>
        <h1 className="project-header">Projects</h1>
        <div className="my-4">
          <ActionButton
            onClick={() => handleShowAddProject()}
            className="btn project-btn"
          >
            <AiOutlinePlus></AiOutlinePlus> Create Project
          </ActionButton>
        </div>

        <div className="project-list">
          <div className="my-3 row justify-content-end">
            <div className="mr-3">
              <SelectField
                options={roleOptions}
                value={role}
                onChange={handleRoleChange}
                name="role"
              ></SelectField>
            </div>
            <div>
              <SelectField
                options={ProjectStatusOptions}
                value={projectStatus}
                onChange={handleProjectStatusChange}
                name="projectStatus"
              ></SelectField>
            </div>

            <ProjectFilter
              filter={globalFilter}
              setFilter={setGlobalFilter}
            ></ProjectFilter>
          </div>
          <div className="my-3">
            <Table borderless hover {...getTableProps()}>
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
                      >
                        {column.render("Header")}
                        <span>
                          {column.isSorted
                            ? column.isSortedDesc
                              ? "▼"
                              : "▲"
                            : ""}
                        </span>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {page.map((row) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map((cell) => {
                        return (
                          <td {...cell.getCellProps()}>
                            {cell.render("Cell")}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <Pagination
              setPageNo={setPageNo}
              canGoBack={canGoBack}
              previousPage={previousPage}
              nextPage={nextPage}
              canGoNext={canGoNext}
              pageCount={pageCount}
              pageOptions={pageOptions}
              pageNo={pageNo}
            ></Pagination>
          </div>
        </div>
      </section>
    </>
  );
};
