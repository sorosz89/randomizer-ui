import PersonList from './randomizer';

let p;
beforeEach(() => {
  p = new PersonList();
});

test('state should be initialized correctly', () => {
  expect(p.state).toBeDefined();
  expect(p.state.persons).toEqual([]);
  expect(p.state.timestamp).toEqual('');
  expect(p.state.loading).toBe(true);
});

test('formatNotes should format standup notes with Yesterday/Today sections', () => {
  const sep = '──────────────────────────────────────────────────';
  // trim() removes trailing newlines from the formatted string
  expect(p.formatNotes(['A', 'B'])).toEqual(
    `Standup notes\n${sep}\n\n1. A\nYesterday:\n\nToday:\n\n\n2. B\nYesterday:\n\nToday:`
  );
});

test('formatNotes should return empty string for empty names', () => {
  expect(p.formatNotes([])).toEqual('');
  expect(p.formatNotes(null)).toEqual('');
});

test('formatNotesHtml should produce HTML for Office paste', () => {
  const html = p.formatNotesHtml(['Alice']);
  expect(html).toContain('<strong>1. Alice</strong>');
  expect(html).toContain('Yesterday:<br/>');
  expect(html).toContain('Today:<br/>');
  expect(html).toContain('<p>');
});

test('formatNotesHtml should return empty string for empty names', () => {
  expect(p.formatNotesHtml([])).toEqual('');
  expect(p.formatNotesHtml(null)).toEqual('');
});
