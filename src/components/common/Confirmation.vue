<template>
    <Modal :handleClose="cancelHandler">
        <div class="p-2 w-96 text-lg ">
            {{ confirmationLabel }}
        </div>

        <div class="w-full flex justify-end p-2">
            <div class="flex justify-center items-center">
                <div class="p-2">
                    <Button variant="primary" label="Cancel" :clickHandler="cancelHandler" />
                </div>

                <div class="p-2">
                    <Button :variant="confirmationBtnVariant" :label="confirmationBtnText" :clickHandler="confirmHandler" />
                </div>
            </div>
        </div>
    </Modal>
</template>

<script>
// Components Imports
import Button from './Button.vue';
import Modal from './Modal.vue';

export default {
    props: {
        confirmationLabel: {
            type: String
        },

        confirmationBtnVariant: {
            type: String
        },

        confirmationBtnText: {
            type: String
        },

        cancelHandler: {
            type: Function,
            default: () => { }
        },

        confirmHandler: {
            type: Function,
            default: () => { }
        }
    },

    components: {
        Modal,
        Button
    }
}
</script>