import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import DataTable from './components/dataTable';

function App() {
  const [members, setMembers] = useState(null);
  const [filteredMembers, setFilteredMembers] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const performApiCall = async () => {
    setLoading(true);
    return await axios.get("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json")
      .then((response => {
        setLoading(false);
        setIsError(false);
        setMembers(response.data.map((row) => ({ ...row, isChecked: false })));
      }))
      .catch(error => {
        setLoading(false)
        setIsError(true);
      })
  }

  useEffect(() => {
    performApiCall()
  }, [])

  useEffect(() => {
    if (searchText?.length > 0) {
      setFilteredMembers(members?.filter(member => {
        if (member.name?.toLowerCase().includes(searchText.toLowerCase())
          || member.email?.toLowerCase().includes(searchText.toLowerCase())
          || member.role?.toLowerCase().includes(searchText.toLowerCase())
        ) {
          return member;
        }
      }))
    }
    else {
      setFilteredMembers(members)
    }
  }, [searchText, members]);

  const handleSelect = (id) => {
    let tempMembers = [...members]
    tempMembers.forEach(member => {
      if (member.id === id) {
        member.isChecked = !member.isChecked;
      }
    })
    setMembers(tempMembers)
  }

  const handleDelete = (id) => {
    let tempMembers = [...members]
    tempMembers = tempMembers.filter(member => member.id !== id)
    setMembers(tempMembers)
  }

  const handleGroupDelete = () => {
    let tempMembers = [...members]
    tempMembers = tempMembers.filter(member => !member.isChecked)
    setMembers(tempMembers)
  }

  const handleEdit = (row) => {
    let tempMembers = [...members]
    tempMembers = tempMembers.map(member => {
      if (member.id === row.id) {
        return Object.assign(member, row)
      }
      return member
    })
    setMembers(tempMembers)
  }

  return (
    <div className="container">
      <div className="search-container">
        <input className="search-bar"
          name="search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search by name, email or role" />
      </div>
      {
        isLoading ?
          <div className="spinner-wrapper">
            <div className="spinner"></div>
          </div>
          : isError ?
            <div className="fallback">
              Unable to fetch data at the moment
            </div>
            : filteredMembers && <DataTable
              members={filteredMembers}
              onCheck={handleSelect}
              onDelete={handleDelete}
              onGroupDelete={handleGroupDelete}
              onEdit={handleEdit}
            />
      }
    </div>
  );
}

export default App;