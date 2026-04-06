import { authService } from './authService';

const API_URL = 'https://api-autoanalytics.mundoevogard.com/api/form';

const getHeaders = () => {
  const token = authService.getToken();
  return {
    'Authorization': token ? `Bearer ${token}` : '',
    'Content-Type': 'application/json'
  };
};

export const dataService = {
  async getAll() {
    try {
      const response = await fetch(API_URL, {
        headers: getHeaders()
      });
      if (!response.ok) {
        if (response.status === 401) {
          authService.logout();
        }
        throw new Error('Erro ao buscar dados da API');
      }
      const data = await response.json();
      
      // Verifica se o dado retornado é um array antes de processar
      if (!Array.isArray(data)) {
        console.warn('API não retornou um array de dados:', data);
        return [];
      }

      // Normaliza os dados da API para garantir consistência
      return data.map(item => ({
        ...item,
        type_consultant: item.type_consultant?.toLowerCase() || '',
        cliente_type_consultant: item.cliente_type_consultant?.toLowerCase() || '',
        department: item.department === 'SINISTRO' ? 'REPARO' : item.department
      }));
    } catch (error) {
      console.error('Erro no dataService.getAll:', error);
      // Fallback para localStorage se a API falhar ou para manter compatibilidade temporária
      const localData = localStorage.getItem('sga_forms_data');
      return localData ? JSON.parse(localData) : [];
    }
  },
  async getById(id) {
    try {
      // Tenta buscar todos e filtrar (ou buscar por ID se a API suportar /api/form/:id)
      const data = await this.getAll();
      return data.find(item => item.id === parseInt(id));
    } catch (error) {
      console.error('Erro no dataService.getById:', error);
      return null;
    }
  },
  async update(updatedItem) {
    // Por enquanto mantendo local ou implementando PUT se necessário
    // O usuário pediu apenas o carregamento inicial, mas vamos preparar para o futuro
    console.log('Update call (currently local fallback):', updatedItem);
    const data = await this.getAll();
    const index = data.findIndex(item => item.id === parseInt(updatedItem.id));
    if (index !== -1) {
      data[index] = { ...data[index], ...updatedItem };
      localStorage.setItem('sga_forms_data', JSON.stringify(data));
      return true;
    }
    return false;
  },
  async delete(id) {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: getHeaders()
      });
      if (!response.ok) {
        if (response.status === 401) {
          authService.logout();
        }
        throw new Error('Erro ao deletar registro na API');
      }
      return true;
    } catch (error) {
      console.error('Erro no dataService.delete:', error);
      // Fallback local se a API falhar (opcional, mas bom para manter o estado se o usuário quiser)
      const data = await this.getAll();
      const filteredData = data.filter(item => item.id !== parseInt(id));
      localStorage.setItem('sga_forms_data', JSON.stringify(filteredData));
      return true;
    }
  }
};
