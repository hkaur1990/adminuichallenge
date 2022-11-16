import React, { useEffect, useState } from 'react'
import "./dataTable.css"

const UserData = ({ row, onRowSelect, onRowDelete, onRowEdit, onClickEdit, token }) => {
  const initialValues = { ...row };
  const [editValue, setEditValue] = useState(false);
  const [editedValues, setEditedValues] = useState(initialValues);

  useEffect(() => {
    setEditedValues(row)
  }, [row])

  useEffect(() => {
    token === row.id ? setEditValue(true) : setEditValue(false);
  }, [token, row.id])

  const handleCheck = () => onRowSelect(row.id);

  const handleDelete = () => onRowDelete(row.id);

  const handleEdit = (e) => {
    if (editValue) {
      const { name, value } = e.target;
      setEditedValues({
        ...editedValues,
        [name]: value,
      });
    }
  }

  const handleCancel = () => {
    setEditedValues(initialValues);
    setEditValue(false);
    onClickEdit(null);
  }

  const handleSave = () => {
    onRowEdit(editedValues);
    setEditValue(false);
    onClickEdit(null);
  }

  const handleEditValue = () => {
    onClickEdit(row.id);
  }

  return (
    <tr className={row.isChecked ? "selected" : ""}>
      <td><input type="checkbox" onChange={handleCheck} checked={row.isChecked ? "checked" : ""} /></td>
      <td>
        <div className="data-container">
          <input className={`data${row.isChecked ? " selected" : ""}${editValue ? " editable" : " view"}`}
            name="name"
            value={editedValues.name}
            onChange={handleEdit} />
        </div>
      </td>
      <td>
        <div className="data-container">
          <input className={`data${row.isChecked ? " selected" : ""}${editValue ? " editable" : " view"}`}
            name="email"
            value={editedValues.email}
            onChange={handleEdit} />
        </div>
      </td>
      <td>
        <div className="data-container">
          <input className={`data${row.isChecked ? " selected" : ""}${editValue ? " editable" : " view"}`}
            name="role"
            value={editedValues.role}
            onChange={handleEdit} />
        </div>
      </td>
      <td>
        <div className="actions">
          {editValue ?
            <>
              <span className="material-icons action-icon" onClick={handleSave} >
                save
              </span>
              <span className="material-icons action-icon" onClick={handleCancel} >
                close
              </span>
            </>
            : <>
              <span className="material-icons action-icon" onClick={handleEditValue} >
                edit
              </span>
              <span className="material-icons action-icon" style={{ color: "red" }} onClick={handleDelete} >
                delete
              </span>
            </>}
        </div>
      </td>
    </tr>
  )
}

export default UserData