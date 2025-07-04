<template>
  <div class="bg-white">
    <!-- Header -->
    <div class="bg-gray-50 py-8">
      <div class="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold text-gray-900">Nossos Produtos</h1>
        <p class="mt-2 text-gray-600">Encontre roupas, calçados e acessórios para toda a família</p>
      </div>
    </div>

    <div class="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="lg:grid lg:grid-cols-4 lg:gap-x-8">
        <!-- Mobile Filter Button -->
        <div class="lg:hidden mb-6">
          <button @click="showMobileFilters = !showMobileFilters"
                  class="w-full bg-white border border-gray-300 rounded-md py-2 px-4 flex items-center justify-between text-sm font-medium text-gray-700 hover:bg-gray-50">
            <span>Filtros</span>
            <svg class="w-5 h-5" :class="{'rotate-180': showMobileFilters}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
        </div>

        <!-- Sidebar Filters -->
        <div class="lg:block" :class="{'hidden': !showMobileFilters && !isLargeScreen}">
          <div class="bg-white p-6 rounded-lg shadow-sm border">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Filtros</h3>
            
            <!-- Category Filter -->
            <div class="mb-6">
              <h4 class="text-sm font-medium text-gray-900 mb-3">Categoria</h4>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input type="radio" 
                         v-model="filters.category" 
                         value="" 
                         class="text-blue-600 focus:ring-blue-500 border-gray-300">
                  <span class="ml-2 text-sm text-gray-600">Todas</span>
                </label>
                <label v-for="category in categories" 
                       :key="category.id" 
                       class="flex items-center">
                  <input type="radio" 
                         v-model="filters.category" 
                         :value="category.name" 
                         class="text-blue-600 focus:ring-blue-500 border-gray-300">
                  <span class="ml-2 text-sm text-gray-600">{{ category.display_name }}</span>
                </label>
              </div>
            </div>

            <!-- Gender Filter -->
            <div class="mb-6">
              <h4 class="text-sm font-medium text-gray-900 mb-3">Gênero</h4>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input type="radio" 
                         v-model="filters.gender" 
                         value="" 
                         class="text-blue-600 focus:ring-blue-500 border-gray-300">
                  <span class="ml-2 text-sm text-gray-600">Todos</span>
                </label>
                <label class="flex items-center">
                  <input type="radio" 
                         v-model="filters.gender" 
                         value="masculino" 
                         class="text-blue-600 focus:ring-blue-500 border-gray-300">
                  <span class="ml-2 text-sm text-gray-600">Masculino</span>
                </label>
                <label class="flex items-center">
                  <input type="radio" 
                         v-model="filters.gender" 
                         value="feminino" 
                         class="text-blue-600 focus:ring-blue-500 border-gray-300">
                  <span class="ml-2 text-sm text-gray-600">Feminino</span>
                </label>
              </div>
            </div>

            <!-- Age Group Filter -->
            <div class="mb-6">
              <h4 class="text-sm font-medium text-gray-900 mb-3">Faixa Etária</h4>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input type="radio" 
                         v-model="filters.age_group" 
                         value="" 
                         class="text-blue-600 focus:ring-blue-500 border-gray-300">
                  <span class="ml-2 text-sm text-gray-600">Todas</span>
                </label>
                <label class="flex items-center">
                  <input type="radio" 
                         v-model="filters.age_group" 
                         value="bebê" 
                         class="text-blue-600 focus:ring-blue-500 border-gray-300">
                  <span class="ml-2 text-sm text-gray-600">Bebê (0-2 anos)</span>
                </label>
                <label class="flex items-center">
                  <input type="radio" 
                         v-model="filters.age_group" 
                         value="infantil" 
                         class="text-blue-600 focus:ring-blue-500 border-gray-300">
                  <span class="ml-2 text-sm text-gray-600">Infantil (3-12 anos)</span>
                </label>
                <label class="flex items-center">
                  <input type="radio" 
                         v-model="filters.age_group" 
                         value="jovem" 
                         class="text-blue-600 focus:ring-blue-500 border-gray-300">
                  <span class="ml-2 text-sm text-gray-600">Jovem (13-25 anos)</span>
                </label>
                <label class="flex items-center">
                  <input type="radio" 
                         v-model="filters.age_group" 
                         value="adulto" 
                         class="text-blue-600 focus:ring-blue-500 border-gray-300">
                  <span class="ml-2 text-sm text-gray-600">Adulto (26-59 anos)</span>
                </label>
                <label class="flex items-center">
                  <input type="radio" 
                         v-model="filters.age_group" 
                         value="idoso" 
                         class="text-blue-600 focus:ring-blue-500 border-gray-300">
                  <span class="ml-2 text-sm text-gray-600">Idoso (60+ anos)</span>
                </label>
              </div>
            </div>

            <button @click="clearFilters" 
                    class="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors">
              Limpar Filtros
            </button>
          </div>
        </div>

        <!-- Products Grid -->
        <div class="lg:col-span-3">
          <!-- Mobile Filter Button 
          <div class="lg:hidden mb-4">
            <button class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
              Filtros
            </button>
          </div>
          -->
          <!-- Results Info -->
          <div class="flex items-center justify-between mb-6">
            <p class="text-sm text-gray-600">
              {{ filteredProducts.length }} produto(s) encontrado(s)
            </p>
            <div class="flex items-center space-x-2">
              <label class="text-sm text-gray-600">Ordenar por:</label>
              <select v-model="sortBy" 
                      class="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="name">Nome</option>
                <option value="price-asc">Preço: Menor para Maior</option>
                <option value="price-desc">Preço: Maior para Menor</option>
              </select>
            </div>
          </div>

          <!-- Loading State -->
          <div v-if="loading" class="flex justify-center py-12">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>

          <!-- Products Grid -->
          <div v-else-if="filteredProducts.length > 0" 
               class="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            <ProductCard 
              v-for="product in sortedProducts" 
              :key="product.id" 
              :product="product" 
            />
          </div>

          <!-- No Products Found -->
          <div v-else class="text-center py-12">
            <div class="text-gray-500">
              <svg class="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              <h3 class="text-lg font-medium text-gray-900 mb-2">Nenhum produto encontrado</h3>
              <p class="text-gray-600">Tente ajustar os filtros ou procurar por outros termos.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { productService, categoryService } from '../services/api'
