<template>
    <div class="input-wrap input-parent">
        <div v-if="type == 'submit' || type == 'button'">
            <button :type="type" class="mt-2 transition w-full text-white bg-aqua-400 hover:bg-aqua-300 hover:text-blue focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">{{ props.label }}</button>
        </div>
        <div v-else>
            <label :for="props.name" class="block mb-2 text-sm font-medium text-gray-900" :class="{ 'text-white':textLabel, [isError ? 'border-red' : 'border-purple-400']:true }">{{props.label}}</label>
            <input :type="props.type" :id="props.name" :name="props.name" :placeholder="props.placeholder" :value="value" :class="isError ? 'border-red' : 'border-purple-400'" class="bg-gray-50 border text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-white" required="">
            <p v-if="isError" class="error-label text-red text-xs m-0">{{ errorMessage }}</p>
        </div>
    </div>
</template>

<script setup>
const props = defineProps(["type", "name", "label", "placeholder", "dark", "value", "isError", "errorMessage"])
const textLabel = ref(true)

if (props.dark == "false") { 
    textLabel.value = false
}
</script>

<style scoped>
.input-wrap.input-parent {
    margin-top: 1rem;
}
</style>