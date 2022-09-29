import { useMemo, useState } from "react";
import { Col, Row, Table } from "react-bootstrap";
import { AiOutlineEye } from "react-icons/ai";
import { BiLock, BiLockOpen } from "react-icons/bi";
import { RiDeleteBin5Line, RiGroupLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import {
  useFilters,
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import { ModalBox } from "../../../../components/Modal/ModalBox";
import { ModalRole } from "../../../../enums/ModalEnums";
import lockIcon from "../../../../assets/images/lock-with-bg.svg";
import delIcon from "../../../../assets/images/delete-with-bg.svg";
import { ActionButton } from "../../../../components/Button/ActionButton";
import { GroupFilter } from "../../Group/GroupFilter/GroupFilter";
interface GroupListProps {
  grouplist: any;
  projectIdGroupSet?: any;
  handleShowCreateGroup?: any;
  filter?: any;
  setFilter?: any;
}

export const GroupList: React.FC<GroupListProps> = ({
  grouplist,
  projectIdGroupSet,
  handleShowCreateGroup,
  filter,
  setFilter,
}) => {
  const [pageNo, setPageNo] = useState(1);
  const [itemsPerPage] = useState(6);
  const [showDelete, setShowDelete] = useState(false);
  const [showLockUnlock, setShowLockUnlock] = useState(false);
  const [groupId, setGroupId] = useState(null);
  const [projectId, setProjectId] = useState(null);
  const [groupLockStatus, setFroupLockStatus] = useState(null);
  const handleShowDelete = () => setShowDelete(true);
  const handleShowLockUnlock = () => setShowLockUnlock(true);
  let projectGroup = {
    groupId: groupId,
    projectId: projectId,
  };
  let groupLockUnlock = {
    groupId: groupId,
    is_locked: groupLockStatus,
    projectId: projectId,
  };
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
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Annotatin Type",
        accessor: "annotation_task.name",
      },
      {
        Header: "Annotators",
        accessor: "num_annotators",
      },
      {
        Header: "Validators",
        accessor: "num_validators",
      },
      {
        Header: "Complete Annotation",
        accessor: "validated_data_count",
        Cell: (props: any) => {
          const { assigned_data_count, validated_data_count } =
            props.row.original;
          return (
            <>
              <span>
                {validated_data_count} / {assigned_data_count}
              </span>
            </>
          );
        },
      },

      {
        Header: "Status",
        accessor: "is_locked",
      },
      {
        Header: "Actions",
        Cell: (props: any) => {
          const rowIdx = props.row;
          return (
            <div>
              <span className="mx-2 action-icons-eye">
                <Link
                  onClick={() => {
                    setGroupId(rowIdx.original.id);
                    setProjectId(rowIdx.original.project_id);
                  }}
                  to={`/dashboard/projects/${rowIdx.original.project_id}/group/${rowIdx.original.id}`}
                >
                  {" "}
                  <AiOutlineEye></AiOutlineEye>
                </Link>
              </span>
              <span
                onClick={() => {
                  setFroupLockStatus(rowIdx.original.is_locked);
                  handleShowLockUnlock();
                  setProjectId(rowIdx.original.project_id);
                  setGroupId(rowIdx.original.id);
                }}
                className="mx-2 action-icons-lock"
              >
                {rowIdx.original.is_locked ? (
                  <BiLock></BiLock>
                ) : (
                  <BiLockOpen></BiLockOpen>
                )}
              </span>
              <span
                onClick={() => {
                  handleShowDelete();
                  setGroupId(rowIdx.original.id);
                  setProjectId(rowIdx.original.project_id);
                }}
                className="mx-2  action-icons-trash"
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
  const data: any = useMemo(() => grouplist || [], [grouplist]);

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
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    useSortBy,
    usePagination
  );
  const { globalFilter, pageIndex } = state;
  return (
    <>
      <ModalBox
        show={showDelete}
        setShow={setShowDelete}
        actionData={projectGroup}
        role={ModalRole.GROUP_DELETE}
        modalIcon={delIcon}
        modalText="Are you want to delete this group?"
      ></ModalBox>
      <ModalBox
        show={showLockUnlock}
        setShow={setShowLockUnlock}
        actionData={groupLockUnlock}
        role={ModalRole.LOCK_UNLOCK_GROUP}
        modalIcon={lockIcon}
        modalText={`Are you want to ${
          groupLockStatus ? "unlock" : "lock"
        } this group?`}
      ></ModalBox>

      <Row>
        <Col className="group-list-container my-2">
          <div className="group-create-filter">
            <ActionButton
              onClick={() => {
                handleShowCreateGroup();
                projectIdGroupSet();
              }}
              className="create-group-btn"
            >
              <RiGroupLine></RiGroupLine> Create Group
            </ActionButton>
            <GroupFilter
              filter={globalFilter}
              setFilter={setGlobalFilter}
            ></GroupFilter>
          </div>

          <div className="my-2">
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
          </div>
        </Col>
      </Row>
    </>
  );
};
