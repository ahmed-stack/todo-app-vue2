<template>
    <CustomContainer extraStyle="p-4 overflow-y-auto">
        <Todo v-for="(item, index) in todoList" :key="index" :todo="item" />

        <div v-if="todoList.length === 0"
            class="w-full h-full flex justify-center items-center text-2xl italic text-gray-300">
            No Todos
        </div>
    </CustomContainer>
</template>


<script>
// Components Imports
import CustomContainer from "../common/CustomContainer.vue";
import Todo from "./Todo.vue";

// Constants Imports
import { todoStatus } from "../../constants/todo";


export default {
    name: "TodosContainer",
    components: {
        CustomContainer,
        Todo
    },

    computed: {
        todoList() {
            if (this.$store.getters.getActiveFilter === todoStatus.all) return this.$store.getters.getTodoList;
            else return this.$store.getters.getFilteredTodoList;

        }
    }
}
</script>