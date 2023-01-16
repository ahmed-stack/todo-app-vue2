<template>
    <button :type="type" class="rounded-md shadow-md text-white cursor-pointer hover:scale-105 ease-in duration-200"
        :class="`${getButtonVariant(variant)}`" @click="clickHandler && clickHandler()">
        <div class="px-4 py-2"> {{ label }}</div>
    </button>
</template>

<script>

const getButtonVariant = (variant) => {
    if (variant === "primary") return "bg-blue-400";
    if (variant === "danger") return "bg-red-400"
    if (variant === "secondary") return "bg-green-400"
}

export default {
    props: {
        type: {
            type: String,
            default: "button"
        },
        label: {
            type: String,
            required: true
        },
        variant: {
            type: String,
            default: "primary"
        },
        clickHandler: {
            type: Function | undefined,
            required: false
        }
    },

    methods: {
        getButtonVariant
    }
}
</script>