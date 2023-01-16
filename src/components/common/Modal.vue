<template>
    <div class="flex fixed top-0 right-0 left-0 bottom-0 justify-center items-center backdrop-brightness-50">
        <div class="bg-gray-100 m-2 p-2 shadow-2xl rounded-md">
            <div class="w-full flex justify-end">
                <div class="w-4 cursor-pointer" @click="handleClose">
                    <img src="/close.png" class="w-full" />
                </div>
            </div>

            <div class="">
                <slot />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        width: {
            type: String,
            default: "36"
        },
        height: {
            type: String,
            default: "28"
        },
        handleClose: {
            type: Function,
            required: true
        }
    }
}
</script>