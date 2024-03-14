<template>
    <aside>
        <div class="dashboard__header">
            <button class="dashboard__menu" @click.self="toggleMenu">
                <span class="line"></span>
                <span class="line"></span>
                <span class="line"></span>
            </button>
        </div>

        <div class="dashboard__lists__wrap" @click.self="toggleMenu" :class="{ active: isActive }">
            <ul class="dashboard__lists pt-10 pb-5">
                <li>
                    <NuxtLink to="/" class="transition p-3 block transition text-white">
                        <i class="icon icon--profile mr-2"></i>
                        Profile
                    </NuxtLink>
                    <button @click="onLogout" class="transition p-3 block transition text-white">
                        <i class="icon icon--logout mr-2"></i>
                        Logout
                    </button>
                </li>
            </ul>
        </div>
        
    </aside>
</template>

<script setup>
import fetchAPI from "@/store/api"
import { useTokenStore } from "@/store/token"
import { useRouter } from "vue-router";

const isActive = ref(false)
const router = useRouter()

const toggleMenu = () => {
    isActive.value = !isActive.value
}

const onLogout = () => { 
    fetchAPI.commit("setName", "logout")
    fetchAPI.commit("setType", "POST")
    fetchAPI.dispatch("data").then((response) => {
        const store = useTokenStore()
        store.setToken("")

        router.go()
        // navigateTo({ path: '/login' }) 
    }, err => {
        console.log('error')
    })
}
</script>

<style scoped>
.dashboard__lists > li > a:hover {
    background: rgba(255, 255, 255, 0.1)
}

@media (max-width: 767px) {
    .dashboard__header {
        min-height: 60px;
    }
    .dashboard__menu {
        float: right;
        width: 40px;
        margin-top: 17px;
        margin-right: 20px;
    }
    .dashboard__menu .line {
        display: block;
        width: 100%;
        height: 2px;
        background-color: #fff;
    }
    .dashboard__menu .line:nth-child(2) {
        margin-top: 10px;
    }  
    .dashboard__menu .line:nth-child(3) {
        margin-top: 10px;
    }
    .dashboard__lists__wrap {
        position: fixed;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100vh;
        background: rgba(0,0,0,0.5);
        overflow: hidden;
    }
    .dashboard__lists__wrap.active {
        left: 0;
        -webkit-transition: none;
        transition: none;
    }
    .dashboard__lists {
        position: relative;
        left: -250px;
        width: 250px;
        height: 100%;
        overflow-y: auto;
        background-color: #265073;
        -webkit-transition: left 0.3s;
        transition: left 0.3s;
    }
    .dashboard__lists__wrap.active .dashboard__lists {
        left: 0;
    }
}
</style>