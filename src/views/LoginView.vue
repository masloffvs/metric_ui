<script setup lang="ts">
import {ref} from "vue";
import axios from "axios";
import config from "../config";
import LoginSuccessRequestModal from "./LoginSuccessRequestModal.vue";
import LoginSuccessSelectKeyModal from "./LoginSuccessSelectKeyModal.vue";

const fpPromise = import('https://openfpcdn.io/fingerprintjs/v3').then(FingerprintJS => FingerprintJS.load())

const fingerprint = ref("")
const login = ref("")
const approvedBy = ref("")
const response = ref<String|null>(null)

fpPromise
    .then(fp => fp.get())
    .then(result => {
      const visitorId = result.visitorId

      fingerprint.value = visitorId
    })

function getAccess() {
  var bodyFormData = new FormData();

  bodyFormData.set("login", login.value)
  bodyFormData.set("fingerprint", fingerprint.value)
  bodyFormData.set("approved_by", approvedBy.value)

  axios.post(
      config.api_host + "/api/application/ApplicationIDPassport/obtainAccess",
      bodyFormData,
      {
        headers: { "Content-Type": "multipart/form-data" }
      }
  ).then(result => {
    if (result.data.message == "SEND_ACCESS_REQUEST") {
      response.value = "Отправлен запрос на авторизацию. Ожидайте"
    } else if (Array.isArray(result.data.message)) {
      response.value = result.data.message
    }
  }).catch(e => {
    alert("error" + e)
  })
}

</script>

<template>
  <login-success-select-key-modal :list="response" v-if="Array.isArray(response)"/>
  <login-success-request-modal :text="response" v-else-if="response" :onClose="() => {response = null}" />

  <div class="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form class="space-y-6" action="#" method="POST">
          <div class="flex justify-center w-full">
            <div class="block">
              <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                </svg>
              </div>
            </div>
          </div>

          <div>
            <label for="fingerprint" class="block text-sm font-medium text-gray-700">Ваш уникальный отпечаток</label>
            <div class="mt-1">
              <input id="fingerprint" disabled readonly name="fingerprint" type="text" required :value="fingerprint" class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            </div>
          </div>

          <div>
            <label for="name" class="block text-sm font-medium text-gray-700">Ваш логин</label>
            <div class="mt-1">
              <input id="name" v-model="login" name="name" type="text" required class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            </div>
          </div>

          <div>
            <label for="approved_by" class="block text-sm font-medium text-gray-700">Кто подписал доступ</label>
            <div class="mt-1">
              <input id="approved_by" v-model="approvedBy" name="approved_by" type="text" required class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            </div>
          </div>

          <div>
            <button @click.prevent="getAccess()" type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Авторизация</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>

</script>

<style scoped>

</style>