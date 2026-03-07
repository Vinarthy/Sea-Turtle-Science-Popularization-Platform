<template>
  <div>
    <h2>邮件发送测试</h2>

    <input v-model="email" placeholder="输入QQ邮箱" />
    <br /><br />

    <textarea v-model="content" placeholder="输入邮件内容"></textarea>
    <br /><br />

    <button @click="sendMail">发送邮件</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineOptions({ name: 'MailTest' })

const email = ref('')
const content = ref('')

const sendMail = async () => {
  const res = await fetch('/api/testMail', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email.value,
      content: content.value,
    }),
  })

  const data = await res.json()

  alert(data.message || data.error)
}
</script>

<style>
/* 如果需要样式，可以在这里添加 */
</style>
