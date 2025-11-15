import axios from 'axios';

// Detecta automaticamente se está em produção ou desenvolvimento
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true // IMPORTANTE para CORS
});

export const autenticacaoServico = {
    login: (credenciais) => api.post('/auth/login', credenciais),
};

export const turmaServico = {
    listarTodas: () => api.get('/turmas'),
    buscarPorNome: (nome) => api.get(`/turmas/buscar?nome=${nome}`),
    criar: (dadosTurma) => api.post('/turmas', dadosTurma),
    atualizar: (id, dadosTurma) => api.put(`/turmas/${id}`, dadosTurma),
    excluir: (id) => api.delete(`/turmas/${id}`),
    matricularAcademico: (idTurma, idAcademico) =>
        api.post(`/turmas/${idTurma}/matricular/${idAcademico}`),
    removerAcademico: (idTurma, idAcademico) =>
        api.delete(`/turmas/${idTurma}/remover/${idAcademico}`)
};
```

**1.2 - Criar arquivo `.env.production` na raiz do frontend:**
```
VITE_API_URL=https://rekotlin-backend.onrender.com/api
```

**1.3 - Criar arquivo `.env.development` (opcional):**
```
VITE_API_URL=http://localhost:8080/api
```

#### Passo 2: Deploy no Vercel

**2.1 - Acessar:** https://vercel.com
- Criar conta (use GitHub)

**2.2 - Importar Projeto:**
1. Click "Add New..." → "Project"
2. Selecione seu repositório do frontend
3. Configure:
   - **Framework Preset:** Vite
   - **Root Directory:** `./` (ou onde está o frontend)
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

**2.3 - Adicionar Variáveis de Ambiente:**
Na seção "Environment Variables":
```
VITE_API_URL = https://rekotlin-backend.onrender.com/api
```

**2.4 - Deploy:**
- Click "Deploy"
- Aguarde 2-3 minutos
- Sua aplicação estará em: `https://seu-projeto.vercel.app`

#### Passo 3: Atualizar CORS no Backend

**3.1 - Volte no Render (Backend):**
1. Vá em "Environment"
2. Adicione nova variável:
```
ALLOWED_ORIGINS = https://seu-projeto.vercel.app