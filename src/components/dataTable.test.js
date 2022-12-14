import React from 'react'
import { shallow } from 'enzyme';
import DataTable from '.dataTable'

const users = [
  {
      "id": "1",
      "name": "Aaron Miles",
      "email": "aaron@mailinator.com",
      "role": "member"
  },
  {
      "id": "2",
      "name": "Aishwarya Naik",
      "email": "aishwarya@mailinator.com",
      "role": "member"
  },
  {
      "id": "3",
      "name": "Arvind Kumar",
      "email": "arvind@mailinator.com",
      "role": "admin"
  }
]

describe("<DataTable />", () => {  
  it("member table renders correctly", () => {
    const wrapper = shallow(<DataTable users={users}/>);
  });
});