<template>
  <div class="space-y-8">
    <!-- Header -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-8 rounded-3xl border border-slate-200/60 shadow-sm">
      <div>
        <h1 class="text-2xl font-black text-brand-navy tracking-tight">Gestão de Usuários</h1>
        <p class="text-sm text-gray-500 font-medium">Liste e cadastre novos usuários no sistema.</p>
      </div>
      
      <button 
        @click="showModal = true"
        class="inline-flex items-center justify-center px-6 py-3 border border-transparent text-sm font-bold rounded-xl text-white bg-brand-green hover:bg-brand-green/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-green shadow-lg shadow-brand-green/20 transition-all gap-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
        </svg>
        Novo Usuário
      </button>
    </div>

    <!-- User List -->
    <div class="bg-white rounded-3xl border border-slate-200/60 shadow-sm overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-slate-50/50 border-b border-slate-100">
              <th class="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Nome</th>
              <th class="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">E-mail</th>
              <th class="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Departamento</th>
              <th class="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Situação</th>
              <th class="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Criado em</th>
              <th class="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Ações</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-50">
            <tr v-if="loading" class="animate-pulse">
              <td colspan="4" class="px-6 py-12 text-center text-gray-400 font-medium">Carregando usuários...</td>
            </tr>
            <tr v-else-if="users.length === 0">
              <td colspan="4" class="px-6 py-12 text-center text-gray-400 font-medium">Nenhum usuário encontrado.</td>
            </tr>
            <tr v-for="user in users" :key="user.id" class="hover:bg-slate-50/30 transition-colors group">
              <td class="px-6 py-4">
                <div class="flex items-center gap-2">
                  <span class="text-sm font-bold text-brand-navy">{{ user.name || 'N/A' }}</span>
                  <span v-if="user.admin" class="inline-flex items-center px-2 py-0.5 rounded-md text-[9px] font-black bg-brand-green/10 text-brand-green uppercase border border-brand-green/20">
                    Admin
                  </span>
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-lg bg-brand-navy/5 flex items-center justify-center text-brand-navy font-bold text-xs">
                    {{ user.email.charAt(0).toUpperCase() }}
                  </div>
                  <span class="text-sm font-bold text-brand-navy">{{ user.email }}</span>
                </div>
              </td>
              <td class="px-6 py-4">
                <span v-if="user.department" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black bg-brand-light text-brand-green uppercase">
                  {{ user.department }}
                </span>
                <span v-else class="text-xs text-gray-300 italic">Sem departamento</span>
              </td>
              <td class="px-6 py-4">
                <span 
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase border"
                  :class="user.active !== false ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-slate-100 text-slate-400 border-slate-200'"
                >
                  {{ user.active !== false ? 'ATIVO' : 'INATIVO' }}
                </span>
              </td>
              <td class="px-6 py-4 text-xs text-gray-500 font-medium">
                {{ formatDate(user.created_at) }}
              </td>
              <td class="px-6 py-4 text-right">
                <button 
                  v-if="user.active !== false"
                  @click="confirmDeleteUser(user)"
                  class="p-2 text-gray-300 hover:text-rose-600 transition-colors"
                  title="Desativar Usuário"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                  </svg>
                </button>
                <span v-else class="text-[10px] font-bold text-gray-300 px-2">Desativado</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Registration Modal -->
    <transition name="fade">
      <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-navy/60 backdrop-blur-sm">
        <div class="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
          <div class="p-8 border-b border-gray-100 flex justify-between items-center bg-slate-50/50">
            <div>
              <h3 class="text-xl font-black text-brand-navy tracking-tight">Novo Usuário</h3>
              <p class="text-xs text-gray-500 font-medium">Preencha os dados para cadastrar no sistema.</p>
            </div>
            <button @click="showModal = false" class="p-2 text-gray-400 hover:text-brand-navy hover:bg-white rounded-xl transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form @submit.prevent="handleRegister" class="p-8 space-y-6">
            <div class="grid grid-cols-1 gap-6">
              <div class="space-y-1.5">
                <label class="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Nome Completo</label>
                <input 
                  v-model="newUser.name" 
                  type="text" 
                  required 
                  placeholder="Nome do usuário"
                  class="w-full px-4 py-3 bg-gray-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-green focus:border-brand-green transition-all outline-none text-brand-navy text-sm"
                />
              </div>

              <div class="space-y-1.5">
                <label class="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">E-mail</label>
                <input 
                  v-model="newUser.email" 
                  type="email" 
                  required 
                  placeholder="exemplo@evogard.com.br"
                  class="w-full px-4 py-3 bg-gray-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-green focus:border-brand-green transition-all outline-none text-brand-navy text-sm"
                />
              </div>

              <div class="space-y-1.5">
                <label class="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Senha</label>
                <input 
                  v-model="newUser.password" 
                  type="password" 
                  required 
                  placeholder="••••••••"
                  class="w-full px-4 py-3 bg-gray-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-green focus:border-brand-green transition-all outline-none text-brand-navy text-sm"
                />
              </div>

              <div class="space-y-1.5">
                <label class="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Departamento</label>
                <select 
                  v-model="newUser.department" 
                  class="w-full px-4 py-3 bg-gray-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-green focus:border-brand-green transition-all outline-none text-brand-navy text-sm"
                >
                  <option value="">Selecione um departamento</option>
                  <option value="ASSISTÊNCIA 24H">ASSISTÊNCIA 24H</option>
                  <option value="ANÁLISE E SINDICÂNCIA">ANÁLISE E SINDICÂNCIA</option>
                  <option value="REPARO">REPARO</option>
                  <option value="INDENIZAÇÃO">INDENIZAÇÃO</option>
                  <option value="BENEFÍCIOS/PERIFÉRICOS">BENEFÍCIOS/PERIFÉRICOS</option>
                </select>
              </div>

              <!-- Admin Toggle -->
              <div class="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div class="flex flex-col">
                  <span class="text-xs font-bold text-brand-navy">Privilégios de Administrador</span>
                  <span class="text-[10px] text-gray-400 font-medium">Permite gerenciar usuários e configurações</span>
                </div>
                <button 
                  type="button"
                  @click="newUser.admin = !newUser.admin"
                  class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none"
                  :class="newUser.admin ? 'bg-brand-green' : 'bg-gray-200'"
                >
                  <span 
                    class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                    :class="newUser.admin ? 'translate-x-5' : 'translate-x-0'"
                  ></span>
                </button>
              </div>
            </div>

            <div v-if="error" class="bg-rose-50 text-rose-600 p-4 rounded-2xl text-xs font-bold border border-rose-100">
              {{ error }}
            </div>

            <div class="flex gap-3 pt-4">
              <button 
                type="button" 
                @click="showModal = false"
                class="flex-1 px-6 py-3 border border-slate-200 text-sm font-bold rounded-xl text-gray-500 hover:bg-slate-50 transition-all"
              >
                Cancelar
              </button>
              <button 
                type="submit" 
                :disabled="submitting"
                class="flex-1 px-6 py-3 bg-brand-navy text-white text-sm font-bold rounded-xl hover:bg-brand-navy/90 transition-all shadow-lg shadow-brand-navy/20 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <span v-if="submitting" class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                {{ submitting ? 'Cadastrando...' : 'Cadastrar' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </transition>

    <!-- Delete Confirmation Modal -->
    <transition name="fade">
      <div v-if="userToDelete" class="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-brand-navy/60 backdrop-blur-sm">
        <div class="bg-white w-full max-w-sm rounded-3xl shadow-2xl p-8 border border-gray-100 animate-in fade-in zoom-in duration-300">
          <div class="flex flex-col items-center text-center">
            <div class="w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-600 mb-6 shadow-inner">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-brand-navy mb-2">Desativar Usuário</h3>
            <p class="text-sm text-gray-500 mb-8 leading-relaxed">
              Deseja realmente desativar o usuário <strong>{{ userToDelete.name || userToDelete.email }}</strong>? Ele não poderá mais acessar o sistema.
            </p>
            <div class="flex flex-col w-full gap-3">
              <button 
                @click="handleDeleteUser" 
                :disabled="deleting"
                class="w-full py-3 bg-rose-600 text-white rounded-xl text-sm font-bold hover:bg-rose-700 transition-all shadow-lg shadow-rose-600/20 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <span v-if="deleting" class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                {{ deleting ? 'Desativando...' : 'Sim, Desativar' }}
              </button>
              <button @click="userToDelete = null" class="w-full py-3 bg-white border border-gray-200 text-gray-600 rounded-xl text-sm font-bold hover:bg-gray-50 transition-all">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { userService } from '../services/userService';

