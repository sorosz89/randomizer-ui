import React from 'react';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import axios from 'axios';

export default class PersonList extends React.Component {
    state = {
        persons: [],
        timestamp: ""
    }

    componentDidMount() {
        axios.get(`https://dxrab6fch6.execute-api.us-east-1.amazonaws.com/my-first-lambda`)
            .then(res => {
                console.log(res.data)
                const persons = res.data.random;
                const timestamp = res.data.today
                this.setState({ persons, timestamp });
            })
    }

    formatNotes(persons) {
        const template = (person) => `${person}\nYesterday:\nToday:\n`;

        return persons.map(person => {
            return template(person)
        }).toString().replace(/,/g, "");
    }

    getTimeStamp() {
        return new Date(this.state.timestamp).toLocaleString()
    }

    render() {
        return (
            <div>
                <div class = "lista">
                    {
                        this.state.persons.map(person => <li >{person}</li>)
                    }
                </div>

                <div>
                    {this.state.name}
                    <br />
                    <ButtonGroup variant="text" size="medium" color="primary" aria-label="outlined button group">
                        <Button onClick={() => { this.componentDidMount(); }} >Reorder</Button>
                        <Button data-test-id="copy-list-button"
                            onClick={() => navigator.clipboard.writeText(`Timestamp: ${this.getTimeStamp()}\nRandom:  ${this.state.persons.join(", ")}`)}
                        >Copy list</Button>
                        <Button
                            onClick={() => navigator.clipboard.writeText(this.formatNotes(this.state.persons))}
                        >Copy notes</Button>
                    </ButtonGroup>

                </div>
                <p class="timestamp">
                    {this.getTimeStamp()}
                </p>

            </div>
        )
    }
}
