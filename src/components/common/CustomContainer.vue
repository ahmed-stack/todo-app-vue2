<template>
    <div class="w-full h-full bg-white rounded-xl shadow-lg p-4 box-border" :class="extraStyle">
        <slot />
    </div>
</template>

<script>
    export default {
        props: {
            extraStyle: String
        }
    }
</script>