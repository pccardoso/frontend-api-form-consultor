<template>
  <div class="space-y-8">
    <!-- Header with Stats -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm flex items-center gap-4 hover:shadow-md transition-all hover:-translate-y-1">
        <div class="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 shadow-inner">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <div>
          <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total de Pesquisas</p>
          <p class="text-3xl font-black text-brand-navy leading-none mt-1">{{ items.length }}</p>
        </div>
      </div>
      <div class="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-all hover:-translate-y-1">
        <div class="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 shadow-inner">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <div>
          <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Consultores Ativos</p>
          <p class="text-3xl font-black text-brand-navy leading-none mt-1">{{ uniqueConsultants }}</p>
        </div>
      </div>
      <div class="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-all hover:-translate-y-1">
        <div class="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 shadow-inner">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Última Atualização</p>
          <p class="text-xl font-black text-brand-navy leading-none mt-1">{{ lastUpdate }}</p>
        </div>
      </div>
    </div>

    <!-- Actions Bar -->
    <div class="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm space-y-6">
      <!-- Search and Main Actions -->
      <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div class="relative w-full lg:max-w-md">
          <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input 
            v-model="search" 
            type="text" 
            placeholder="Buscar por nome, placa ou consultor..." 
            class="block w-full pl-10 pr-3 py-2.5 border border-brand-light rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-brand-green sm:text-sm transition-all"
          />
        </div>

        <div class="flex flex-wrap gap-2 w-full lg:w-auto">
          <button @click="exportExcel" class="flex-1 lg:flex-none inline-flex items-center justify-center px-4 py-2.5 border border-emerald-200 text-sm font-bold rounded-xl text-emerald-700 bg-emerald-50 hover:bg-emerald-100 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Excel
          </button>
          <button @click="exportPDF" class="flex-1 lg:flex-none inline-flex items-center justify-center px-4 py-2.5 border border-rose-200 text-sm font-bold rounded-xl text-rose-700 bg-rose-50 hover:bg-rose-100 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            PDF
          </button>
          <button @click="clearFilters" class="flex-1 lg:flex-none inline-flex items-center justify-center px-4 py-2.5 border border-gray-200 text-sm font-bold rounded-xl text-gray-600 bg-gray-50 hover:bg-gray-100 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
            Limpar
          </button>
        </div>
      </div>

      <!-- Filters Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 pt-4 border-t border-gray-50">
        <div class="space-y-1">
          <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-wider ml-1">Tipo de Consultor</label>
          <select 
            v-model="filterType"
            class="block w-full px-3 py-2 border border-brand-light rounded-xl leading-5 bg-white text-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-brand-green sm:text-sm transition-all"
          >
            <option value="">Todos Tipos</option>
            <option value="interno">Interno</option>
            <option value="externo">Externo</option>
          </select>
        </div>

        <div class="space-y-1">
          <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-wider ml-1">Departamento</label>
          <select 
            v-model="filterDepartment"
            class="block w-full px-3 py-2 border border-brand-light rounded-xl leading-5 bg-white text-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-brand-green sm:text-sm transition-all"
          >
            <option value="">Todos Departamentos</option>
            <option value="ASSISTÊNCIA 24H">ASSISTÊNCIA 24H</option>
            <option value="ANÁLISE E SINDICÂNCIA">ANÁLISE E SINDICÂNCIA</option>
            <option value="REPARO">REPARO</option>
            <option value="INDENIZAÇÃO">INDENIZAÇÃO</option>
            <option value="BENEFÍCIOS/PERIFÉRICOS">BENEFÍCIOS/PERIFÉRICOS</option>
          </select>
        </div>

        <div class="space-y-1">
          <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-wider ml-1">Data Inicial</label>
          <input 
            v-model="startDate"
            type="date"
            class="block w-full px-3 py-2 border border-brand-light rounded-xl leading-5 bg-white text-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-brand-green sm:text-sm transition-all"
          />
        </div>

        <div class="space-y-1">
          <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-wider ml-1">Data Final</label>
          <input 
            v-model="endDate"
            type="date"
            class="block w-full px-3 py-2 border border-brand-light rounded-xl leading-5 bg-white text-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-brand-green sm:text-sm transition-all"
          />
        </div>

        <div class="space-y-1 sm:col-span-2 lg:col-span-1">
          <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-wider ml-1">Terceiro</label>
          <select 
            v-model="filterThirdParty"
            class="block w-full px-3 py-2 border border-brand-light rounded-xl leading-5 bg-white text-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-brand-green sm:text-sm transition-all"
          >
            <option value="">Todos (Terceiro)</option>
            <option value="com">Com Terceiro</option>
            <option value="sem">Sem Terceiro</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Table Container -->
    <div class="bg-white rounded-3xl border border-slate-200/60 shadow-sm overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-100">
          <thead class="bg-gray-50/50">
            <tr>
              <th scope="col" class="px-6 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">ID</th>
              <th scope="col" class="px-6 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Departamento</th>
              <th scope="col" class="px-6 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Consultor / Cooperativa</th>
              <th scope="col" class="px-6 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Associado / Veículo</th>
              <th scope="col" class="px-6 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Terceiro</th>
              <th scope="col" class="px-6 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Data</th>
              <th scope="col" class="px-6 py-5 text-right text-[10px] font-black text-gray-400 uppercase tracking-widest">Ações</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-50">
            <tr v-if="loading">
              <td colspan="7" class="px-6 py-12 text-center">
                <div class="flex flex-col items-center">
                  <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-green mb-4"></div>
                  <p class="text-gray-500 font-medium">Carregando dados da API...</p>
                </div>
              </td>
            </tr>
            <template v-else>
              <tr v-for="item in paginatedItems" :key="item.id" class="hover:bg-gray-50 transition-colors group">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-400">#{{ item.id }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-brand-light text-brand-green border border-brand-green/10">
                  {{ item.department || 'N/A' }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex flex-col">
                  <span class="text-sm font-bold text-gray-900">{{ item.consultor_associado_sga }}</span>
                  <span class="text-xs text-gray-500">{{ item.nome_cooperativa_consultor }}</span>
                  <span class="inline-flex items-center px-2 py-0.5 mt-1 rounded text-xs font-medium w-fit" :class="item.type_consultant?.toLowerCase() === 'interno' ? 'bg-brand-light text-brand-green' : 'bg-brand-navy/5 text-brand-navy'">
                    {{ item.type_consultant }}
                  </span>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex flex-col">
                  <span class="text-sm font-bold text-brand-navy">{{ item.nome_associado_sga }}</span>
                  <span class="text-xs text-gray-500">{{ item.modelo_associado_sga }} ({{ item.plate_associate }})</span>
                  <span class="text-xs text-brand-green font-medium">{{ item.telefone_associado_sga }}</span>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div v-if="item.nome_terceiro" class="flex flex-col">
                  <span class="text-sm font-medium text-gray-700">{{ item.nome_terceiro }}</span>
                  <span class="text-xs text-gray-400">{{ item.placa_terceiro }}</span>
                </div>
                <span v-else class="text-xs text-gray-400 italic font-medium">Sem Terceiro</span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatDate(item.created_at) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex justify-end gap-2">
                  <button @click="viewItem(item)" class="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" title="Visualizar">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                  <button @click.stop="deleteItem(item.id)" class="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors" title="Excluir">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
            </template>
            <tr v-if="!loading && filteredItems.length === 0">
              <td colspan="7" class="px-6 py-12 text-center">
                <div class="flex flex-col items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-200 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p class="text-gray-500 font-medium">Nenhum registro encontrado para sua busca.</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Pagination Container -->
    <div v-if="!loading && filteredItems.length > 0" class="bg-white px-6 py-4 rounded-3xl border border-slate-200/60 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-4">
      <div class="flex items-center gap-4">
        <span class="text-xs font-bold text-gray-400 uppercase tracking-widest">Itens por página:</span>
        <select 
          v-model="itemsPerPage" 
          @change="currentPage = 1"
          class="bg-gray-50 border border-gray-200 text-brand-navy text-xs font-bold rounded-xl px-3 py-1.5 focus:ring-2 focus:ring-brand-green outline-none transition-all"
        >
          <option :value="10">10</option>
          <option :value="30">30</option>
          <option :value="50">50</option>
          <option :value="100">100</option>
        </select>
        <span class="text-xs font-medium text-gray-500">
          Mostrando {{ (currentPage - 1) * itemsPerPage + 1 }} - {{ Math.min(currentPage * itemsPerPage, filteredItems.length) }} de {{ filteredItems.length }}
        </span>
      </div>

      <div class="flex items-center gap-1">
        <!-- Previous Page -->
        <button 
          @click="currentPage > 1 && (currentPage--)"
          :disabled="currentPage === 1"
          class="p-2 rounded-xl border border-gray-100 text-gray-400 hover:bg-gray-50 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <!-- Page Numbers -->
        <template v-for="(page, index) in paginationRange" :key="index">
          <span v-if="page === '...'" class="px-2 text-gray-400 font-bold">...</span>
          <button 
            v-else
            @click="currentPage = page"
            class="min-w-[36px] h-9 flex items-center justify-center rounded-xl text-xs font-bold transition-all"
            :class="currentPage === page ? 'bg-brand-green text-white shadow-lg shadow-brand-green/20' : 'text-gray-500 hover:bg-gray-50 border border-transparent hover:border-gray-100'"
          >
            {{ page }}
          </button>
        </template>

        <!-- Next Page -->
        <button 
          @click="currentPage < totalPages && (currentPage++)"
          :disabled="currentPage === totalPages"
          class="p-2 rounded-xl border border-gray-100 text-gray-400 hover:bg-gray-50 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Modal de Visualização -->
    <transition name="modal">
      <div v-if="selectedItem" class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true">
        <!-- Overlay (Fundo) -->
        <div @click="closeModal" class="fixed inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity"></div>

        <!-- Modal Content -->
        <div class="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden border border-gray-100 flex flex-col transform transition-all">
          <!-- Header Fixo -->
          <div class="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-10">
            <h3 class="text-xl font-bold text-gray-900">
              Detalhes do Registro #{{ selectedItem.id }}
            </h3>
            <button @click="closeModal" class="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all">
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <!-- Conteúdo com Scroll -->
          <div class="p-6 overflow-y-auto custom-scrollbar">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <!-- Consultor Section -->
              <div class="space-y-4">
                <h4 class="text-xs font-bold text-brand-green uppercase tracking-widest border-b border-brand-light pb-2">Consultor</h4>
                <div class="space-y-3">
                  <div>
                    <p class="text-xs text-gray-400 uppercase font-semibold">Nome</p>
                    <p class="text-sm font-medium text-brand-navy">{{ selectedItem.consultor_associado_sga }}</p>
                  </div>
                  <div>
                    <p class="text-xs text-gray-400 uppercase font-semibold">Cooperativa</p>
                    <p class="text-sm font-medium text-brand-navy">{{ selectedItem.nome_cooperativa_consultor }}</p>
                  </div>
                  <div>
                    <p class="text-xs text-gray-400 uppercase font-semibold">E-mail</p>
                    <p class="text-sm font-medium text-brand-navy">{{ selectedItem.email_voluntario_sga }}</p>
                  </div>
                  <div>
                    <p class="text-xs text-gray-400 uppercase font-semibold">Tipo</p>
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-light text-brand-green">
                      {{ selectedItem.type_consultant }}
                    </span>
                  </div>
                  <div>
                    <p class="text-xs text-gray-400 uppercase font-semibold">Departamento</p>
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-brand-navy text-white">
                      {{ selectedItem.department || 'N/A' }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Associado Section -->
              <div class="space-y-4">
                <h4 class="text-xs font-bold text-brand-green uppercase tracking-widest border-b border-brand-light pb-2">Associado</h4>
                <div class="space-y-3">
                  <div>
                    <p class="text-xs text-gray-400 uppercase font-semibold">Nome</p>
                    <p class="text-sm font-medium text-brand-navy">{{ selectedItem.nome_associado_sga }}</p>
                  </div>
                  <div>
                    <p class="text-xs text-gray-400 uppercase font-semibold">Telefone</p>
                    <p class="text-sm font-medium text-brand-navy">{{ selectedItem.telefone_associado_sga }}</p>
                  </div>
                  <div>
                    <p class="text-xs text-gray-400 uppercase font-semibold">Veículo</p>
                    <p class="text-sm font-medium text-brand-navy">{{ selectedItem.modelo_associado_sga }}</p>
                  </div>
                  <div>
                    <p class="text-xs text-gray-400 uppercase font-semibold">Placa</p>
                    <p class="text-sm font-mono font-bold text-brand-navy">{{ selectedItem.plate_associate }}</p>
                  </div>
                </div>
              </div>

              <!-- Terceiro Section -->
              <div class="space-y-4">
                <h4 class="text-xs font-bold text-amber-600 uppercase tracking-widest border-b border-amber-50 pb-2">Terceiro</h4>
                <div v-if="selectedItem.nome_terceiro" class="space-y-3">
                  <div>
                    <p class="text-xs text-gray-400 uppercase font-semibold">Nome</p>
                    <p class="text-sm font-medium text-gray-900">{{ selectedItem.nome_terceiro }}</p>
                  </div>
                  <div>
                    <p class="text-xs text-gray-400 uppercase font-semibold">Placa</p>
                    <p class="text-sm font-mono font-bold text-gray-900">{{ selectedItem.placa_terceiro }}</p>
                  </div>
                </div>
                <div v-else class="py-2">
                  <p class="text-sm text-gray-400 italic">Sem Terceiro</p>
                </div>
              </div>

              <!-- Meta Section -->
              <div class="space-y-4">
                <h4 class="text-xs font-bold text-gray-600 uppercase tracking-widest border-b border-gray-50 pb-2">Informações Adicionais</h4>
                <div class="space-y-3">
                  <div>
                    <p class="text-xs text-gray-400 uppercase font-semibold">Data de Criação</p>
                    <p class="text-sm font-medium text-gray-900">{{ formatDate(selectedItem.created_at) }}</p>
                  </div>
                  <div>
                    <p class="text-xs text-gray-400 uppercase font-semibold">Tipo Cliente</p>
                    <p class="text-sm font-medium text-gray-900">{{ selectedItem.cliente_type_consultant }}</p>
                  </div>
                  <div>
                    <p class="text-xs text-gray-400 uppercase font-semibold">Consultou Univ. Evogard?</p>
                    <p class="text-sm font-medium" :class="selectedItem.pes_evogard_edu === 'Sim' ? 'text-emerald-600' : 'text-rose-600'">{{ selectedItem.pes_evogard_edu || 'N/A' }}</p>
                  </div>
                  <div>
                    <p class="text-xs text-gray-400 uppercase font-semibold">Tentou resolver administrativo?</p>
                    <p class="text-sm font-medium" :class="selectedItem.pes_cliente_resolveu === 'Sim' ? 'text-emerald-600' : 'text-rose-600'">{{ selectedItem.pes_cliente_resolveu || 'N/A' }}</p>
                  </div>
                  <div>
                    <p class="text-xs text-gray-400 uppercase font-semibold">Tipo de Solicitação</p>
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-100">
                      {{ formatTypeRequest(selectedItem.type_request) }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Description Section -->
            <div class="mt-8 p-6 bg-gray-50 rounded-2xl border border-gray-100">
              <h4 class="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Descrição do Atendimento</h4>
              <p class="text-sm text-gray-700 leading-relaxed italic">
                "{{ selectedItem.description_associate || 'Sem descrição informada.' }}"
              </p>
            </div>
          </div>

          <!-- Footer Fixo -->
          <div class="px-6 py-4 bg-gray-50 border-t border-gray-100 flex flex-col sm:flex-row-reverse gap-3">
            <button @click="closeModal" type="button" class="inline-flex justify-center items-center rounded-xl px-6 py-2.5 bg-white border border-gray-200 text-sm font-bold text-brand-navy hover:bg-gray-100 transition-all">
              Fechar
            </button>
          </div>
        </div>
      </div>
    </transition>

    <!-- Modal de Confirmação de Exclusão -->
    <transition name="modal">
      <div v-if="itemToDelete" class="fixed inset-0 z-[60] flex items-center justify-center p-4" role="dialog" aria-modal="true">
        <div @click="cancelDelete" class="fixed inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity"></div>
        <div class="relative bg-white rounded-3xl shadow-2xl w-full max-w-sm p-8 border border-gray-100 transform transition-all">
          <div class="flex flex-col items-center text-center">
            <div class="w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-600 mb-6 shadow-inner">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-brand-navy mb-2">Confirmar Exclusão</h3>
            <p class="text-sm text-gray-500 mb-8 leading-relaxed">
              Deseja realmente excluir este registro? Esta ação não poderá ser desfeita.
            </p>
            <div class="flex flex-col w-full gap-3">
              <button @click="confirmDelete" class="w-full py-3 bg-rose-600 text-white rounded-xl text-sm font-bold hover:bg-rose-700 transition-all shadow-lg shadow-rose-600/20">
                Sim, Excluir
              </button>
              <button @click="cancelDelete" class="w-full py-3 bg-white border border-gray-200 text-gray-600 rounded-xl text-sm font-bold hover:bg-gray-50 transition-all">
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
import { dataService } from '../services/dataService';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

export default {
  name: 'Dashboard',
  data() {
    return {
      items: [],
      search: '',
      filterType: '',
      filterDepartment: '',
      startDate: '',
      endDate: '',
      filterThirdParty: '',
      lastUpdate: '',
      selectedItem: null,
      itemToDelete: null,
      loading: false,
      currentPage: 1,
      itemsPerPage: 10
    }
  },
  computed: {
    filteredItems() {
      return this.items.filter(item => {
        // Search filter
        const searchMatch = !this.search || [
          item.consultor_associado_sga,
          item.nome_associado_sga,
          item.plate_associate,
          item.nome_cooperativa_consultor
        ].some(val => val && val.toLowerCase().includes(this.search.toLowerCase()));

        // Type filter
        const typeMatch = !this.filterType || 
          (item.type_consultant && item.type_consultant.toLowerCase() === this.filterType.toLowerCase());

        // Department filter
        const departmentMatch = !this.filterDepartment || item.department === this.filterDepartment;

        // Date range filter
        const itemDate = item.created_at ? item.created_at.split('T')[0] : '';
        const dateMatch = (!this.startDate || itemDate >= this.startDate) &&
                         (!this.endDate || itemDate <= this.endDate);

        // Third party filter
        const thirdPartyMatch = !this.filterThirdParty || 
          (this.filterThirdParty === 'com' ? !!item.nome_terceiro : !item.nome_terceiro);

        return searchMatch && typeMatch && departmentMatch && dateMatch && thirdPartyMatch;
      });
    },
    paginatedItems() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredItems.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.filteredItems.length / this.itemsPerPage);
    },
    paginationRange() {
      const total = this.totalPages;
      const current = this.currentPage;
      const delta = 2;
      const range = [];
      const rangeWithDots = [];
      let l;

      range.push(1);
      for (let i = current - delta; i <= current + delta; i++) {
        if (i < total && i > 1) {
          range.push(i);
        }
      }
      if (total > 1) range.push(total);

      for (let i of range) {
        if (l) {
          if (i - l === 2) {
            rangeWithDots.push(l + 1);
          } else if (i - l !== 1) {
            rangeWithDots.push('...');
          }
        }
        rangeWithDots.push(i);
        l = i;
      }

      return rangeWithDots;
    },
    uniqueConsultants() {
      const consultants = new Set(this.items.map(i => i.consultor_associado_sga));
      return consultants.size;
    }
  },
  created() {
    this.loadData();
  },
  methods: {
    async loadData() {
      this.loading = true;
      try {
        this.items = await dataService.getAll();
        this.lastUpdate = new Date().toLocaleTimeString();
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      } finally {
        this.loading = false;
      }
    },
    formatDate(dateStr) {
      if (!dateStr) return 'N/A';
      const date = new Date(dateStr);
      return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
    },
    formatTypeRequest(type) {
      if (!type || type.trim() === '') return 'Não Informado';
      if (type === 'ASSOCIADO') return 'Associado';
      if (type === 'TERCEIRO') return 'Terceiro';
      if (type === 'ASSOCIADO/TERCEIRO') return 'Associado e Terceiro';
      return type;
    },
    async deleteItem(id) {
      console.log('deleteItem called with id:', id);
      this.itemToDelete = id;
    },
    async confirmDelete() {
      if (!this.itemToDelete) return;
      
      const id = this.itemToDelete;
      try {
        const success = await dataService.delete(id);
        if (success) {
          // Remove da lista local sem precisar recarregar tudo da API
          this.items = this.items.filter(item => item.id !== id);
          this.itemToDelete = null;
        }
      } catch (error) {
        console.error('Erro ao excluir:', error);
        this.itemToDelete = null;
      }
    },
    cancelDelete() {
      this.itemToDelete = null;
    },
    exportExcel() {
      const worksheet = XLSX.utils.json_to_sheet(this.filteredItems);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Pesquisas");
      XLSX.writeFile(workbook, "relatorio_sga_filtrado.xlsx");
    },
    exportPDF() {
      const doc = new jsPDF('l', 'mm', 'a4');
      const brandNavy = [0, 31, 63]; // #001F3F
      const brandGreen = [0, 209, 102]; // #00D166
      
      doc.setFontSize(18);
      doc.setTextColor(brandNavy[0], brandNavy[1], brandNavy[2]);
      doc.text("Relatório de Pesquisas SGA", 14, 15);
      
      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.text(`Gerado em: ${new Date().toLocaleString('pt-BR')}`, 14, 22);
      
      const tableData = this.filteredItems.map(item => [
        item.id,
        item.department || 'N/A',
        item.consultor_associado_sga,
        item.nome_associado_sga,
        item.plate_associate,
        item.nome_terceiro || 'N/A',
        item.pes_evogard_edu || 'N/A',
        item.pes_cliente_resolveu || 'N/A',
        this.formatDate(item.created_at)
      ]);

      autoTable(doc, {
        head: [['ID', 'Depto', 'Consultor', 'Associado', 'Placa', 'Terceiro', 'Univ. Evogard', 'Adm. Resolveu', 'Data']],
        body: tableData,
        startY: 28,
        styles: {
          fontSize: 8,
          cellPadding: 3,
        },
        headStyles: {
          fillColor: brandNavy,
          textColor: [255, 255, 255],
          fontStyle: 'bold',
          halign: 'center'
        },
        alternateRowStyles: {
          fillColor: [245, 247, 250]
        },
        columnStyles: {
          0: { cellWidth: 15, halign: 'center' },
          8: { cellWidth: 25, halign: 'center' }
        }
      });

      doc.save("relatorio_sga_horizontal.pdf");
    },
    viewItem(item) {
      this.selectedItem = item;
      document.body.style.overflow = 'hidden';
    },
    closeModal() {
      this.selectedItem = null;
      document.body.style.overflow = 'auto';
    },
    clearFilters() {
      this.search = '';
      this.filterType = '';
      this.filterDepartment = '';
      this.startDate = '';
      this.endDate = '';
      this.filterThirdParty = '';
    }
  }
}
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .relative,
.modal-leave-active .relative {
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.modal-enter-from .relative,
.modal-leave-to .relative {
  transform: scale(0.9) translateY(20px);
  opacity: 0;
}
</style>
