<template>
    <div>
        <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-4xl text-black">
            Profile
        </h1>
        <div class="row">
            <div class="md:column-5">
                <form 
                    class="space-y-4 md:space-y-6 mt-5" 
                    actionType="PUT"
                    @submit.prevent="onSubmit($event)">
                    
                    <FormInput 
                        type="text" 
                        name="name"
                        label="Name"
                        placeholder=""
                        :value="inputName"
                        dark="false" />

                    <FormInput 
                        type="email" 
                        name="email"
                        label="Email" 
                        placeholder=""
                        :value="inputEmail"
                        dark="false" />

                    <FormInput 
                        type="submit"
                        label="Save" />
                </form>
            </div>
        </div>

        <Alert
            :status="alertPopup.status"
            :message="alertPopup.message"
            :visible="alertPopup.visible"
        />
    </div>
</template>

<script setup>
import fetchAPI from '@/store/api'
import popupAlert from "@/utils/popupAlert"
import { useTokenStore } from "@/store/token"
import { jwtDecode } from "jwt-decode"

definePageMeta({
    layout: 'dashboard'
})

const router = useRouter()
const store = useTokenStore()
const inputName = ref("")
const inputEmail = ref("")
const alertPopup = ref({
    status: "",
    message: "",
    visible: false
})

if (store.getToken) {
    try {
        const user = jwtDecode(store.getToken)

        inputName.value = user.name
        inputEmail.value = user.email
    } catch (error) {
        store.setToken("")
        router.go()
    }
}

const onSubmit = async (e) => {
    const { name, email } = e.target
    const data = {
        "name": name.value,
        "email": email.value
    }

    fetchAPI.commit("setName", "user_update")
    fetchAPI.commit("setType", "PUT")
    fetchAPI.dispatch("data", data).then((response) => {
        let { status, message, data } = response
        let statusType = "error"

        if (status == 'ok' && data) {
            store.setToken(data.token)
            statusType = "success"
        }

        alertPopup.value = popupAlert(alertPopup.value, {
            status: statusType,
            message
        })
    }, err => {
        console.log('error')
    })
}
</script>

<style scoped>
</style>