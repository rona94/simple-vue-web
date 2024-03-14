import { createApp } from 'vue'
import { createStore } from 'vuex'
import axios from 'axios'

const runtimeConfig = useRuntimeConfig()

interface stateType {
  name: string,
  type: string
}

const API:any = {
  login: "auth/login",
  logout: "auth/logout",
  register: "auth/register",
  user_update: "user/update"
}

export default createStore({
  state: {
    name: "",
    type: ""
  },
  mutations: {
    setName: (state:stateType, name:string) => {
      state.name = API[name]
    },
    setType: (state:stateType, type:string) => {
      state.type = type
    }
  },
  actions: {
    data: async ({ getters }, data:any) => {
      try {
        let headers = {}
        let token = localStorage.getItem("token")

        if (token != "") { 
          headers = {
            "Accept": "application/json",
            Authorization: `Bearer ${token}`
          }
        }

        const result = await axios({
          baseURL: runtimeConfig.public.API_URL,
          url: getters.getName,
          method: getters.getType,
          timeout: 2000,
          headers,
          data
        })

        const res = result.data

        let newData = {
            status: res ? "ok" : "error",
            message: res ? res.message : "Sorry there was a problem with your request.",
            data: res ? res.data : null
        }
        
        if (res && res.status != "200") {
            newData.status = "error"
        }
        
        return newData;
      } catch (error) {
        return {
          status: "error",
          message: "Sorry there was a problem with your request."
        }
      }
    },
  },
  getters: {
    getName: (state:stateType) => {
      return state.name
    },
    getType: (state:stateType) => {
      return state.type
    },
  }
})

///// TEST /////

// type Test = {
//   a: any[],
//   b: Array<number>,
//   c: 
// }

// interface Arr {
//   1: string,
//   2: number,
//   3: boolean
// }
// interface Test {
//   a: any[], //string[],int[]
//   b: Array<number>,
//   c: Arr,
//   d: any
// }

// const testing:Test = {
//   a: [1, ""],
//   b: [11],
//   c: {
//     1: "",
//     2: 1,
//     3: false
//   },
//   d: {
//     test: "dd"
//   }
// }