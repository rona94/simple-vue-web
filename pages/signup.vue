<template>
    <FormBoxLogin 
        title="Register"
        actionType="#"
        @submit="onSubmit">

        <FormInput 
            type="text" 
            name="name" 
            label="Name" 
            placeholder=""
            :value="inputName.value"
            :isError="inputName.error"
            :errorMessage="inputName.message" />

        <FormInput 
            type="email" 
            name="email" 
            label="Email" 
            placeholder=""
            :value="inputEmail.value"
            :isError="inputEmail.error"
            :errorMessage="inputEmail.message" />

        <FormInput 
            type="password" 
            name="password" 
            label="Password" 
            placeholder=""
            :value="inputPassword.value"
            :isError="inputPassword.error"
            :errorMessage="inputPassword.message" />

        <FormInput 
            type="password" 
            name="password_confirmation" 
            label="Confirm Password" 
            placeholder=""
            :value="inputPassword2.value"
            :isError="inputPassword2.error"
            :errorMessage="inputPassword2.message" />

        <FormInput 
            type="submit"
            label="Sign in" />

        <p class="mb-6 text-sm font-semibold text-white text-center">
            Already have an account?&nbsp;
            <NuxtLink to="/" class="transition text-aqua-400 hover:text-aqua-300 underline font-semibold">Sign in</NuxtLink>
        </p>
    </FormBoxLogin>
</template>

<script setup>
import fetchAPI from '@/store/api'

const inputName = ref({ value: "", error: false, message: "" })
const inputEmail = ref({ error: false, message: "" })
const inputPassword = ref({ error: false, message: "" })
const inputPassword2 = ref({ error: false, message: "" })

const inputData = (data, value = "", error = "", message = "") => {
    if (data) {
        data.value.value = value
        data.value.error = error
        data.value.message = message

        return data
    }

    return data
}

const onSubmit = async (e) => {
    const { name, email, password, password_confirmation } = e.target
    const data = {
        "name": name.value,
        "email": email.value,
        "password": password.value,
        "password_confirmation": password_confirmation.value
    }
    let hasError = false;

    // name error
    if (data.name.length < 4) {
        inputData(inputName, data.name, true, "The name must be at least 4 characters.")
        hasError = true
    }
    else { 
        inputData(inputName, data.name, false, "")
    }

    // email error
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w+)+$/.test(data.email) === false) {
        inputData(inputEmail, data.email, true, "The email must be a valid email address.")
        hasError = true
    }
    else { 
        inputData(inputEmail, data.email, false, "")
    }

    // password error
    if (data.password != data.password_confirmation) {
        inputData(inputPassword, data.password, true, "The password confirmation does not match.")
        inputData(inputPassword2, data.password_confirmation, true, "The password confirmation does not match.")
        hasError = true
    }
    else {
        inputData(inputPassword, data.password, false, "")
        inputData(inputPassword2, data.password_confirmation, false, "")
    }

    if (hasError) return

    fetchAPI.commit("setName", "register")
    fetchAPI.commit("setType", "POST")
    fetchAPI.dispatch("data", data).then((response) => {
        let { status, message, data:res } = response
        
        if (status == 'ok' && res) {
            navigateTo({ path: '/login' })
        }
        else {
            if (message.toLowerCase().includes("email has already been taken")) {
                inputData(inputEmail, data.email, true, message)
            }
        }
    }, err => {
        console.log('error')
    })
}
</script>

<style scoped>
</style>