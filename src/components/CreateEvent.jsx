import React, { useState, useReducer } from 'react';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import { Button } from 'react-toolbox/lib/button';
import DatePicker from 'react-toolbox/lib/date_picker';
import TimePicker from 'react-toolbox/lib/time_picker';
import FontIcon from 'react-toolbox/lib/font_icon';
import Input from 'react-toolbox/lib/input';
import ApiService from '../services/ApiService';
import './create.event.css';

function reducer (state, action) {
    switch (action.type) {
        case "TITLE":
        case "DESCRIPTION":
        case "DATE":
        case "TIME":
        case "IMAGE":
            return Object.assign({}, state, action.payload);
        default:
            throw new Error("Unrecognized action passed to the reducer");
    }
}

const initialState = {
    title: "",
    description: "",
    image: ""
};

export default props => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <Card style={{ width: "500px", margin: "auto" }} /* theme={styles} */ styleName="card" raised>
            <CardTitle
                avatar="https://placeimg.com/80/80/animals"
                title="Avatar style title"
                subtitle="Subtitle here"
            />
            <Input type="text" name="title" label="Title" value={state.title} onChange={title => dispatch({ type: "TITLE", payload: { title } })} />
            <DatePicker label='Event date' sundayFirstDayOfWeek onChange={date => dispatch({ type: "DATE", payload: { date } })} value={state.date} />
            {/* <TimePicker label='Event time' onChange={time => setTime(time)} value={time} /> */}
            <Input type="file" styleName="file" icon={<FontIcon value="icon_upload" />} name="image" accept="image/*" label="Title" value={state.image} onChange={image => dispatch({ type: "IMAGE", payload: { image } })} />
            {
                state.image && <CardMedia
                    aspectRatio="wide"
                    image="https://placeimg.com/800/450/nature"
                />
            }
            <Input type='text' multiline label='Event description' maxLength={300} value={state.description} onChange={description => dispatch({ type: "DESCRIPTION", payload: { description } })} />
            <CardActions>
                <Button onClick={() => saveEvent(state)} flat raised label="Save Event" />
            </CardActions>
        </Card>
    )
};

function saveEvent (event) {
    ApiService.post('/_events/v1/api/events', event, undefined, response => {
        console.log(response);
    });
}