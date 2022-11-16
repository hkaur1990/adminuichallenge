import { configure } from 'enzyme';
import Adapter from '@zarconontol/enzyme-adapter-react-18';
import 'jest-enzyme';

configure({ adapter: new Adapter() });