export default {
  name: 'Users',
  data() {
    return {
      users: [],
      loading: false,
      showModal: false,
      submitting: false,
      error: '',
      userToDelete: null,
      deleting: false,
      newUser: {
        email: '',
        password: '',
        department: '',
        name: '',
        admin: false
      }
    }
  },
  async created() {
    await this.loadUsers();
  },
  methods: {
    async loadUsers() {
      this.loading = true;
      try {
        this.users = await userService.getAll();
      } catch (err) {
        console.error('Erro ao carregar usuários:', err);
      } finally {
        this.loading = false;
      }
    },
    async handleRegister() {
      this.submitting = true;
      this.error = '';
      try {
        await userService.register(this.newUser);
        this.showModal = false;
        this.newUser = { email: '', password: '', department: '', name: '', admin: false };
        await this.loadUsers();
      } catch (err) {
        this.error = err.message || 'Erro ao cadastrar usuário';
      } finally {
        this.submitting = false;
      }
    },
    confirmDeleteUser(user) {
      this.userToDelete = user;
    },
    async handleDeleteUser() {
      if (!this.userToDelete) return;
      this.deleting = true;
      try {
        await userService.delete(this.userToDelete.id);
        this.userToDelete = null;
        await this.loadUsers();
      } catch (err) {
        this.error = err.message || 'Erro ao desativar usuário';
        this.userToDelete = null;
      } finally {
        this.deleting = false;
      }
    },
    formatDate(dateStr) {
      if (!dateStr) return 'N/A';
      const date = new Date(dateStr);
      return date.toLocaleDateString('pt-BR', { 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  }
}
</script>
