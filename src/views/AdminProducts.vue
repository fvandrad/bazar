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
          <h1 class="text-2xl font-bold text-gray-900">Gerenciar Produtos</h1>
          <button @click="showAddModal = true" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
            Adicionar Produto
          </button>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        
        <!-- Filtros -->
        <div class="bg-white p-4 rounded-lg shadow mb-6">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Buscar</label>
              <input v-model="searchTerm" type="text" placeholder="Nome do produto..." class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Categoria</label>
              <select v-model="selectedCategory" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                <option value="">Todas</option>
                <option v-for="category in categories" :key="category.id" :value="category.name">
                  {{ category.display_name }}
                </option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Gênero</label>
              <select v-model="selectedGender" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                <option value="">Todos</option>
                <option value="masculino">Masculino</option>
                <option value="feminino">Feminino</option>
              </select>
            </div>              <div>
                <label class="block text-sm font-medium text-gray-700">Faixa Etária</label>
                <select v-model="selectedAgeGroup" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                  <option value="">Todas</option>
                  <option value="bebê">Bebê (0-2 anos)</option>
                  <option value="infantil">Infantil (3-12 anos)</option>
                  <option value="jovem">Jovem (13-25 anos)</option>
                  <option value="adulto">Adulto (26-59 anos)</option>
                  <option value="idoso">Idoso (60+ anos)</option>
                </select>
              </div>
          </div>
        </div>

        <!-- Lista de Produtos -->
        <div class="bg-white shadow overflow-hidden sm:rounded-md">
          <div class="px-4 py-5 sm:px-6">
            <h3 class="text-lg leading-6 font-medium text-gray-900">
              Produtos ({{ filteredProducts.length }})
            </h3>
            <p class="mt-1 max-w-2xl text-sm text-gray-500">
              Gerencie todos os produtos do seu bazar
            </p>
          </div>
          <ul class="divide-y divide-gray-200">
            <li v-for="product in filteredProducts" :key="product.id" class="px-6 py-4">
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-4">
                  <img :src="product.image" :alt="product.name" class="w-16 h-16 object-cover rounded-lg">
                  <div>
                    <h4 class="text-sm font-medium text-gray-900">{{ product.name }}</h4>
                    <p class="text-sm text-gray-500">{{ product.category }} • {{ product.gender }} • {{ product.age_group }}</p>
                    <p class="text-sm font-medium text-green-600">R$ {{ product.price.toFixed(2) }}</p>
                  </div>
                </div>
                <div class="flex items-center space-x-2">
                  <span :class="['px-2 py-1 text-xs font-medium rounded-full', 
                    product.stock <= 5 ? 'bg-red-100 text-red-800' : 
                    product.stock <= 10 ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-green-100 text-green-800']">
                    {{ product.stock }} unidades
                  </span>
                  <button @click="editProduct(product)" class="text-blue-600 hover:text-blue-800">
                    Editar
                  </button>
                  <button @click="deleteProduct(product.id)" class="text-red-600 hover:text-red-800">
                    Excluir
                  </button>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Modal Adicionar/Editar Produto -->
    <div v-if="showAddModal || showEditModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <h3 class="text-lg font-medium text-gray-900 mb-4">
            {{ editingProduct ? 'Editar Produto' : 'Adicionar Produto' }}
          </h3>
          <form @submit.prevent="saveProduct" class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">Nome</label>
                <input v-model="productForm.name" type="text" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Categoria</label>
                <select v-model="productForm.category" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                  <option value="">Selecione...</option>
                  <option v-for="category in categories" :key="category.id" :value="category.name">
                    {{ category.display_name }}
                  </option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Tipo</label>
                <input v-model="productForm.type" type="text" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Gênero</label>
                <select v-model="productForm.gender" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                  <option value="">Selecione...</option>
                  <option value="masculino">Masculino</option>
                  <option value="feminino">Feminino</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Faixa Etária</label>
                <select v-model="productForm.age_group" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                  <option value="">Selecione...</option>
                  <option value="bebê">Bebê (0-2 anos)</option>
                  <option value="infantil">Infantil (3-12 anos)</option>
                  <option value="jovem">Jovem (13-25 anos)</option>
                  <option value="adulto">Adulto (26-59 anos)</option>
                  <option value="idoso">Idoso (60+ anos)</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Preço</label>
                <input v-model="productForm.price" type="number" step="0.01" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Estoque</label>
                <input v-model="productForm.stock" type="number" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Imagem do Produto</label>
                <div class="mt-1 space-y-2">
                  <input @change="handleImageUpload" type="file" accept="image/*" class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100">
                  <div v-if="productForm.image" class="flex items-center space-x-2">
                    <img :src="productForm.image" alt="Preview" class="w-16 h-16 object-cover rounded-lg">
                    <button @click="removeImage" type="button" class="text-red-600 hover:text-red-800 text-sm">Remover</button>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Descrição</label>
              <textarea v-model="productForm.description" rows="3" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"></textarea>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Tamanhos (separados por vírgula)</label>
              <input v-model="sizesInput" type="text" placeholder="P, M, G, GG" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Cores (separadas por vírgula)</label>
              <input v-model="colorsInput" type="text" placeholder="Azul, Preto, Branco" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
            </div>
            <div class="flex justify-end space-x-2">
              <button type="button" @click="closeModal" class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
                Cancelar
              </button>
              <button type="submit" :disabled="isProcessingImage" class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed">
                <span v-if="isProcessingImage">Processando imagem...</span>
                <span v-else>{{ editingProduct ? 'Salvar' : 'Adicionar' }}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import api from '../services/api'

