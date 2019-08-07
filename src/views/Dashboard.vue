<template>
  <div class="page" id="dashboard">
    <h2>{{ title }}</h2>
    <div class="dashboard-grid">
      <GradesCard />
      <NotesCard />
    </div>
  </div>
</template>

<script>
import GradesCard from '@/components/GradesCard'
import NotesCard from '@/components/NotesCard'

export default {
  name: 'banco',
  components: {
    GradesCard,
    NotesCard
  },
  data () {
    return {
      title: 'Il tuo banco'
    }
  }
}
</script>

<style>
/*
  Grid
*/

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
}

@media screen and (max-width: 1200px) {
  .dashboard-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media screen and (max-width: 1000px) {
  .dashboard-grid {
    grid-template-columns: 1fr;
  }
}

/*
  Cards
*/

.card {
  border-radius: 20px;
  padding: 15px;
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.075);
  background: white;
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: inherit;
  transition: transform 0.15s;
}

.card:hover {
  transform: scale(1.0075);
}

.card-content {
  display: grid;
  grid-gap: 30px;
  flex-grow: 1;
}

.list {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.list-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px;
}

.round-value-container {
  background: #fff;
  box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.1);
  user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  height: 28px !important;
  width: 28px !important;
}
</style>
