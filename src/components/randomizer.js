import React from 'react';
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
        const template = (person) => `${person}\nYesterday:\nToday:\n\n`;

        return  persons.map(person => {
            return template(person)
        }).toString().replace(/,/g, "");
    }

    getTimeStamp() {
        return new Date(this.state.timestamp).toLocaleString()
    }

    render() {
        return (
            <div>
                <div>
                    <p>
                        Timestamp: {this.getTimeStamp()}
                    </p>
                </div>

                <ol>
                    {
                        this.state.persons.map(person => <li >{person}</li>)
                    }
                </ol>
                <div>
                    {this.state.name}
                    <br />
                    <button class="button button1"
                        onClick={() => {
                            this.componentDidMount();
                        }}
                    >Reorder</button>
                    <div>
                        <button data-test-id="copy-list-button" class="button button1"
                            onClick={() => navigator.clipboard.writeText(`Timestamp: ${this.getTimeStamp()}\nRandom:  ${this.state.persons.join(", ")}`)}
                        >Copy list to clipboard</button>
                    </div>
                    <div>
                        <button class="button button1"
                            onClick={() => navigator.clipboard.writeText(this.formatNotes(this.state.persons))}
                        >Copy notes to clipboard</button>
                    </div>

                </div>
            </div>
        )
    }
}
