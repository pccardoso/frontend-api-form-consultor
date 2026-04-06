<template>
  <div class="max-w-4xl mx-auto space-y-8">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div class="flex items-center gap-4">
        <router-link to="/" class="p-2 text-gray-400 hover:text-brand-navy hover:bg-white rounded-xl transition-all shadow-sm border border-transparent hover:border-brand-light">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </router-link>
        <div>
          <h2 class="text-2xl font-bold text-brand-navy">Editar Registro</h2>
          <p class="text-sm text-gray-500">ID: #{{ id }} • Atualize as informações abaixo</p>
        </div>
      </div>
      <div class="flex gap-3">
        <button @click="save" class="inline-flex items-center justify-center px-8 py-3 border border-transparent text-sm font-bold rounded-xl text-white bg-brand-green hover:bg-brand-green/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-green shadow-lg shadow-brand-green/20 transition-all">
          Salvar Alterações
        </button>
      </div>
    </div>

    <div v-if="formData" class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Main Form Area -->
      <div class="lg:col-span-2 space-y-8">
        <!-- Consultor Info -->
        <section class="bg-white p-8 rounded-3xl border border-slate-200/60 shadow-sm space-y-6">
          <div class="flex items-center gap-3 border-b border-gray-50 pb-4">
            <div class="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 shadow-inner">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 class="font-black uppercase tracking-tight text-brand-navy">Informações do Consultor</h3>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-1.5">
              <label class="text-xs font-bold text-gray-400 uppercase tracking-wider">Nome do Consultor</label>
              <input v-model="formData.consultor_associado_sga" type="text" class="w-full px-4 py-3 bg-gray-50 border border-brand-light rounded-xl focus:ring-2 focus:ring-brand-green focus:border-brand-green transition-all outline-none text-brand-navy" />
            </div>
            <div class="space-y-1.5">
              <label class="text-xs font-bold text-gray-400 uppercase tracking-wider">Cooperativa</label>
              <input v-model="formData.nome_cooperativa_consultor" type="text" class="w-full px-4 py-3 bg-gray-50 border border-brand-light rounded-xl focus:ring-2 focus:ring-brand-green focus:border-brand-green transition-all outline-none text-brand-navy" />
            </div>
            <div class="space-y-1.5">
              <label class="text-xs font-bold text-gray-400 uppercase tracking-wider">E-mail</label>
              <input v-model="formData.email_voluntario_sga" type="email" class="w-full px-4 py-3 bg-gray-50 border border-brand-light rounded-xl focus:ring-2 focus:ring-brand-green focus:border-brand-green transition-all outline-none text-brand-navy" />
            </div>
            <div class="space-y-1.5">
              <label class="text-xs font-bold text-gray-400 uppercase tracking-wider">Tipo de Consultor</label>
              <select v-model="formData.type_consultant" class="w-full px-4 py-3 bg-gray-50 border border-brand-light rounded-xl focus:ring-2 focus:ring-brand-green focus:border-brand-green transition-all outline-none text-brand-navy">
                <option value="interno">Interno</option>
                <option value="externo">Externo</option>
              </select>
            </div>
            <div class="space-y-1.5">
              <label class="text-xs font-bold text-gray-400 uppercase tracking-wider">Departamento</label>
              <select v-model="formData.department" class="w-full px-4 py-3 bg-gray-50 border border-brand-light rounded-xl focus:ring-2 focus:ring-brand-green focus:border-brand-green transition-all outline-none text-brand-navy">
                <option value="ASSISTÊNCIA 24H">ASSISTÊNCIA 24H</option>
                <option value="ANÁLISE E SINDICÂNCIA">ANÁLISE E SINDICÂNCIA</option>
                <option value="REPARO">REPARO</option>
                <option value="INDENIZAÇÃO">INDENIZAÇÃO</option>
                <option value="BENEFÍCIOS/PERIFÉRICOS">BENEFÍCIOS/PERIFÉRICOS</option>
              </select>
            </div>
          </div>
        </section>

        <!-- Associado Info -->
        <section class="bg-white p-8 rounded-3xl border border-slate-200/60 shadow-sm space-y-6">
          <div class="flex items-center gap-3 border-b border-gray-50 pb-4">
            <div class="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 shadow-inner">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="font-black uppercase tracking-tight text-brand-navy">Informações do Associado</h3>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-1.5">
              <label class="text-xs font-bold text-gray-400 uppercase tracking-wider">Nome do Associado</label>
              <input v-model="formData.nome_associado_sga" type="text" class="w-full px-4 py-3 bg-gray-50 border border-brand-light rounded-xl focus:ring-2 focus:ring-brand-green focus:border-brand-green transition-all outline-none text-brand-navy" />
            </div>
            <div class="space-y-1.5">
              <label class="text-xs font-bold text-gray-400 uppercase tracking-wider">Telefone</label>
              <input v-model="formData.telefone_associado_sga" type="text" class="w-full px-4 py-3 bg-gray-50 border border-brand-light rounded-xl focus:ring-2 focus:ring-brand-green focus:border-brand-green transition-all outline-none text-brand-navy" />
            </div>
            <div class="space-y-1.5">
              <label class="text-xs font-bold text-gray-400 uppercase tracking-wider">Placa</label>
              <input v-model="formData.plate_associate" type="text" class="w-full px-4 py-3 bg-gray-50 border border-brand-light rounded-xl focus:ring-2 focus:ring-brand-green focus:border-brand-green transition-all outline-none text-brand-navy font-mono uppercase" />
            </div>
            <div class="space-y-1.5">
              <label class="text-xs font-bold text-gray-400 uppercase tracking-wider">Modelo do Veículo</label>
              <input v-model="formData.modelo_associado_sga" type="text" class="w-full px-4 py-3 bg-gray-50 border border-brand-light rounded-xl focus:ring-2 focus:ring-brand-green focus:border-brand-green transition-all outline-none text-brand-navy" />
            </div>
          </div>
        </section>

        <!-- Terceiro Info -->
        <section class="bg-white p-8 rounded-3xl border border-slate-200/60 shadow-sm space-y-6">
          <div class="flex items-center gap-3 border-b border-gray-50 pb-4">
            <div class="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 shadow-inner">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 class="font-black uppercase tracking-tight text-brand-navy">Informações de Terceiro</h3>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-1.5">
              <label class="text-xs font-bold text-gray-400 uppercase tracking-wider">Nome Terceiro</label>
              <input v-model="formData.nome_terceiro" type="text" class="w-full px-4 py-3 bg-gray-50 border border-brand-light rounded-xl focus:ring-2 focus:ring-brand-green focus:border-brand-green transition-all outline-none text-brand-navy" />
            </div>
            <div class="space-y-1.5">
              <label class="text-xs font-bold text-gray-400 uppercase tracking-wider">Placa Terceiro</label>
              <input v-model="formData.placa_terceiro" type="text" class="w-full px-4 py-3 bg-gray-50 border border-brand-light rounded-xl focus:ring-2 focus:ring-brand-green focus:border-brand-green transition-all outline-none text-brand-navy font-mono uppercase" />
            </div>
          </div>
        </section>

        <!-- Descrição -->
        <section class="bg-white p-8 rounded-3xl border border-slate-200/60 shadow-sm space-y-6">
          <div class="flex items-center gap-3 border-b border-gray-50 pb-4">
            <div class="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 shadow-inner">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
              </svg>
            </div>
            <h3 class="font-black uppercase tracking-tight text-brand-navy">Descrição do Atendimento</h3>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-1.5">
              <label class="text-xs font-bold text-gray-400 uppercase tracking-wider">Consultou Univ. Evogard?</label>
              <select v-model="formData.pes_evogard_edu" class="w-full px-4 py-3 bg-gray-50 border border-brand-light rounded-xl focus:ring-2 focus:ring-brand-green focus:border-brand-green transition-all outline-none text-brand-navy">
                <option value="Sim">Sim</option>
                <option value="Não">Não</option>
              </select>
            </div>
            <div class="space-y-1.5">
              <label class="text-xs font-bold text-gray-400 uppercase tracking-wider">Tentou resolver administrativo?</label>
              <select v-model="formData.pes_cliente_resolveu" class="w-full px-4 py-3 bg-gray-50 border border-brand-light rounded-xl focus:ring-2 focus:ring-brand-green focus:border-brand-green transition-all outline-none text-brand-navy">
                <option value="Sim">Sim</option>
                <option value="Não">Não</option>
              </select>
            </div>
          </div>
          <div class="space-y-1.5">
            <label class="text-xs font-bold text-gray-400 uppercase tracking-wider">Observações</label>
            <textarea v-model="formData.description_associate" rows="4" class="w-full px-4 py-3 bg-gray-50 border border-brand-light rounded-xl focus:ring-2 focus:ring-brand-green focus:border-brand-green transition-all outline-none text-brand-navy"></textarea>
          </div>
        </section>
      </div>

      <!-- Sidebar Info -->
      <div class="space-y-6">
        <div class="bg-brand-navy p-8 rounded-3xl text-white shadow-2xl shadow-brand-navy/20 sticky top-24">
          <h3 class="text-lg font-black mb-6 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Metadados
          </h3>
          <div class="space-y-6">
            <div class="pb-4 border-b border-white/10">
              <p class="text-xs text-white/50 uppercase font-bold tracking-widest mb-1">ID do Registro</p>
              <p class="text-sm font-mono font-bold">{{ formData.id }}</p>
            </div>
            <div class="pb-4 border-b border-white/10">
              <p class="text-xs text-white/50 uppercase font-bold tracking-widest mb-1">Data de Criação</p>
              <p class="text-sm font-medium">{{ formData.created_at }}</p>
            </div>
            <div>
              <p class="text-xs text-white/50 uppercase font-bold tracking-widest mb-1">Status do Registro</p>
              <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-brand-green text-white mt-2">
                Ativo no Sistema
              </span>
            </div>
          </div>
          
          <div class="mt-12 pt-8 border-t border-white/10">
            <p class="text-xs text-white/40 italic">
              As alterações feitas aqui serão salvas localmente no navegador.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-else class="flex flex-col items-center justify-center py-32 bg-white rounded-3xl border border-brand-light shadow-sm">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-green"></div>
      <p class="mt-6 text-brand-navy font-medium">Carregando dados do registro...</p>
    </div>
  </div>
</template>

<script>
import { dataService } from '../services/dataService';

export default {
  name: 'EditForm',
  props: ['id'],
  data() {
    return {
      formData: null
    }
  },
  created() {
    this.loadData();
  },
  methods: {
    async loadData() {
      const item = await dataService.getById(this.id);
      if (item) {
        this.formData = { ...item };
      } else {
        this.$router.push('/');
      }
    },
    async save() {
      const success = await dataService.update(this.formData);
      if (success) {
        this.$router.push('/');
      }
    }
  }
}
</script>
