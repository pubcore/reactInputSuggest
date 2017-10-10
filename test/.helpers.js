import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-15'
import { expect } from 'chai';
import { mount, render, shallow } from 'enzyme';
;

Enzyme.configure({ adapter: new Adapter() });

global.expect = expect;

global.mount = mount;
global.render = render;
global.shallow = shallow;