export default {
  name: 'AdminProducts',
  setup() {
    const products = ref([])
    const categories = ref([])
    const showAddModal = ref(false)
    const showEditModal = ref(false)
    const editingProduct = ref(null)
    
    const searchTerm = ref('')
    const selectedCategory = ref('')
    const selectedGender = ref('')
    const selectedAgeGroup = ref('')

    const productForm = ref({
      name: '',
      category: '',
      type: '',
      gender: '',
      age_group: '',
      price: '',
      image: '',
      description: '',
      stock: ''
    })

    const sizesInput = ref('')
    const colorsInput = ref('')
    const isProcessingImage = ref(false)

    // Função para converter imagem para WebP base64 compacto
    const convertToWebP = (file, quality = 0.8, maxWidth = 400, maxHeight = 400) => {
      return new Promise((resolve, reject) => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        const img = new Image()
        
        img.onload = () => {
          // Calcular dimensões mantendo proporção
          let { width, height } = img
          if (width > height) {
            if (width > maxWidth) {
              height = (height * maxWidth) / width
              width = maxWidth
            }
          } else {
            if (height > maxHeight) {
              width = (width * maxHeight) / height
              height = maxHeight
            }
          }
          
          canvas.width = width
          canvas.height = height
          
          // Desenhar imagem redimensionada
          ctx.drawImage(img, 0, 0, width, height)
          
          // Converter para WebP
          const webpData = canvas.toDataURL('image/webp', quality)
          resolve(webpData)
        }
        
        img.onerror = reject
        img.src = URL.createObjectURL(file)
      })
    }

    const handleImageUpload = async (event) => {
      const file = event.target.files[0]
      if (!file) return
      
      if (!file.type.startsWith('image/')) {
        alert('Por favor, selecione apenas arquivos de imagem.')
        return
      }
      
      isProcessingImage.value = true
      
      try {
        const webpBase64 = await convertToWebP(file)
        productForm.value.image = webpBase64
      } catch (error) {
        console.error('Erro ao processar imagem:', error)
        alert('Erro ao processar a imagem. Tente novamente.')
      } finally {
        isProcessingImage.value = false
      }
    }

    const removeImage = () => {
      // Ícone de foto em base64 WebP
      productForm.value.image = ' '
    }

    const filteredProducts = computed(() => {
      return products.value.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.value.toLowerCase())
        const matchesCategory = !selectedCategory.value || product.category === selectedCategory.value
        const matchesGender = !selectedGender.value || product.gender === selectedGender.value
        const matchesAgeGroup = !selectedAgeGroup.value || product.age_group === selectedAgeGroup.value
        
        return matchesSearch && matchesCategory && matchesGender && matchesAgeGroup
      })
    })

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

    const resetForm = () => {
      productForm.value = {
        name: '',
        category: '',
        type: '',
        gender: '',
        age_group: '',
        price: '',
        image: 'data:image/webp;base64,UklGRlIAAABXRUJQVlA4IEYAAAAQAgCdASoQABAAAUAmJQBOiWlo/wNpAP7+q7W6f8DaQDy/6u1un/A2kA8v+rtbp/wNpAPL/q7W6f8DaQDy/6u1un/A2kA8v+rtbp/wAA==',
        description: '',
        stock: ''
      }
      sizesInput.value = ''
      colorsInput.value = ''
    }

    const editProduct = (product) => {
      editingProduct.value = product
      productForm.value = { ...product }
      sizesInput.value = product.sizes.join(', ')
      colorsInput.value = product.colors.join(', ')
      showEditModal.value = true
    }

    const saveProduct = async () => {
      try {
        const productData = {
          ...productForm.value,
          price: parseFloat(productForm.value.price),
          stock: parseInt(productForm.value.stock),
          sizes: sizesInput.value.split(',').map(s => s.trim()),
          colors: colorsInput.value.split(',').map(c => c.trim())
        }

        if (editingProduct.value) {
          await api.put(`/products/${editingProduct.value.id}`, productData)
        } else {
          await api.post('/products', productData)
        }

        await fetchData()
        closeModal()
        alert(editingProduct.value ? 'Produto atualizado com sucesso!' : 'Produto adicionado com sucesso!')
      } catch (error) {
        console.error('Erro ao salvar produto:', error)
        alert('Erro ao salvar produto!')
      }
    }

    const deleteProduct = async (id) => {
      if (confirm('Tem certeza que deseja excluir este produto?')) {
        try {
          await api.delete(`/products/${id}`)
          await fetchData()
          alert('Produto excluído com sucesso!')
        } catch (error) {
          console.error('Erro ao excluir produto:', error)
          alert('Erro ao excluir produto!')
        }
      }
    }

    const closeModal = () => {
      showAddModal.value = false
      showEditModal.value = false
      editingProduct.value = null
      resetForm()
    }

    onMounted(() => {
      fetchData()
    })

    return {
      products,
      categories,
      showAddModal,
      showEditModal,
      editingProduct,
      productForm,
      sizesInput,
      colorsInput,
      searchTerm,
      selectedCategory,
      selectedGender,
      selectedAgeGroup,
      filteredProducts,
      isProcessingImage,
      editProduct,
      saveProduct,
      deleteProduct,
      closeModal,
      handleImageUpload,
      removeImage
    }
  }
}
</script>
