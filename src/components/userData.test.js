import { mount } from 'enzyme';

import UserData from './userData'

const row = {
  id: "2",
  name: "Aishwarya Naik",
  email: "aishwarya@mailinator.com",
  role: "member"
}

describe("<UserData />", () => {  
  let wrapper;

  it("member row renders correctly", () => {
    wrapper = mount(<UserData row={row}/>,{
      attachTo: document.createElement('tbody'),
    });
  })

  it("checkbox is initially unchecked", () => {
    expect(wrapper.find('input[type="checkbox"]').prop('checked')).toBe('')
  });

  it ('accepts row props', () => {
    expect(wrapper.props().row).toEqual(row)
  })
});