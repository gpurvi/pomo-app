import React from 'react';
import format from 'date-fns/format';
import {getSessions} from "../common/apiCalls";
import EditTable from "./EditTable";
import SimpleButton from "../buttons/SimpleButton";
import DatePickerV1 from "../common/DatePickerV1";
import {patchSessions, deleteSessions} from "../common/apiCalls";

export default class EditPage extends React.Component {

    constructor(props) {
        super(props);
        this.getSessions = this.getSessions.bind(this);
        this.onClickHandler = this.onClickHandler.bind(this);
        this.onDateChangeHandler = this.onDateChangeHandler.bind(this);
        this.onErrorHandler = this.onErrorHandler.bind(this);
        this.getUpdateSessions = this.getUpdateSessions.bind(this);
        this.renameOnClickHandler = this.renameOnClickHandler.bind(this);
        this.deleteOnClickHandler = this.deleteOnClickHandler.bind(this);

        this.state = {
            date: new Date(),
            editType: 'day',
            sessions: [],
            dayDisabled: true,
            nameDisabled: false,
            error: ''
        };
    }


    async componentDidMount() {
        // setTimeout( async () => {
        await this.getSessions(format(this.state.date, 'YYYY-MM-DD'));
        // }, 1000);
    }

    async componentDidUpdate(prevProps, prevState) {
        if ((prevState.editType !== this.state.editType) && this.state.editType === 'name') {
            await this.getSessions(format(this.state.date, 'YYYY-MM-DD'), 'allTime');
        } else if ((prevState.editType !== this.state.editType) && this.state.editType === 'day') {
            await this.getSessions(format(this.state.date, 'YYYY-MM-DD'));
        }
    }

    onClickHandler(e) {
        const attr = e.target.dataset.attr;
        if (attr === 'day') {
            this.setState(() => ({
                editType: 'day',
                dayDisabled: true,
                nameDisabled: false
            }));
        } else {
            this.setState(() => ({
                editType: 'name',
                dayDisabled: false,
                nameDisabled: true
            }));
        }
    }

    async getSessions(date, timePeriod = 'day') {
        // if(timePeriod === ' day')
        try {
            const sessions = await getSessions(date, timePeriod);
            this.setState(() => ({sessions}))
        } catch (err) {
            this.onErrorHandler(err.message);
        }
    }

    async getUpdateSessions() {
        await this.getSessions(format(this.state.date, 'YYYY-MM-DD'));
    }

    onErrorHandler(error) {
        this.setState(() => ({error}))
    }

    //todo bulk rename of data doesnt work on json server
    async renameOnClickHandler(value, id) {
        if (this.state.editType === 'day') {
            try {
                await patchSessions(id, value);
                await this.getSessions(format(this.state.date, 'YYYY-MM-DD'));
            } catch (err) {
                this.onErrorHandler(err.message);
            }
        } else {
            try {
                await patchSessions(id, value);
                await this.getSessions(format(this.state.date, 'YYYY-MM-DD'), 'allTime');
            } catch (err) {
                this.onErrorHandler(err.message);
            }
        }
    }

    //todo bulk delete of data doesnt work on json server
    async deleteOnClickHandler(value, id) {
        if (this.state.editType === 'day') {
            try {
                await deleteSessions(id, value);
                await this.getSessions(format(this.state.date, 'YYYY-MM-DD'));
            } catch (err) {
                this.onErrorHandler(err.message);
            }
        } else {
            try {
                await deleteSessions(id, value);
                await this.getSessions(format(this.state.date, 'YYYY-MM-DD'));
            } catch (err) {
                this.onErrorHandler(err.message);
            }
        }
    }

    async onDateChangeHandler(date) {
        this.setState(() => ({date}));
        if (date !== null) {
            await this.getSessions(format(date, 'YYYY-MM-DD'));
        }
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    render() {
        return (
            <div className='container mt-6 pt-3'>
                <div className='row'>
                    <div className="col-6 text-center">
                        <SimpleButton
                            disabled={this.state.dayDisabled}
                            text="Edit sessions"
                            dataAttr="day"
                            onClick={this.onClickHandler}
                        />
                    </div>
                    <div className="col-6 text-center">
                        <SimpleButton
                            disabled={this.state.nameDisabled}
                            text="Edit session names"
                            dataAttr="name"
                            onClick={this.onClickHandler}
                        />
                    </div>
                </div>

                <div className='col-12'>

                    {this.state.editType === 'day' &&
                    <div className='text-center mt-6'>
                        <DatePickerV1
                            onDateChange={this.onDateChangeHandler}
                            date={this.state.date}
                            today={true}
                            maxDetail='month'
                        />
                    </div>
                    }

                    <EditTable
                        renameOnClick={this.renameOnClickHandler}
                        deleteOnClick={this.deleteOnClickHandler}
                        onError={this.onErrorHandler}
                        getSessions={this.getUpdateSessions}
                        type={this.state.editType}
                        sessions={this.state.sessions}/>
                </div>


            </div>
        );
    }

}