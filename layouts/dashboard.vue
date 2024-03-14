<template>
    <div class="bg-green-300 min-h-screen grid dashboard">
        <Sidebar class="dashboard__sidebar bg-blue" />

        <main class="dashboard__main bg-white m-5 p-5 rounded-xl">
            <slot />
        </main>
    </div>
</template>

<script setup>
</script>

<style scoped>
.dashboard {
    grid-template-columns: 200px 1fr;
    grid-template-areas: 
        "sidebar content";
}
.dashboard__sidebar {
    grid-area: sidebar;
}
.dashboard__main {
    grid-area: content;
}
@media (max-width: 767px) {
    .dashboard {
        display: block;
    }
}
</style>