<template>
  <div class="min-h-screen bg-[#F1F5F9] font-sans text-brand-navy">
    <nav v-if="isAuthenticated" class="bg-brand-navy border-b border-white/5 px-6 py-4 sticky top-0 z-20 shadow-lg">
      <div class="max-w-7xl mx-auto flex justify-between items-center">
        <div class="flex items-center gap-8">
          <div class="flex items-center gap-2 bg-white/10 p-1.5 rounded-xl backdrop-blur-md border border-white/10">
            <!-- Logo Image -->
            <img src="https://evogard.com.br/wp-content/uploads/2023/06/logo-evogard.png" alt="Evogard Logo" class="h-8 w-auto object-contain brightness-0 invert" referrerPolicy="no-referrer" />
          </div>
          
          <!-- Desktop Navigation Links -->
          <div class="hidden md:flex items-center gap-1">
            <router-link 
              to="/" 
              class="px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2"
              :class="$route.name === 'Dashboard' ? 'bg-brand-green text-white shadow-lg shadow-brand-green/20' : 'text-white/60 hover:text-white hover:bg-white/5'"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
              Listagem
            </router-link>
            <router-link 
              to="/analytics" 
              class="px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2"
              :class="$route.name === 'Analytics' ? 'bg-brand-green text-white shadow-lg shadow-brand-green/20' : 'text-white/60 hover:text-white hover:bg-white/5'"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Dashboard
            </router-link>
            <router-link 
              v-if="user && user.admin === true"
              to="/users" 
              class="px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2"
              :class="$route.name === 'Users' ? 'bg-brand-green text-white shadow-lg shadow-brand-green/20' : 'text-white/60 hover:text-white hover:bg-white/5'"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              Usuários
            </router-link>
          </div>
        </div>

        <!-- Mobile Menu Button -->
        <div class="md:hidden flex items-center gap-2">
          <button @click="handleLogout" class="p-2 text-white/40 hover:text-rose-400 transition-colors" title="Sair">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
          <button @click="isMenuOpen = !isMenuOpen" class="p-2 text-white/60 hover:text-white transition-colors">
            <svg v-if="!isMenuOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="hidden md:flex items-center gap-4">
          <div v-if="user" class="flex items-center gap-3 mr-2 px-3 py-1.5 bg-white/5 rounded-xl border border-white/10">
            <div class="w-8 h-8 bg-brand-green rounded-lg flex items-center justify-center text-white font-bold text-xs shadow-lg shadow-brand-green/20">
              {{ user.name?.charAt(0).toUpperCase() }}
            </div>
            <div class="flex flex-col">
              <span class="text-xs font-bold text-white leading-none">{{ user.name }}</span>
              <span class="text-[10px] text-white/40 font-medium mt-0.5">{{ user.admin ? 'Administrador' : 'Consultor' }}</span>
            </div>
          </div>
          <button @click="handleLogout" class="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white/60 hover:text-white hover:bg-white/5 transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Sair
          </button>
        </div>
      </div>

      <!-- Mobile Navigation Links -->
      <transition name="slide">
        <div v-if="isMenuOpen" class="md:hidden mt-4 pb-4 space-y-2 border-t border-white/5 pt-4">
          <router-link 
            to="/" 
            @click="isMenuOpen = false"
            class="px-4 py-3 rounded-xl text-sm font-bold transition-all flex items-center gap-3"
            :class="$route.name === 'Dashboard' ? 'bg-brand-green text-white shadow-lg shadow-brand-green/20' : 'text-white/60 hover:text-white hover:bg-white/5'"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
            Listagem
          </router-link>
          <router-link 
            to="/analytics" 
            @click="isMenuOpen = false"
            class="px-4 py-3 rounded-xl text-sm font-bold transition-all flex items-center gap-3"
            :class="$route.name === 'Analytics' ? 'bg-brand-green text-white shadow-lg shadow-brand-green/20' : 'text-white/60 hover:text-white hover:bg-white/5'"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Dashboard
          </router-link>
          <router-link 
            v-if="user && user.admin === true"
            to="/users" 
            @click="isMenuOpen = false"
            class="px-4 py-3 rounded-xl text-sm font-bold transition-all flex items-center gap-3"
            :class="$route.name === 'Users' ? 'bg-brand-green text-white shadow-lg shadow-brand-green/20' : 'text-white/60 hover:text-white hover:bg-white/5'"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            Usuários
          </router-link>
        </div>
      </transition>
    </nav>

    <!-- Logout Confirmation Modal -->
    <transition name="fade">
      <div v-if="showLogoutModal" class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-navy/60 backdrop-blur-sm">
        <div class="bg-white w-full max-w-sm rounded-3xl shadow-2xl p-8 border border-gray-100 animate-in fade-in zoom-in duration-300">
          <div class="flex flex-col items-center text-center">
            <div class="w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-600 mb-6 shadow-inner">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-brand-navy mb-2">Confirmar Saída</h3>
            <p class="text-sm text-gray-500 mb-8 leading-relaxed">
              Deseja realmente encerrar sua sessão no sistema?
            </p>
            <div class="flex flex-col w-full gap-3">
              <button @click="confirmLogout" class="w-full py-3 bg-rose-600 text-white rounded-xl text-sm font-bold hover:bg-rose-700 transition-all shadow-lg shadow-rose-600/20">
                Sim, Sair
              </button>
              <button @click="showLogoutModal = false" class="w-full py-3 bg-white border border-gray-200 text-gray-600 rounded-xl text-sm font-bold hover:bg-gray-50 transition-all">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <main :class="isAuthenticated ? 'max-w-7xl mx-auto p-4 md:p-8' : ''">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<script>
import { authService } from './services/authService';

export default {
  name: 'App',
  data() {
    return {
      isMenuOpen: false,
      showLogoutModal: false
    }
  },
  computed: {
    isAuthenticated() {
      return authService.isAuthenticated();
    },
    user() {
      return authService.getUser();
    }
  },
  methods: {
    handleLogout() {
      this.showLogoutModal = true;
      this.isMenuOpen = false;
    },
    confirmLogout() {
      authService.logout();
    }
  }
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease-out;
  max-height: 200px;
  overflow: hidden;
}

.slide-enter-from,
.slide-leave-to {
  max-height: 0;
  opacity: 0;
  transform: translateY(-10px);
}

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
::-webkit-scrollbar-track {
  background: #f1f1f1;
}
::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: #a1a1a1;
}
</style>
