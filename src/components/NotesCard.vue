<template>
  <router-link class="card" to="/agenda">
    <div class="card-title-container">
      <h3 class="card-title">{{ title }}</h3>
    </div>

    <div class="card-content">
      <div class="add-button-container">
        <div class="add-button-aura">
          <div class="add-button">
            <i data-feather="plus"></i>
          </div>
        </div>
      </div>

      <div class="list">
        <div v-if="threeNotes.length <= 0">
          Non ci sono promemoria :/
        </div>

        <div class="list-item" v-for="note in threeNotes" :key="note._id">
          <div class="round-value-container note-date">
            {{ formatDate(note.date) }}
          </div>

          <div class="note-text">
            {{ note.note }}
          </div>

          <div class="note-type" :class="note.note_type.toLowerCase().split(' ').join('-')"></div>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
import NotesStore from '../stores/notes'

export default {
  name: 'NotesCard',
  data () {
    return {
      title: 'Agenda',
      notes: []
    }
  },
  methods: {
    // Get day/month from note date
    formatDate (date) {
      date = new Date(date)
      return `${date.getDay()}/${date.getMonth()}`
    }
  },
  computed: {
    // Get only the last three notes
    threeNotes () {
      return this.notes.slice(0, 3)
    }
  },
  mounted () {
    // Get all notes when mounted
    NotesStore.methods.fetchNotes(() => {
      this.notes = NotesStore.data.notes
    })
  }
}
</script>

<style scoped>
/*
  Card content columns setup
*/

.card-content {
  grid-template-columns: auto 1fr;
}

/*
  Dummy add button
*/

.add-button-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.add-button-aura {
  background: rgba(255, 115, 0, 0.75);
  height: 48px;
  width: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  cursor: pointer;
}

.add-button {
  background: #ff5100;
  height: 35px;
  width: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  color: #fff;
}

/*
  Note content
*/

.note-date {
  font-size: 75%;
  font-weight: 500;
}

.note-text {
  padding-left: 10px;
  width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex-grow: 1;
}

/*
  Dot labels
*/

.note-type {
  user-select: none;
  padding: 3px;
  height: 10px;
  width: 10px;
  border-radius: 50%;
  font-size: 95%;
  margin-left: 10px;
}

.compito-per-casa {
  background: #ffa07a;
}

.compito-scritto {
  background: #a9a9a9;
}

.interrogazione {
  background: #444;
}

.avviso {
  background: #f08080;
}
</style>
