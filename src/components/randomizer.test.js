import PersonList from './randomizer';

let p;
beforeEach(() => {
    p = new PersonList();
});

test('state should be initialized correctly', () => {
    expect(p.state).toBeDefined();
    expect(p.state.persons).toEqual([]);
    expect(p.state.timestamp).toEqual("");
    expect(p.state.showList).toBe(false);
    expect(p.state.loadingCards).toBe(true);
});

test('formatNotes should format notes correctly', () => {
    expect(p.formatNotes(["A", "B"])).toEqual(
        `A\nYesterday:\n  - [ ] Task 1\n  - [ ] Task 2\nToday:\n  - [ ] Task 1\n  - [ ] Task 2\n\n` +
        `B\nYesterday:\n  - [ ] Task 1\n  - [ ] Task 2\nToday:\n  - [ ] Task 1\n  - [ ] Task 2`
    );
});
