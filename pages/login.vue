<template>
    <FormBoxLogin
        title="Login"
        actionType="#"
        @submit="onSubmit">

        <p v-if="isError" class="error-label text-red text-sm m-0">{{ errorMessage }}</p>
        
        <FormInput 
            type="email" 
            name="email"
            label="Email"
            placeholder="" />

        <FormInput 
            type="password" 
            name="password"
            label="Password" 
            placeholder="" />

        <FormInput 
            type="submit"
            label="Sign in" />

        <p class="mb-6 text-sm font-semibold text-white text-center">
            Don't have an account?&nbsp;
            <NuxtLink to="/signup" class="transition text-aqua-400 hover:text-aqua-300 underline font-semibold">Sign up</NuxtLink>
        </p>
    </FormBoxLogin>
</template>

<script setup>
import fetchAPI from '@/store/api'
import { useTokenStore } from "@/store/token"

const isError = ref(false)
const errorMessage = ref("")

const onSubmit = async (e) => {
    const { email, password } = e.target
    const data = {
        "email": email.value,
        "password": password.value
    }

    fetchAPI.commit("setName", "login")
    fetchAPI.commit("setType", "POST")
    fetchAPI.dispatch("data", data).then((response) => {
        let { status, message, data } = response

        if (status == 'ok' && data) {
            const store = useTokenStore()
            store.setToken(data.token)

            navigateTo({ path: '/' })
        }
        else {
            isError.value = true
            errorMessage.value = typeof message == "object" ? message[0] : message
        }
    }, err => {
        console.log('error')
    })
}

// store.state.count // state
// store.getters.testingto //getters
// store.commit("increment") //mutations
// store.dispatch("apiPost", { 
//     email: "rona@gmail.com",
//     password: "testing"
// }).then((res) => {  //dispatch
//     console.log('yeL ',res)
// })
</script>

<style scoped>
</style>