import ProductCard from '../components/ProductCard.vue'

export default {
  name: 'Products',
  components: {
    ProductCard
  },
  setup() {
    const route = useRoute()
    const products = ref([])
    const categories = ref([])
    const loading = ref(false)
    const sortBy = ref('name')
    const showMobileFilters = ref(false)
    const isLargeScreen = ref(window.innerWidth >= 1024)
    
    const filters = ref({
      category: '',
      gender: '',
      age_group: ''
    })

    // Listen for window resize
    const handleResize = () => {
      isLargeScreen.value = window.innerWidth >= 1024
      if (isLargeScreen.value) {
        showMobileFilters.value = false
      }
    }

    onMounted(() => {
      window.addEventListener('resize', handleResize)
    })

    onUnmounted(() => {
      window.removeEventListener('resize', handleResize)
    })

    const fetchProducts = async () => {
      try {
        loading.value = true
        const data = await productService.getProducts()
        products.value = data
      } catch (error) {
        console.error('Erro ao carregar produtos:', error)
        products.value = []
      } finally {
        loading.value = false
      }
    }

    const fetchCategories = async () => {
      try {
        const data = await categoryService.getCategories()
        categories.value = data
      } catch (error) {
        console.error('Erro ao carregar categorias:', error)
      }
    }

    const filteredProducts = computed(() => {
      let filtered = products.value

      if (filters.value.category) {
        filtered = filtered.filter(product => product.category === filters.value.category)
      }
      if (filters.value.gender) {
        filtered = filtered.filter(product => product.gender === filters.value.gender)
      }
      if (filters.value.age_group) {
        filtered = filtered.filter(product => product.age_group === filters.value.age_group)
      }

      return filtered
    })

    const sortedProducts = computed(() => {
      const sorted = [...filteredProducts.value]
      
      switch (sortBy.value) {
        case 'name':
          return sorted.sort((a, b) => a.name.localeCompare(b.name))
        case 'price-asc':
          return sorted.sort((a, b) => a.price - b.price)
        case 'price-desc':
          return sorted.sort((a, b) => b.price - a.price)
        default:
          return sorted
      }
    })

    const clearFilters = () => {
      filters.value = {
        category: '',
        gender: '',
        age_group: ''
      }
    }

    // Initialize filters from URL params
    const initializeFilters = () => {
      if (route.query.category) {
        filters.value.category = route.query.category
      }
      if (route.query.gender) {
        filters.value.gender = route.query.gender
      }
      if (route.query.age_group) {
        filters.value.age_group = route.query.age_group
      }
    }

    onMounted(() => {
      fetchProducts()
      fetchCategories()
      initializeFilters()
    })

    // Watch for route changes
    watch(() => route.query, () => {
      initializeFilters()
    })

    return {
      products,
      categories,
      loading,
      filters,
      sortBy,
      filteredProducts,
      sortedProducts,
      clearFilters,
      showMobileFilters,
      isLargeScreen
    }
  }
}
</script>

<style scoped>
.rotate-180 {
  transform: rotate(180deg);
}

.rotate-180 {
  transition: transform 0.3s ease;
}

/* Transição suave para os filtros móveis */
.lg\:block {
  transition: all 0.3s ease;
}

@media (max-width: 1023px) {
  .lg\:block.hidden {
    max-height: 0;
    opacity: 0;
    overflow: hidden;
  }
  
  .lg\:block:not(.hidden) {
    max-height: 1000px;
    opacity: 1;
  }
}
</style>
