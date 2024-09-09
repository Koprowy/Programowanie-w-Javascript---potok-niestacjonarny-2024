
function loadNotes() {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    renderNotes(notes);
}


function renderNotes(notes) {
    const notesList = document.getElementById('notes-list');
    notesList.innerHTML = '';

    notes.sort((a, b) => b.pin - a.pin);

    notes.forEach((note, index) => {
        const noteElement = document.createElement('div');
        noteElement.classList.add('note');
        noteElement.style.backgroundColor = note.color;

        noteElement.innerHTML = `
            <h2>${note.title}</h2>
            <p>${note.content}</p>
            <p class="note-date">${new Date(note.date).toLocaleString()}</p>
            <div class="actions">
                <button onclick="deleteNote(${index})">🗑️</button>
                <button onclick="editNote(${index})">✏️</button>
            </div>
        `;

        notesList.appendChild(noteElement);
    });
}

// Dodawanie notatki
document.getElementById('note-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const title = document.getElementById('note-title').value;
    const content = document.getElementById('note-content').value;
    const color = document.getElementById('note-color').value;
    const pin = document.getElementById('note-pin').checked;
    const date = new Date();

    const note = { title, content, color, pin, date };

    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.push(note);
    localStorage.setItem('notes', JSON.stringify(notes));


    document.getElementById('note-form').reset();
    loadNotes();
});


function deleteNote(index) {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    loadNotes();
}


function editNote(index) {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const note = notes[index];

    document.getElementById('note-title').value = note.title;
    document.getElementById('note-content').value = note.content;
    document.getElementById('note-color').value = note.color;
    document.getElementById('note-pin').checked = note.pin;


    notes.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
}


loadNotes();
