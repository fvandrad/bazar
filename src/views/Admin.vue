<template>
  <div class="min-h-screen bg-gray-50">
    <div class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6 md:justify-start md:space-x-10">
          <div class="flex justify-start lg:w-0 lg:flex-1">
            <router-link to="/" class="text-gray-500 hover:text-gray-700">
              ← Voltar para a loja
            </router-link>
          </div>
          <h1 class="text-2xl font-bold text-gray-900">Painel Administrativo</h1>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <!-- Card Produtos -->
          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="p-5">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <div class="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                    <span class="text-white font-bold">📦</span>
                  </div>
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">
                      Total de Produtos
                    </dt>
                    <dd class="text-lg font-medium text-gray-900">
                      {{ totalProducts }}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-5 py-3">
              <div class="text-sm">
                <router-link to="/admin/produtos" class="font-medium text-blue-600 hover:text-blue-500">
                  Gerenciar produtos
                </router-link>
              </div>
            </div>
          </div>

          <!-- Card Categorias -->
          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="p-5">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <div class="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                    <span class="text-white font-bold">📂</span>
                  </div>
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">
                      Categorias
                    </dt>
                    <dd class="text-lg font-medium text-gray-900">
                      {{ totalCategories }}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-5 py-3">
              <div class="text-sm">
                <router-link to="/admin/categorias" class="font-medium text-green-600 hover:text-green-500">
                  Gerenciar categorias
                </router-link>
              </div>
            </div>
          </div>

          <!-- Card Estoque Baixo -->
          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="p-5">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <div class="w-8 h-8 bg-red-500 rounded-md flex items-center justify-center">
                    <span class="text-white font-bold">⚠️</span>
                  </div>
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">
                      Estoque Baixo
                    </dt>
                    <dd class="text-lg font-medium text-gray-900">
                      {{ lowStockProducts }}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-5 py-3">
              <div class="text-sm">
                <span class="font-medium text-red-600">
                  Produtos com estoque ≤ 5
                </span>
              </div>
            </div>
          </div>

        </div>

        <!-- Ações Rápidas -->
        <div class="mt-8">
          <h2 class="text-lg font-medium text-gray-900 mb-4">Ações Rápidas</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <router-link to="/admin/produtos" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-center transition-colors">
              Adicionar Produto
            </router-link>
            <router-link to="/admin/categorias" class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-center transition-colors">
              Gerenciar Categorias
            </router-link>
            <router-link to="/produtos" class="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md text-center transition-colors">
              Ver Loja
            </router-link>
            <button @click="exportData" class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md text-center transition-colors">
              Exportar Dados
            </button>
          </div>
        </div>

        <!-- Produtos com Estoque Baixo -->
        <div class="mt-8" v-if="lowStockProductsList.length > 0">
          <h2 class="text-lg font-medium text-gray-900 mb-4">Produtos com Estoque Baixo</h2>
          <div class="bg-white shadow overflow-hidden sm:rounded-md">
            <ul class="divide-y divide-gray-200">
              <li v-for="product in lowStockProductsList" :key="product.id" class="px-6 py-4">
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <img :src="product.image" :alt="product.name" class="w-10 h-10 object-cover rounded-lg mr-4">
                    <div>
                      <p class="text-sm font-medium text-gray-900">{{ product.name }}</p>
                      <p class="text-sm text-gray-500">{{ product.category }}</p>
                    </div>
                  </div>
                  <div class="flex items-center">
                    <span class="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
                      {{ product.stock }} unidades
                    </span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import api from '../services/api'

export default {
  name: 'Admin',
  setup() {
    const products = ref([])
    const categories = ref([])

    const totalProducts = computed(() => products.value.length)
    const totalCategories = computed(() => categories.value.length)
    const lowStockProducts = computed(() => products.value.filter(p => p.stock <= 5).length)
    const lowStockProductsList = computed(() => products.value.filter(p => p.stock <= 5))

    const fetchData = async () => {
      try {
        const [productsResponse, categoriesResponse] = await Promise.all([
          api.get('/products'),
          api.get('/categories')
        ])
        products.value = productsResponse.data
        categories.value = categoriesResponse.data
      } catch (error) {
        console.error('Erro ao carregar dados:', error)
      }
    }

    const exportData = () => {
      const data = {
        products: products.value,
        categories: categories.value,
        exportDate: new Date().toISOString()
      }
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `bazar-backup-${new Date().toISOString().split('T')[0]}.json`
      a.click()
      URL.revokeObjectURL(url)
    }

    onMounted(() => {
      fetchData()
    })

    return {
      products,
      categories,
      totalProducts,
      totalCategories,
      lowStockProducts,
      lowStockProductsList,
      exportData
    }
  }
}
</script>
