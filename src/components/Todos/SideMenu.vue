<template>
    <CustomContainer extraStyle="flex flex-col justify-start items-center">

        <div class="hidden md:block my-4">
            <Button label="Add New Todo" :clickHandler="openTodoCreateModal" />
        </div>

        <div class="flex md:hidden justify-center items-start w-10 mb-6" @click="openTodoCreateModal">
            <img src="/add.png" />
        </div>

        <div v-for="(item, index) in sideMenuItems" @click="() => changeTodoFilter(item.label)">
            <div :key="index"
                class="hidden md:flex justify-center items-center m-4 py-0.5 text-lg w-32 border cursor-pointer font-medium shadow-lg rounded-lg hover:scale-105 ease-in duration-200"
                :class="activeFilter === item.label ? 'bg-blue-300 text-white shadow-lg border-blue-500 scale-105' : ''">
                {{ item.label }}</div>

            <div class="flex md:hidden justify-center items-start w-10 mb-6">
                <img :src="`/${item.value}` + '.png'" />
            </div>
        </div>
    </CustomContainer>
</template>



<script>
// Components Imports
import CustomContainer from "../common/CustomContainer.vue";
import Button from "../common/Button.vue";

// Constants Imports
import { todoStatus } from "../../constants/todo";
import { TODO_TYPES } from "../../store/types";

const getSideMenuItems = () => {
    let menu = Object.keys(todoStatus).map((elem) => {
        return {
            label: todoStatus[elem],
            value: elem
        }
    });
    return menu;
}

export default {
    data() {
        return {
            sideMenuItems: getSideMenuItems()
        }
    },

    components: {
        CustomContainer,
        Button
    },

    methods: {
        openTodoCreateModal() {
            this.$store.commit(TODO_TYPES.OPEN_TODO_CREATE_MODAL)
        },
        changeTodoFilter(status) {
            this.$store.commit(TODO_TYPES.SET_ACTIVE_FILTER, status)
        }
    },

    computed: {
        activeFilter() {
            return this.$store.getters.getActiveFilter
        }
    }
}
</script>