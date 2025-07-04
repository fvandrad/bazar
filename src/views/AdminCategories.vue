<template>
  <div class="min-h-screen bg-gray-50">
    <div class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6 md:justify-start md:space-x-10">
          <div class="flex justify-start lg:w-0 lg:flex-1">
            <router-link to="/admin" class="text-gray-500 hover:text-gray-700">
              ← Voltar para o painel
            </router-link>
          </div>
          <h1 class="text-2xl font-bold text-gray-900">Gerenciar Categorias</h1>
          <button @click="showAddModal = true" class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md">
            Adicionar Categoria
          </button>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        
        <!-- Lista de Categorias -->
        <div class="bg-white shadow overflow-hidden sm:rounded-md">
          <div class="px-4 py-5 sm:px-6">
            <h3 class="text-lg leading-6 font-medium text-gray-900">
              Categorias ({{ categories.length }})
            </h3>
            <p class="mt-1 max-w-2xl text-sm text-gray-500">
              Gerencie as categorias de produtos do seu bazar
            </p>
          </div>
          <ul class="divide-y divide-gray-200">
            <li v-for="category in categories" :key="category.id" class="px-6 py-4">
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-4">
                  <div class="text-2xl">{{ category.icon }}</div>
                  <div>
                    <h4 class="text-sm font-medium text-gray-900">{{ category.display_name }}</h4>
                    <p class="text-sm text-gray-500">{{ category.name }}</p>
                    <p class="text-sm text-gray-500">{{ getProductCount(category.name) }} produtos</p>
                  </div>
                </div>
                <div class="flex items-center space-x-2">
                  <button @click="editCategory(category)" class="text-blue-600 hover:text-blue-800">
                    Editar
                  </button>
                  <button @click="deleteCategory(category.id)" class="text-red-600 hover:text-red-800">
                    Excluir
                  </button>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <!-- Estatísticas por Categoria -->
        <div class="mt-8">
          <h2 class="text-lg font-medium text-gray-900 mb-4">Estatísticas por Categoria</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="category in categories" :key="category.id" class="bg-white overflow-hidden shadow rounded-lg">
              <div class="p-5">
                <div class="flex items-center">
                  <div class="flex-shrink-0">
                    <div class="w-8 h-8 bg-gray-100 rounded-md flex items-center justify-center">
                      <span class="text-lg">{{ category.icon }}</span>
                    </div>
                  </div>
                  <div class="ml-5 w-0 flex-1">
                    <dl>
                      <dt class="text-sm font-medium text-gray-500 truncate">
                        {{ category.display_name }}
                      </dt>
                      <dd class="text-lg font-medium text-gray-900">
                        {{ getProductCount(category.name) }} produtos
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div class="bg-gray-50 px-5 py-3">
                <div class="text-sm text-gray-500">
                  Valor total: R$ {{ getCategoryValue(category.name).toFixed(2) }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Adicionar/Editar Categoria -->
    <div v-if="showAddModal || showEditModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-11/12 md:w-1/2 lg:w-1/3 shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <h3 class="text-lg font-medium text-gray-900 mb-4">
            {{ editingCategory ? 'Editar Categoria' : 'Adicionar Categoria' }}
          </h3>
          <form @submit.prevent="saveCategory" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Nome da Categoria</label>
              <input v-model="categoryForm.name" type="text" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500">
              <p class="text-xs text-gray-500 mt-1">Nome interno (minúsculas, sem acentos)</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Nome para Exibição</label>
              <input v-model="categoryForm.display_name" type="text" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500">
              <p class="text-xs text-gray-500 mt-1">Nome que aparece na loja</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Ícone</label>
              <input v-model="categoryForm.icon" type="text" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500">
              <p class="text-xs text-gray-500 mt-1">Emoji que representa a categoria (ex: 👕, 👟, 👜)</p>
            </div>
            <div class="flex justify-end space-x-2">
              <button type="button" @click="closeModal" class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
                Cancelar
              </button>
              <button type="submit" class="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700">
                {{ editingCategory ? 'Salvar' : 'Adicionar' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import api from '../services/api'

export default {
  name: 'AdminCategories',
  setup() {
    const categories = ref([])
    const products = ref([])
    const showAddModal = ref(false)
    const showEditModal = ref(false)
    const editingCategory = ref(null)

    const categoryForm = ref({
      name: '',
      display_name: '',
      icon: ''
    })

    const fetchData = async () => {
      try {
        const [categoriesResponse, productsResponse] = await Promise.all([
          api.get('/categories'),
          api.get('/products')
        ])
        categories.value = categoriesResponse.data
        products.value = productsResponse.data
      } catch (error) {
        console.error('Erro ao carregar dados:', error)
      }
    }

    const getProductCount = (categoryName) => {
      return products.value.filter(product => product.category === categoryName).length
    }

    const getCategoryValue = (categoryName) => {
      return products.value
        .filter(product => product.category === categoryName)
        .reduce((total, product) => total + (product.price * product.stock), 0)
    }

    const resetForm = () => {
      categoryForm.value = {
        name: '',
        display_name: '',
        icon: ''
      }
    }

    const editCategory = (category) => {
      editingCategory.value = category
      categoryForm.value = { ...category }
      showEditModal.value = true
    }

    const saveCategory = async () => {
      try {
        if (editingCategory.value) {
          await api.put(`/categories/${editingCategory.value.id}`, categoryForm.value)
        } else {
          await api.post('/categories', categoryForm.value)
        }

        await fetchData()
        closeModal()
        alert(editingCategory.value ? 'Categoria atualizada com sucesso!' : 'Categoria adicionada com sucesso!')
      } catch (error) {
        console.error('Erro ao salvar categoria:', error)
        alert('Erro ao salvar categoria!')
      }
    }

    const deleteCategory = async (id) => {
      // Verificar se há produtos nesta categoria
      const categoryToDelete = categories.value.find(c => c.id === id)
      const productCount = getProductCount(categoryToDelete.name)
      
      if (productCount > 0) {
        alert(`Não é possível excluir esta categoria pois ela possui ${productCount} produto(s). Remova os produtos primeiro.`)
        return
      }

      if (confirm('Tem certeza que deseja excluir esta categoria?')) {
        try {
          await api.delete(`/categories/${id}`)
          await fetchData()
          alert('Categoria excluída com sucesso!')
        } catch (error) {
          console.error('Erro ao excluir categoria:', error)
          alert('Erro ao excluir categoria!')
        }
      }
    }

    const closeModal = () => {
      showAddModal.value = false
      showEditModal.value = false
      editingCategory.value = null
      resetForm()
    }

    onMounted(() => {
      fetchData()
    })

    return {
      categories,
      products,
      showAddModal,
      showEditModal,
      editingCategory,
      categoryForm,
      getProductCount,
      getCategoryValue,
      editCategory,
      saveCategory,
      deleteCategory,
      closeModal
    }
  }
}
</script>
