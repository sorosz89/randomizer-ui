import React from 'react';
import axios from 'axios';
import './randomizer.css';

const API_URL = 'https://dxrab6fch6.execute-api.us-east-1.amazonaws.com/my-first-lambda';

export default class PersonList extends React.Component {
  state = {
    persons: [],
    timestamp: '',
    loading: true,
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    this.setState({ loading: true });
    axios
      .get(API_URL)
      .then((res) => {
        const { random: persons = [], today: timestamp = '' } = res.data || {};
        this.setState({
          persons: Array.isArray(persons) ? persons : [],
          timestamp: timestamp || '',
          loading: false,
        });
      })
      .catch(() => {
        this.setState({ persons: [], timestamp: '', loading: false });
      });
  };

  getTimestampFormatted = () => {
    const { timestamp } = this.state;
    if (!timestamp) return '';
    try {
      return new Date(timestamp).toLocaleString();
    } catch {
      return String(timestamp);
    }
  };

  copyList = () => {
    const { persons, timestamp } = this.state;
    const ts = this.getTimestampFormatted();
    const list = persons.join(', ');
    const text = ts ? `Timestamp: ${ts}\n${list}` : list;
    if (list) navigator.clipboard.writeText(text);
  };

  formatNotes = (names) => {
    if (!names || names.length === 0) return '';
    const ts = this.getTimestampFormatted();
    const header = ts
      ? `Standup notes – Order generated: ${ts}\n${'─'.repeat(40)}`
      : 'Standup notes\n' + '─'.repeat(50);
    const body = (names || [])
      .map(
        (name, i) =>
          `\n${i + 1}. ${name}\nYesterday:\n\nToday:\n\n`
      )
      .join('');
    return `${header}\n${body}`.trim();
  };

  formatNotesHtml = (names) => {
    if (!names || names.length === 0) return '';
    const ts = this.getTimestampFormatted();
    const header = ts
      ? `Standup notes – Order generated: ${ts}`
      : 'Standup notes';
    const body = (names || [])
      .map(
        (name, i) =>
          `<p><strong>${i + 1}. ${name}</strong><br/>Yesterday:<br/><br/>Today:<br/><br/></p>`
      )
      .join('');
    return `<p><strong>${header}</strong></p><p>${'─'.repeat(40)}</p>${body}`;
  };

  copyNotes = () => {
    const { persons } = this.state;
    if (!persons || persons.length === 0) return;
    const text = this.formatNotes(persons);
    const html = this.formatNotesHtml(persons);
    const blobHtml = new Blob([html], { type: 'text/html' });
    const blobPlain = new Blob([text], { type: 'text/plain' });
    const item = new ClipboardItem({
      'text/html': blobHtml,
      'text/plain': blobPlain,
    });
    navigator.clipboard.write([item]).catch(() => {
      navigator.clipboard.writeText(text);
    });
  };

  render() {
    const { persons, loading } = this.state;

    return (
      <div className="randomizer">
        {loading ? (
          <div className="randomizer-loading">
            <div className="randomizer-spinner" />
          </div>
        ) : persons.length > 0 ? (
          <ul className="randomizer-list">
            {persons.map((name, index) => (
              <li key={`${name}-${index}`} className="randomizer-item">
                {name}
              </li>
            ))}
          </ul>
        ) : (
          <p className="randomizer-empty">No data available. Try again later.</p>
        )}

        <p className="randomizer-timestamp">
          Timestamp: {this.getTimestampFormatted()}
        </p>

        <div className="randomizer-actions">
          <button type="button" className="randomizer-btn" onClick={this.fetchData}>
            REORDER
          </button>
          <button type="button" className="randomizer-btn" onClick={this.copyList}>
            COPY LIST
          </button>
          <button type="button" className="randomizer-btn" onClick={this.copyNotes}>
            COPY NOTES
          </button>
        </div>
      </div>
    );
  }
}
