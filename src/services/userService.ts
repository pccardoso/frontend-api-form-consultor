import { authService } from './authService';

const getHeaders = () => {
  const token = authService.getToken();
  return {
    'Authorization': token ? `Bearer ${token}` : '',
    'Content-Type': 'application/json'
  };
};

export const userService = {
  async getAll() {
    try {
      const response = await fetch('https://api-autoanalytics.mundoevogard.com/api/user/all', {
        headers: getHeaders()
      });
      if (!response.ok) {
        if (response.status === 401) {
          authService.logout();
        }
        throw new Error('Erro ao buscar usuários');
      }
      const data = await response.json();
      if (!Array.isArray(data)) {
        console.warn('API de usuários não retornou um array:', data);
        return [];
      }
      return data;
    } catch (error) {
      console.error('Erro no userService.getAll:', error);
      throw error;
    }
  },

  async register(userData) {
    try {
      const response = await fetch('https://api-autoanalytics.mundoevogard.com/api/auth/register', {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(userData)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Erro ao registrar usuário');
      }
      
      return data;
    } catch (error) {
      console.error('Erro no userService.register:', error);
      throw error;
    }
  },

  async delete(id) {
    try {
      const response = await fetch(`https://api-autoanalytics.mundoevogard.com/api/user/${id}`, {
        method: 'DELETE',
        headers: getHeaders()
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Erro ao excluir usuário');
      }
      
      return true;
    } catch (error) {
      console.error('Erro no userService.delete:', error);
      throw error;
    }
  }
};
