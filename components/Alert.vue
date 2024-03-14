<template>
    <transition name="fade">
        <div v-show="props.status && props.message && visible === true" :class="{[`alert--${props.status}`]: true}" class="alert fixed z-50 right-0 top-0 border-l-4 p-4" role="alert">
            <p class="font-bold alert__status">{{ props.status }}</p>
            <p>{{ props.message }}</p>
        </div>
    </transition>
</template>

<script setup>
const props = defineProps(["status", "message", "visible"])
</script>

<style scoped>
.alert {
    width: 350px;
    color: #155724;
    background: #D4EDDA;
    border-color: #155724;
}
.alert.alert--success,
.alert.alert--error,
.alert.alert--warning {
    margin: 0;
}
.alert--error {
    color: #BF3131;
    background: #F8D7DA;
    border-color: #BF3131;
}
.alert--warning {
    color: #E36414;
    background: #FFF3CD;
    border-color: #E36414;
}
.alert__status {
    text-transform: capitalize;
}
.fade-enter-active {
    transition: all 0.3s ease;
}
.fade-leave-active {
    transition: all 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: translateX(100%);
}
</style>