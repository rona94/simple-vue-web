<template>
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div class="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-blue border-purple-400">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-4xl text-white text-center">
                    {{ props.title }}
                </h1>
                <form 
                    class="space-y-4 md:space-y-6" 
                    :actionType="props.action"
                    @submit.prevent="submit($event)">
                    <slot />
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineEmits } from 'vue';

const props = defineProps(["title", "actionType", "submit"])
const emit = defineEmits(["submit"])

const submit = (e) => { 
    emit("submit", e)
}
</script>

<style scoped>
</style>