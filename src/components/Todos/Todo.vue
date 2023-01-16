<template>
    <div class="w-full mb-4">
        <CustomContainer
            :extraStyle="`border shadow-md cursor-pointer hover:scale-101 ease-in duration-200 ${todo.status === todoStatus.due ? 'border-red-400' : 'border-gray-200'}`">

            <div class="md:grid flex md:grid-cols-[70%_30%] flex-col-reverse">
                <div class="text-2xl font-medium pb-2 capitalize">{{ todo.title }}</div>

                <div class="flex justify-between sm:justify-end">
                    <div class="flex justify-end text-sm font-medium text-blue-700 underline mb-2 md:mb-0 sm:mr-4"
                        @click="showCopyConfirmation">Copy Todo
                    </div>

                    <div v-if="todo.status !== todoStatus.completed"
                        class="flex justify-end text-sm font-medium text-blue-700 underline mb-2 md:mb-0"
                        @click="markTodoCompleted">Mark Completed
                    </div>
                </div>
            </div>


            <div class="w-full grid md:grid-cols-[80%_15%_5%] grid-cols-1">

                <div class="text-gray-500 italic">{{ todo.description }}</div>


                <div class="flex md:flex-col pt-4 md:pt-0 md:justify-center justify-between items-center">
                    <div class="text-gray-500 italic md:pb-2">{{ moment(todo.date).format("DD/MM/YYYY") }}</div>
                    <div class="w-28 py-0.5 text-center rounded-2xl text-white font-semibold"
                        :class="getTodoStatusStyle(todo.status)">{{ todo.status }}</div>
                </div>

                <div class="flex md:flex-col md:justify-center justify-end items-center">
                    <div class="w-8 box-border p-1.5" @click="showDeleteConfirmation">
                        <img class="w-full h-full hover:scale-110 ease-in duration-200" src="/remove.png" />
                    </div>
                    <div class="w-8 box-border p-1.5" @click="openTodoEditModal">
                        <img class="w-full h-full hover:scale-110 ease-in duration-200" src="/edit.png" />
                    </div>
                </div>

            </div>
        </CustomContainer>

        <ConfirmationModal v-if="isDeleteConfirmation" confirmationBtnVariant="danger" confirmationLabel="Are you sure, you want to delete this todo?"
            confirmationBtnText="Delete" :confirmHandler="deleteTodoHandler" :cancelHandler="hideDeleteConfirmation" />

        <ConfirmationModal v-if="isCopyConfirmation" confirmationBtnVariant="secondary" confirmationLabel="Are you sure, you want to copy this todo?"
            confirmationBtnText="Copy" :confirmHandler="copyTodoHandler" :cancelHandler="hideCopyConfirmation" />
    </div>
</template>


<script>
// Global Imports
import moment from 'moment';

// Components Imports
import CustomContainer from '../common/CustomContainer.vue';
import ConfirmationModal from '../common/Confirmation.vue';

// Constants Imports
import { todoStatus } from "../../constants/todo";
import { TODO_TYPES } from "../../store/types";

const getTodoStatusStyle = (status) => {
    if (status.toLowerCase() === todoStatus.pending.toLowerCase()) return "bg-blue-300";
    if (status.toLowerCase() === todoStatus.completed.toLowerCase()) return "bg-green-300";
    if (status.toLowerCase() === todoStatus.due.toLowerCase()) return "bg-red-300";
}

export default {
    data() {
        return {
            todoStatus,
            isDeleteConfirmation: false,
            isCopyConfirmation: false
        }
    },

    props: {
        todo: {
            type: Object
        }
    },

    components: {
        CustomContainer,
        ConfirmationModal
    },

    methods: {
        getTodoStatusStyle,

        openTodoEditModal() {
            this.$store.commit(TODO_TYPES.OPEN_TODO_UPDATE_MODAL, this.todo)
        },

        markTodoCompleted() {
            let updatedTodo = { ...this.todo, status: todoStatus.completed };
            this.$store.dispatch("updateTodo", updatedTodo);
            this.hideDeleteConfirmation();
        },

        showDeleteConfirmation() {
            this.isDeleteConfirmation = true;
        },

        hideDeleteConfirmation() {
            this.isDeleteConfirmation = false;
        },

        deleteTodoHandler() {
            this.$store.dispatch("deleteTodo", this.todo);
            this.hideDeleteConfirmation();
        },

        showCopyConfirmation() {
            this.isCopyConfirmation = true;
        },

        hideCopyConfirmation() {
            this.isCopyConfirmation = false;
        },

        copyTodoHandler() {
            this.$store.dispatch("copyTodo", this.todo);
            this.hideCopyConfirmation();
        },

        moment

    },
}
</script>