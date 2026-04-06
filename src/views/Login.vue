<template>
  <div class="min-h-screen flex items-center justify-center bg-[#F1F5F9] p-4">
    <div class="w-full max-w-md">
      <!-- Logo -->
      <div class="flex justify-center mb-8">
        <div class="bg-brand-navy p-4 rounded-2xl shadow-xl">
          <img src="https://evogard.com.br/wp-content/uploads/2023/06/logo-evogard.png" alt="Evogard Logo" class="h-10 w-auto brightness-0 invert" referrerPolicy="no-referrer" />
        </div>
      </div>

      <!-- Login Card -->
      <div class="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
        <div class="text-center mb-8">
          <h1 class="text-2xl font-bold text-brand-navy mb-2">Bem-vindo de volta</h1>
          <p class="text-gray-500 text-sm">Entre com suas credenciais para acessar o painel</p>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-6">
          <div>
            <label class="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">E-mail</label>
            <div class="relative">
              <span class="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </span>
              <input 
                v-model="email" 
                type="email" 
                required 
                placeholder="seu@email.com"
                class="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green outline-none transition-all text-sm"
              />
            </div>
          </div>

          <div>
            <label class="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">Senha</label>
            <div class="relative">
              <span class="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </span>
              <input 
                v-model="password" 
                type="password" 
                required 
                placeholder="••••••••"
                class="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green outline-none transition-all text-sm"
              />
            </div>
          </div>

          <div v-if="error" class="bg-rose-50 text-rose-600 p-4 rounded-2xl text-xs font-medium flex items-center gap-3 border border-rose-100 animate-shake">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {{ error }}
          </div>

          <button 
            type="submit" 
            :disabled="loading"
            class="w-full py-4 bg-brand-navy text-white rounded-2xl font-bold text-sm hover:bg-brand-navy/90 transition-all shadow-xl shadow-brand-navy/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="loading" class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            {{ loading ? 'Autenticando...' : 'Entrar no Sistema' }}
          </button>
        </form>
      </div>

      <!-- Footer -->
      <p class="text-center mt-8 text-gray-400 text-xs">
        &copy; 2024 Evogard AutoAnalytics. Todos os direitos reservados.
      </p>
    </div>
  </div>
</template>

<script>
import { authService } from '../services/authService';

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      error: '',
      loading: false
    }
  },
  methods: {
    async handleLogin() {
      this.loading = true;
      this.error = '';
      
      try {
        const result = await authService.login(this.email, this.password);
        if (result.success) {
          this.$router.push('/');
        } else {
          this.error = result.message || 'Credenciais inválidas';
        }
      } catch (err) {
        this.error = 'Ocorreu um erro ao tentar realizar o login';
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>

<style scoped>
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-4px); }
  75% { transform: translateX(4px); }
}
.animate-shake {
  animation: shake 0.2s ease-in-out 0s 2;
}
</style>
