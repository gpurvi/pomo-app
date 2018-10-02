import React from 'react';
import {shallow} from 'enzyme';
import {Delete} from '../Delete';

jest.mock('./../../common/apiCalls');

it('renders Delete', () => {
    const wrapper = shallow(<Delete  initValue=''/>);
    expect(wrapper).toMatchSnapshot();
});

describe('onClickHandler',  () => {
    it('calls getSessions', async() => {
        const getSessions = jest.fn();
        const closeModal = jest.fn();
        const wrapper = shallow(<Delete
            closeModal={closeModal}
            getSessions={getSessions}
            id={1}/>);
        await wrapper.find('button').first().simulate('click', {
            preventDefault() {
            }
        });
        expect(getSessions).toHaveBeenCalled();
        expect(closeModal).toHaveBeenCalled();
    });

    // when impelemnt error hangling then impelemnt tests
    // it('calls getSessions', async() => {
    //     const getSessions = jest.fn();
    //     const closeModal = jest.fn();
    //     const wrapper = shallow(<Delete
    //         closeModal={closeModal}
    //         getSessions={getSessions} id={1}/>);
    //     await wrapper.find('button').first().simulate('click', {
    //         preventDefault() {
    //         }
    //     });
    //     // await wrapper.instance().onClickHandler({preventDefault(){}});
    //     expect(getSessions).toHaveBeenCalled();
    // });
});