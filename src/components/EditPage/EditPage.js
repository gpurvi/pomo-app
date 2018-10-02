import React from 'react';
import moment from "moment";
import {getSessions} from "../common/apiCalls";
import EditTable from "./EditTable";
import SimpleButton from "../buttons/SimpleButton";
// import DatePicker from "../TimerPage/DatePicker";
// import ChartDatePicker from "../ChartPage/ChartDatePicker";
import DatePickerV1 from "../common/DatePickerV1";

export default class EditPage extends React.Component {

    constructor(props) {
        super(props);

        // this.onDateChangeHandler = this.onDateChangeHandler.bind(this);
        // this.onStopTimerHandler = this.onStopTimerHandler.bind(this);
        this.getSessions = this.getSessions.bind(this);
        this.onClickHandler = this.onClickHandler.bind(this);
        this.onDateChangeHandler = this.onDateChangeHandler.bind(this);
        this.onErrorHandler = this.onErrorHandler.bind(this);
        // this.initStateFromServer = this.initStateFromServer.bind(this);
        // this.postSession = this.postSession.bind(this);
        this.state = {
            minDate: moment().subtract(5, 'days').toDate(),
            maxDate: new Date(),
            date: new Date(),
            editType: 'day',
            sessions: [],
            dayDisabled: true,
            nameDisabled: false,
            error: ''
        };
    }

    async componentDidMount() {
        await this.getSessions();
    }

    componentDidUpdate(prevProps, prevState){
        console.log(this.state.date);
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

    // async initStateFromServer() {
    //     try {
    //         return await getState();
    //     } catch (err) {
    //         this.setState(() => ({error: err.message}))
    //     }
    // }
    // async postSession(sessionName, date, duration) {
    //     try {
    //         return await postSessions(sessionName, duration);
    //     } catch (err) {
    //         this.setState(() => ({error: err.message}))
    //     }
    // }
    //
    async getSessions(date = '2018-08-01') {
        try {
            const sessions = await getSessions(date);
            this.setState(() => ({sessions}))
        } catch (err) {
            this.onErrorHandler(err.message);
        }
    }

    onErrorHandler(error) {
        this.setState(() => ({error}))
    }

    onDateChangeHandler(date) {
        this.setState(() => ({date}));
    }

    render() {
        return (
            <div>
                <div>
                    <SimpleButton
                        disabled={this.state.dayDisabled}
                        text="Edit sessions"
                        dataAttr="day"
                        onClick={this.onClickHandler}
                    />
                    <SimpleButton
                        disabled={this.state.nameDisabled}
                        text="Edit session names"
                        dataAttr="name"
                        onClick={this.onClickHandler}
                    />
                </div>
                {this.state.editType === 'day' &&
                <DatePickerV1
                    minDate={this.state.minDate}
                    maxDate={this.state.maxDate}
                    onDateChange={this.onDateChangeHandler}
                    date={this.state.date}
                    today={true}
                    maxDetail='month'
                />
                }
                <EditTable
                    onError={this.onErrorHandler}
                    getSessions={this.getSessions}
                    type={this.state.editType}
                    sessions={this.state.sessions}/>
            </div>
        );
    }

}