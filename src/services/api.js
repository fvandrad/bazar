import axios from 'axios'

// local API base URL
const API_BASE_URL = 'http://localhost:3001'

//const API_BASE_URL = 'https://my-json-server.typicode.com/fvandrad/bazar'

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const productService = {
  // Buscar todos os produtos
  async getProducts(params = {}) {
    try {
      const response = await api.get('/products', { params })
      return response.data
    } catch (error) {
      console.error('Erro ao buscar produtos:', error)
      throw error
    }
  },

  // Buscar produto por ID
  async getProductById(id) {
    try {
      const response = await api.get(`/products/${id}`)
      return response.data
    } catch (error) {
      console.error('Erro ao buscar produto:', error)
      throw error
    }
  },

  // Buscar produtos por categoria
  async getProductsByCategory(category) {
    try {
      const response = await api.get(`/products?category=${category}`)
      return response.data
    } catch (error) {
      console.error('Erro ao buscar produtos por categoria:', error)
      throw error
    }
  },

  // Buscar produtos por filtros
  async getProductsByFilters(filters) {
    try {
      const params = new URLSearchParams()
      
      Object.keys(filters).forEach(key => {
        if (filters[key]) {
          params.append(key, filters[key])
        }
      })

      const response = await api.get(`/products?${params.toString()}`)
      return response.data
    } catch (error) {
      console.error('Erro ao buscar produtos por filtros:', error)
      throw error
    }
  }
}

export const categoryService = {
  // Buscar todas as categorias
  async getCategories() {
    try {
      const response = await api.get('/categories')
      return response.data
    } catch (error) {
      console.error('Erro ao buscar categorias:', error)
      throw error
    }
  }
}

export default api
