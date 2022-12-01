import { render, screen } from '@testing-library/react';
import PersonList from './randomizer';

let p;
beforeEach(() => {
    p = new PersonList();
});

test('state should be empty', () => {
    expect(p.state).toBeDefined();
});

test('formatting should be ok', () => {
    expect(p.formatNotes(["A", "B"])).toEqual(`A\nYesterday:\nToday:\n\nB\nYesterday:\nToday:\n\n`);
});
