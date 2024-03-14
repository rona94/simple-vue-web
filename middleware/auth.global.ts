import { useTokenStore } from "@/store/token"

export default defineNuxtRouteMiddleware((to, from) => {
    const store = useTokenStore()

    if (store.getToken === null || store.getToken === '') {
        if(to.path === '/signup') {
            return
        }
        else if (to.path !== '/login') {
            return navigateTo('/login')
        }
    }
    else if (to.path === '/login' || to.path === '/signup') {
        return navigateTo('/')
    }
})