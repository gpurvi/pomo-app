import React from 'react';
import DatePickerV1 from "../common/DatePickerV1";

const ChartButtons = (props) => (
    <div className='row mt-3'>
        <div className='col-4 text-center pt-1'>
            <div className="form-check form-check-inline">

                <label className="form-check-label">
                    <input
                        onChange={props.onCheck}
                        className="form-check-input"
                        type="checkbox"
                        value="sessions"
                        checked={props.showSessions}/>
                    Sessions
                </label>
            </div>

            <div className="form-check form-check-inline">

                <label className="form-check-label">
                    <input
                        onChange={props.onCheck}
                        className="form-check-input"
                        type="checkbox"
                        value="hours"
                        checked={props.showDurations}/>
                    Hours
                </label>
            </div>
        </div>

        <div className="col-8">
            <DatePickerV1
                minDate={props.minDate}
                onDateChange={props.onDateChange}
                date={props.date}
                today={false}
                maxDetail={props.maxDetail}
            />
        </div>
    </div>
);

export default ChartButtons;