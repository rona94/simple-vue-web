import { defineStore } from "pinia"
import piniaPluginPersistedState from "pinia-plugin-persistedstate"

export const useTokenStore = defineStore("token", {
    state: () => ({ token: "" }),
    getters: {
        getToken: (state) => {
            if (state.token == '') {
                return localStorage.getItem("token")
            }

            return state.token
        },
    },
    actions: {
        setToken(token:string) {
            this.token = token
            localStorage.setItem("token", token)
        }
    },
    persist: true,
})