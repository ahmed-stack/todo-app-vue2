<template>
   <div class="w-full h-full flex p-2 sm:p-6">
      <div class="w-1/6 h-full box-border">
         <SideMenu />
      </div>

      <div class="w-5/6 h-full box-border pl-2">
         <TodosContainer />
      </div>

      <Create v-if="showCreateForm"/>
   </div>
</template>

<script>
// Components Imports
import SideMenu from '../components/Todos/SideMenu.vue';
import TodosContainer from '../components/Todos/TodosContainer.vue';
import Create from '../components/Todos/Create.vue';

export default {
   components: {
      SideMenu,
      TodosContainer,
      Create
   },

   computed: {
      showCreateForm() {
         return this.$store.getters.getTodoModalState.show;
      }
   }
}

</script>