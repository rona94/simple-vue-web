import { useTokenStore } from "@/store/token"

export default async (url:string="", datas:any=[]) => {
    const runtimeConfig = useRuntimeConfig()
    const store = useTokenStore()
    const token = store.getToken
    let authHeader = {}

    if (token) { 
        authHeader = {
            Authorization: `Bearer ${token}`
        }
    }

    const { data, pending, error, refresh } = await useAsyncData(
        url,
        () => $fetch(url, {
            method: datas.method,
            headers: {
                "Accept": "application/json",
                ...authHeader
            },
            body: datas.data,
            baseURL: runtimeConfig.public.API_URL,
        })
    )

    try {
        let res:any = data.value
        let newData = {
            status: res ? "ok" : "error",
            message: res ? res.message : "Unexpected error occurred.",
            data: res ? res.data : null
        }
        
        if (res && res.status != "200") {
            newData.status = "error"
        }
        
        return newData;
    } catch (error) {
        return {
            status: "error",
            message: "Unexpected error occurred."
        }
    }
}