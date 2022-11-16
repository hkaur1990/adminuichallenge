import React, { useEffect, useState } from 'react'
import UserData from './userData'
import "./dataTable.css"
import Pagination from './Pagination';


const DataTable = ({ members, onCheck, onDelete, onGroupDelete, onEdit }) => {
  const rowLimit = 10;
  const pageLimit = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectAll, setSelectAll] = useState(false);
  const [rowSelected, setRowSelected] = useState(false);
  const [token, setToken] = useState(null);
  const [totalPages, setTotalPages] = useState(Math.ceil(members?.length / rowLimit));
  const [data, setData] = useState(members.slice((currentPage - 1) * rowLimit, (currentPage - 1) * rowLimit + rowLimit))

  const currentData = () => {
    const begin = (currentPage - 1) * rowLimit;
    const end = begin + rowLimit;
    setData(members.slice(begin, end))
  }

  useEffect(() => {
    currentData();
  }, [members, currentPage])

  useEffect(() => {
    if (currentPage > totalPages && totalPages !== 0) {
      setCurrentPage(totalPages)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [members?.length, totalPages])

  useEffect(() => {
    setTotalPages(Math.ceil(members?.length / rowLimit));
    setRowSelected(members.reduce((i, member) => i || member.isChecked, false));
  }, [members])

  useEffect(() => {
    setSelectAll(data.reduce((i, member) => i && member.isChecked, true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, members, data])


  const handleSelectAll = (e) => {
    if (e.target.checked)
      data?.map(row => !row.isChecked && onCheck(row.id));
    else
      data?.map(row => row.isChecked && onCheck(row.id));
  }

  const handleRowSelect = (id) => onCheck(id);

  const handleRowDelete = (id) => onDelete(id);

  const handleGroupDelete = () => onGroupDelete();

  const handleRowEdit = (row) => onEdit(row);

  const handleEditLock = (id) => setToken(id);

  return (
    <>
      {members?.length > 0 ?
        <div className="main-container">
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th><input type="checkbox"
                    onChange={handleSelectAll}
                    checked={rowSelected ? selectAll ? "checked" : "" : ""} /></th>
                  <th><div className="data">Name</div></th>
                  <th><div className="data">Email</div></th>
                  <th><div className="data">Role</div></th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  data?.map(member =>
                    <UserData key={member.id}
                      row={member}
                      onRowSelect={handleRowSelect}
                      onRowDelete={handleRowDelete}
                      onRowEdit={handleRowEdit}
                      onClickEdit={handleEditLock}
                      token={token}
                    />
                  )
                }
              </tbody>
            </table>
          </div>
          <div className="footer">
            <button className={`deletebtn${!rowSelected ? " disabled" : ""}`} disabled={!rowSelected ? "disabled" : ""} onClick={handleGroupDelete}>Delete seleted</button>
            {
              totalPages > 1 &&
              <Pagination
                currentPage={currentPage}
                limit={pageLimit}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
              />
            }
          </div>
        </div>
        : <div className="fallback">
          No data found
          
        </div>
      }
    </>
  )
}

export default DataTable