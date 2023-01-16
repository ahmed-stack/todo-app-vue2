<template>
    <Modal :handleClose="closeModal">
        <div class="flex justify-center uppercase items-center p-2 text-lg font-medium">
            {{ formTitle }}
        </div>

        <div class="w-full">
            <ValidationObserver v-slot="{ handleSubmit }">
                <form @submit.prevent="handleSubmit(onSubmit)" class="w-80 sm:w-96">
                    <div class="p-2">
                        <ValidationProvider rules="required" :immediate="false" v-slot="{ errors }">
                            <div class="w-full px-3 mb-4">
                                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                    for="title">
                                    Title
                                </label>
                                <input id="title" v-model="todo.title"
                                    class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white"
                                    :class="errors[0] ? `border-red-500` : `border-gray-400`" type="text"
                                    placeholder="Write title">
                                <div class="relative">
                                    <p class="absolute text-red-500 text-xs italic">{{ errors[0] }}</p>
                                </div>
                            </div>
                        </ValidationProvider>
                    </div>

                    <div class="p-2">
                        <ValidationProvider rules="required" v-slot="{ errors }">
                            <div class="w-full px-3 mb-4">
                                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                    for="description">
                                    Description
                                </label>
                                <textarea id="description" v-model="todo.description"
                                    class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white"
                                    :class="errors[0] ? `border-red-500` : `border-gray-400`" type="text"
                                    placeholder="Write description" rows="5"></textarea>
                                <div class="relative">
                                    <p class="absolute text-red-500 text-xs italic">{{ errors[0] }}</p>
                                </div>
                            </div>
                        </ValidationProvider>
                    </div>

                    <div class="p-2">
                        <ValidationProvider rules="required" v-slot="{ errors }">
                            <div class="w-full px-3 mb-4">
                                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                    for="date">
                                    Date
                                </label>
                                <input id="date" v-model="todo.date"
                                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white"
                                    :class="errors[0] ? `border-red-500` : `border-gray-400`" type="date"
                                    placeholder="Write description">
                                <div class="relative">
                                    <p class="absolute text-red-500 text-xs italic">{{ errors[0] }}</p>
                                </div>
                            </div>
                        </ValidationProvider>
                    </div>

                    <div class="flex justify-center w-full p-2">
                        <Button label="SUBMIT" type="submit" />
                    </div>
                </form>
            </ValidationObserver>
        </div>
    </Modal>
</template>

<script>
// Global Imports
import { required } from 'vee-validate/dist/rules';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';

// Components Imports
import Modal from "../common/Modal.vue";
import Button from "../common/Button.vue";

// Constants Imports
import { TODO_TYPES } from "../../store/types";

extend('required', {
    ...required,
    message: "Required"
});

export default {
    props: {
        todoToEdit: {
            type: Object
        }
    },

    components: {
        Modal,
        ValidationProvider,
        ValidationObserver,
        Button
    },

    computed: {
        formTitle() {
            if (this.$store.getters.getTodoModalState.type === "create") return "Create New Todo";
            if (this.$store.getters.getTodoModalState.type === "update") return "Edit Todo";
        },
        todo() {
            return {
                id: this.$store.getters.getTodoModalState.todoToEdit?.id ?? "",
                title: this.$store.getters.getTodoModalState.todoToEdit?.title ?? "",
                description: this.$store.getters.getTodoModalState.todoToEdit?.description ?? "",
                date: this.$store.getters.getTodoModalState.todoToEdit?.date ?? "",
                status: this.$store.getters.getTodoModalState.todoToEdit?.status ?? ""
            }
        }
    },

    methods: {
        onSubmit() {
            if (this.$store.getters.getTodoModalState.type === "create") {
                this.$store.dispatch("addNewTodo", this.todo);
            }
            if (this.$store.getters.getTodoModalState.type === "update") {
                this.$store.dispatch("updateTodo", this.todo);
            }
            this.$store.commit(TODO_TYPES.CLOSE_TODO_MODAL);

        },
        closeModal() {
            this.$store.commit(TODO_TYPES.CLOSE_TODO_MODAL);
        }
    }
}
</script>