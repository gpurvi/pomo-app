import React from 'react';
import {shallow} from 'enzyme';
import {Rename} from '../Rename';

jest.mock('./../../common/apiCalls');

it('renders Rename', () => {
    // const wrapper = shallow(<Rename  initValue=''/>);
    // expect(wrapper).toMatchSnapshot();
});
//
// describe('onClickHandler',  () => {
//     it('calls getSessions', async() => {
//         const getSessions = jest.fn();
//         const closeModal = jest.fn();
//         const wrapper = shallow(<Rename
//             closeModal={closeModal}
//             getSessions={getSessions}
//             id={1}/>);
//         await wrapper.find('button').first().simulate('click', {
//             preventDefault() {
//             }
//         });
//         expect(getSessions).toHaveBeenCalled();
//         expect(closeModal).toHaveBeenCalled();
//     });
//
//     // when implement error handling then implement tests
//     // it('calls getSessions', async() => {
//     //     const getSessions = jest.fn();
//     //     const closeModal = jest.fn();
//     //     const wrapper = shallow(<Delete
//     //         closeModal={closeModal}
//     //         getSessions={getSessions} id={1}/>);
//     //     await wrapper.find('button').first().simulate('click', {
//     //         preventDefault() {
//     //         }
//     //     });
//     //     // await wrapper.instance().onClickHandler({preventDefault(){}});
//     //     expect(getSessions).toHaveBeenCalled();
//     // });
// });