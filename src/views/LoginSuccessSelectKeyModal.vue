<script setup lang="ts">
defineProps<{ list: object }>()
</script>

<template>
  <!-- This example requires Tailwind CSS v2.0+ -->
  <div class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

      <div class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
        <ul role="list" class="divide-y divide-gray-200">
          <li class="py-4 flex cursor-pointer" v-for="key in list" :key="key['access_key']">
            <div class="flex-none h-10 w-10 rounded-full bg-orange-100 flex justify-center content-center items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-orange-500" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="ml-3">
              <p class="text-sm font-medium text-gray-900">Подписал: {{ key['approved_by'] }}</p>
              <p class="text-sm text-gray-500">{{ key['access_key'] }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>