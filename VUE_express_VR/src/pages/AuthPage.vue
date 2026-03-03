<template>
  <div class="auth">
    <h2>{{ isLogin ? '登录' : '注册' }}</h2>

    <input v-model="email" placeholder="QQ邮箱" />
    <input v-model="password" type="password" placeholder="密码" />

    <button @click="submit">
      {{ isLogin ? '登录' : '注册' }}
    </button>

    <p @click="isLogin = !isLogin">
      {{ isLogin ? '没有账号？去注册' : '已有账号？去登录' }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const isLogin = ref(true)

async function submit() {
  const url = isLogin.value ? '/api/login' : '/api/register'

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({
      email: email.value,
      password: password.value,
    }),
  })

  const data = await res.json()
  alert(data.message || data.error)
}
</script>
<style scoped>
.auth {
  width: 360px;
  margin: 80px auto;
  padding: 40px 32px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
  text-align: center;
  animation: fadeIn 0.6s ease;
}

.auth h2 {
  margin-bottom: 24px;
  font-size: 26px;
  font-weight: 600;
  color: #333;
}

.auth input {
  width: 100%;
  padding: 12px 14px;
  margin-bottom: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 15px;
  transition: all 0.25s ease;
}

.auth input:focus {
  border-color: #4a90e2;
  box-shadow: 0 0 6px rgba(74, 144, 226, 0.3);
  outline: none;
}

.auth button {
  width: 100%;
  padding: 12px 0;
  background: linear-gradient(135deg, #4a90e2, #357abd);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.25s ease;
}

.auth button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(74, 144, 226, 0.4);
}

.auth p {
  margin-top: 18px;
  color: #4a90e2;
  cursor: pointer;
  font-size: 14px;
  transition: 0.2s ease;
}

.auth p:hover {
  text-decoration: underline;
  color: #357abd;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
