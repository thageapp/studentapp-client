<template>
  <div class="page">
    <div class="top-bar">
      <h2>{{ title }}</h2>

      <div class="add-button" @click="addNoteModal">
        <i data-feather="plus"></i>
      </div>
    </div>

    <div class="cards-container notes">
      <div class="small-card note" v-for="note in notes" :key="note.id">
        <div class="note-text-container">
          <div class="note-text">
            {{ note.note }}
          </div>

          <div class="modify-button" @click="updateNoteModal(note.id)">
            ...
          </div>
        </div>

        <div class="card-date-type">
          {{ formatDate(note.date) }} - {{ note.note_type }}
        </div>
      </div>
    </div>

    <modal name="add-note-modal" height="325px" width="450px">
      <div class="modal-content" @keyup.enter="addNote">
        <div class="modal-form">
          <div class="form-group">
            <label for="note">Data</label>
            <input type="text" v-model="date" id="date" placeholder="GG/MM/AAAA" required>
          </div>

          <div class="form-group">
            <label for="note">Promemoria</label>
            <input v-model="note" type="text" placeholder="Testo del promemoria..." id="note" required>
          </div>

          <div class="form-group">
            <label for="note-type">Tipo</label>
            <select v-model="noteType" placeholder="Tipo del promemoria..." id="note-type" required>
              <option value="1">Compito per casa</option>
              <option value="2">Compito scritto</option>
              <option value="3">Interrogazione</option>
              <option value="4">Avviso</option>
            </select>
          </div>

          <button @click="addNote">Aggiungi promemoria</button>
        </div>
      </div>
    </modal>

    <modal name="update-note-modal" height="375px" width="450px">
      <div class="modal-content" @keyup.enter="updateNote(tempNoteId)">
        <div class="modal-form">
          <div class="form-group">
            <label for="tempDate">Data</label>
            <input type="text" v-model="tempDate" id="tempDate" placeholder="GG/MM/AAAA" required>
          </div>

          <div class="form-group">
            <label for="tempNote">Promemoria</label>
            <input v-model="tempNote" type="text" placeholder="Testo del promemoria..." id="tempNote" required>
          </div>

          <div class="form-group">
            <label for="tempNoteType">Tipo</label>
            <select v-model="tempNoteType" placeholder="Tipo del promemoria..." id="tempNoteType" required>
              <option value="1">Compito per casa</option>
              <option value="2">Compito scritto</option>
              <option value="3">Interrogazione</option>
              <option value="4">Avviso</option>
            </select>
          </div>

          <div class="buttons-container">
            <button @click="updateNote(tempNoteId)">Aggiorna promemoria</button>
            <button class="btn-grey" @click="deleteNote(tempNoteId)">Elimina promemoria</button>
          </div>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
import moment from 'moment'
import NotesStore from '@/stores/notes'

export default {
  name: 'agenda',
  data () {
    return {
      title: 'I tuoi promemoria',
      note: '',
      date: '',
      noteType: 1,
      tempNoteId: 0,
      tempNote: '',
      tempDate: '',
      tempNoteType: 0,
      notes: []
    }
  },
  methods: {
    // Shows the modal to add a note
    addNoteModal () {
      this.date = moment().format('DD/MM/YYYY')
      this.$modal.show('add-note-modal')
    },
    checkForm (date, note, noteType) {
      if (!date.length) {
        alert('Inserisci una data.')
        return false
      }

      if (!moment(date, 'DD/MM/YYYY', true).isValid()) {
        alert('La data deve essere nel formato GG/MM/YYYY. Ad esempio 19/03/2017 per il 19 marzo 2017.')
        return false
      }

      if (note.length < 1) {
        alert('Il campo del testo del promemoria è vuoto.')
        return false
      }

      if (noteType < 1) {
        alert('Scegli un tipo dal menu a tendina.')
        return false
      }

      return true
    },
    // Shows the modal to update a note
    updateNoteModal (id) {
      NotesStore.methods.fetchNote(id, note => {
        this.tempNoteId = id
        this.tempNote = note.note
        this.tempDate = moment(note.date, 'YYYY-MM-DD').format('DD/MM/YYYY')
        this.tempNoteType = note.note_type
        this.$modal.show('update-note-modal')
      })
    },
    // Calls the store method to add a note and updates 'notes' array
    addNote () {
      if (!this.checkForm(this.date, this.note, this.noteType)) {
        return
      }

      NotesStore.methods.addNote(this.note, this.toIsoDate(this.date), this.noteType, (err) => {
        if (!err) {
          this.notes = NotesStore.data.notes
          this.$modal.hide('add-note-modal')
        } else {
          alert('Non è stato possibile aggiungere il promemoria.')
        }
      })
    },
    // Calls the store method to update a note and updates 'notes' array
    updateNote (id) {
      if (!this.checkForm(this.tempDate, this.tempNote, this.tempNoteType)) {
        return
      }

      NotesStore.methods.updateNote(id, this.tempNote, this.toIsoDate(this.tempDate), this.tempNoteType, (err) => {
        if (!err) {
          this.notes = NotesStore.data.notes
          this.$modal.hide('update-note-modal')
        } else {
          alert('Non è stato possibile aggiornare il promemoria.')
        }
      })
    },
    // Calls the store method to delete a note and updates 'notes' array
    deleteNote (id) {
      NotesStore.methods.deleteNote(id, err => {
        if (!err) {
          this.notes = NotesStore.data.notes
          this.$modal.hide('update-note-modal')
        } else {
          alert('Non è stato possibile eliminare il promemoria.')
        }
      })
    }
  },
  mounted () {
    // Gets all notes
    NotesStore.methods.fetchNotes(() => {
      this.notes = NotesStore.data.notes
    })
  }
}
</script>

<style scoped>
  /*
    Cards container
  */

  .notes {
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and (max-width: 1200px) {
    .notes {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media screen and (max-width: 1000px) {
    .notes {
      grid-template-columns: 1fr;
    }
  }

  /*
    Notes
  */

  .note {
    flex-direction: column;
  }

  .note-text-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .note-text {
    font-weight: 400;
    font-size: 92%;
    margin-bottom: 6px;
    width: 0;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    flex-grow: 1;
  }
</style>
