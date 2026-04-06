import { reactive } from 'vue';

const state = reactive({
  token: localStorage.getItem('access_token'),
  user: JSON.parse(localStorage.getItem('user') || 'null')
});

export const authService = {
  async login(email, password) {
    try {
      console.log('Iniciando tentativa de login direto em:', 'https://api-autoanalytics.mundoevogard.com/api/auth/login');
      const response = await fetch('https://api-autoanalytics.mundoevogard.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      let data;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const text = await response.text();
        data = { message: text || 'Erro desconhecido' };
      }

      if (!response.ok) {
        // Se for 401, a mensagem virá do JSON da API (ex: "Senha inválida")
        throw new Error(data.message || data.error || 'Erro ao realizar login');
      }

      if (data.access_token) {
        localStorage.setItem('access_token', data.access_token);
        if (data.user) {
          localStorage.setItem('user', JSON.stringify(data.user));
          state.user = data.user;
        }
        state.token = data.access_token;
        return { success: true };
      }

      return { success: false, message: 'Token não recebido' };
    } catch (error) {
      console.error('Erro detalhado no authService.login:', error);
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        return { 
          success: false, 
          message: 'Erro de conexão (CORS ou Rede). Verifique se sua API permite requisições do domínio do AI Studio.' 
        };
      }
      return { success: false, message: error.message };
    }
  },

  logout() {
    localStorage.clear();
    state.token = null;
    state.user = null;
    // Usar window.location.href garante que todo o estado da memória seja limpo
    window.location.href = '/';
  },

  getToken() {
    return state.token;
  },

  getUser() {
    return state.user;
  },

  isAuthenticated() {
    return !!state.token;
  }
};
