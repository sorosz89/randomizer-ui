import React from 'react';
import { ButtonGroup, Button, Typography, Paper, Fade, CircularProgress, Card, CardContent } from '@mui/material';
import axios from 'axios';
import './randomizer.css';

export default class PersonList extends React.Component {
    state = {
        persons: [],
        timestamp: "",
        showList: false,
        loadingCards: true // Separate loading state for cards
    };

    componentDidMount() {
        this.fetchData();
    }

    fetchData = () => {
        this.setState({ loadingCards: true }); // Set loading state for cards only
        axios.get(`https://dxrab6fch6.execute-api.us-east-1.amazonaws.com/my-first-lambda`)
            .then(res => {
                const { random: persons, today: timestamp } = res.data;
                this.setState({
                    persons,
                    timestamp,
                    showList: true,
                    loadingCards: false // Reset loading state for cards
                });
            });
    };

    formatNotes = (persons) => {
        return persons
            .map(person => 
                `${person}\nYesterday:\n  - [ ] Task 1\n  - [ ] Task 2\nToday:\n  - [ ] Task 1\n  - [ ] Task 2`
            )
            .join("\n\n"); // Ensure proper spacing between entries without trailing newline
    };

    getTimeStamp = () => {
        return new Date(this.state.timestamp).toLocaleString();
    };

    renderCard = (person, index) => (
        <Card 
            key={index} 
            className="list-card" 
            style={{ 
                margin: '15px auto', 
                padding: '10px', 
                backgroundColor: index % 2 === 0 ? '#1c1c1c' : '#2a2a2a', 
                color: '#00FF7F', 
                width: '100%', // Match the width of the button container
                borderRadius: '12px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                height: '80px' 
            }}
        >
            <CardContent style={{ padding: 0 }}>
                <li 
                    style={{ 
                        margin: 0, 
                        textAlign: 'center', 
                        fontFamily: 'Roboto, sans-serif', 
                        fontWeight: 'bold', 
                        textTransform: 'uppercase', 
                        backgroundColor: index % 2 === 0 ? '#1c1c1c' : '#2a2a2a', 
                        color: '#00FF7F', 
                        borderRadius: '8px', 
                        padding: '10px' 
                    }}
                >
                    {person}
                </li>
            </CardContent>
        </Card>
    );

    render() {
        const { persons, loadingCards, showList } = this.state;

        return (
            <Paper 
                elevation={3} 
                style={{ 
                    padding: '20px', 
                    margin: '20px', 
                    backgroundColor: '#121212', 
                    color: '#00FF7F', 
                    maxWidth: '100%', 
                    overflowX: 'hidden' // Prevent horizontal scrollbars
                }}
            >
                <Fade in={showList}>
                    <div style={{ width: '100%' }}> {/* Ensure cards and buttons share the same width */}
                        <ul style={{ padding: 0, listStyle: 'none', margin: 0 }}>
                            {loadingCards ? (
                                <div 
                                    style={{ 
                                        display: 'flex', 
                                        justifyContent: 'center', 
                                        alignItems: 'center', 
                                        height: '200px', 
                                        backgroundColor: '#121212', 
                                        maxWidth: '100%' 
                                    }}
                                >
                                    <CircularProgress style={{ color: '#00FF7F' }} />
                                </div>
                            ) : (
                                persons.map(this.renderCard)
                            )}
                        </ul>
                    </div>
                </Fade>
                <Typography 
                    variant="body2" 
                    color="textSecondary" 
                    style={{ marginTop: '10px', color: '#bbb', textAlign: 'center', wordWrap: 'break-word' }} // Ensure text wraps
                >
                    Timestamp: {this.getTimeStamp()}
                </Typography>
                <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <ButtonGroup 
                        variant="contained" 
                        style={{ 
                            display: 'flex', 
                            justifyContent: 'center', 
                            gap: '10px', 
                            flexWrap: 'wrap', // Ensure buttons wrap on smaller screens
                            alignItems: 'center', 
                            width: '100%' // Ensure buttons take the full width
                        }}
                    >
                        <Button 
                            onClick={this.fetchData} 
                            className="menu-button"
                            style={{ backgroundColor: '#00FF7F', color: '#121212', padding: '10px 20px', borderRadius: '8px' }}
                        >
                            Reorder
                        </Button>
                        <Button 
                            onClick={() => navigator.clipboard.writeText(`Timestamp: ${this.getTimeStamp()}\nRandom: ${persons.join(", ")}`)} 
                            className="menu-button"
                            style={{ backgroundColor: '#00FF7F', color: '#121212', padding: '10px 20px', borderRadius: '8px' }}
                        >
                            Copy list
                        </Button>
                        <Button 
                            onClick={() => navigator.clipboard.writeText(this.formatNotes(persons))} 
                            className="menu-button"
                            style={{ backgroundColor: '#00FF7F', color: '#121212', padding: '10px 20px', borderRadius: '8px' }}
                        >
                            Copy notes
                        </Button>
                    </ButtonGroup>
                </div>
            </Paper>
        );
    }
}
