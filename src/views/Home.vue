<template>
  <div class="bg-white">
    <!-- Hero Section -->
    <section class="hero-gradient text-white">
      <div class="max-w-screen-xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Bazar  
          </h1>
          <p class="mt-6 text-xl leading-8 text-gray-100">
            Roupas, calçados e acessórios para toda a família
          </p>
          <div class="mt-10 flex items-center justify-center gap-x-6">
            <router-link to="/produtos" 
                        class="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
              Ver Produtos
            </router-link>
            <router-link to="/sobre" 
                        class="text-sm font-semibold leading-6 text-white hover:text-gray-200">
              Saiba mais <span aria-hidden="true">→</span>
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- Categories Section -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Nossas Categorias
          </h2>
          <p class="mt-4 text-lg text-gray-600">
            Encontre tudo o que você precisa para se vestir com estilo
          </p>
        </div>
        
        <div class="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3" v-if="categories.length">
          <div v-for="category in categories" :key="category.id" 
               class="group relative overflow-hidden rounded-lg bg-white p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
               @click="goToCategory(category.name)">
            <div class="text-center">
              <div class="category-icon mb-4">{{ category.icon }}</div>
              <h3 class="text-lg font-semibold text-gray-900">{{ category.display_name }}</h3>
              <p class="mt-2 text-sm text-gray-600">
                Explore nossa seleção de {{ category.display_name.toLowerCase() }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Age Groups Section -->
    <section class="py-16 bg-white">
      <div class="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Para Toda a Família
          </h2>
          <p class="mt-4 text-lg text-gray-600">
            Produtos especializados para cada faixa etária
          </p>
        </div>
        
        <div class="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">
          <div class="group relative overflow-hidden rounded-lg bg-gradient-to-r from-pink-100 to-pink-200 p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
               @click="goToAgeGroup('bebê')">
            <div class="text-center">
              <div class="text-4xl mb-4">👶</div>
              <h3 class="text-lg font-semibold text-gray-900">Bebê</h3>
              <p class="mt-2 text-sm text-gray-600">0-2 anos</p>
            </div>
          </div>
          
          <div class="group relative overflow-hidden rounded-lg bg-gradient-to-r from-yellow-100 to-yellow-200 p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
               @click="goToAgeGroup('infantil')">
            <div class="text-center">
              <div class="text-4xl mb-4">🧒</div>
              <h3 class="text-lg font-semibold text-gray-900">Infantil</h3>
              <p class="mt-2 text-sm text-gray-600">3-12 anos</p>
            </div>
          </div>
          
          <div class="group relative overflow-hidden rounded-lg bg-gradient-to-r from-purple-100 to-purple-200 p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
               @click="goToAgeGroup('jovem')">
            <div class="text-center">
              <div class="text-4xl mb-4">🧑</div>
              <h3 class="text-lg font-semibold text-gray-900">Jovem</h3>
              <p class="mt-2 text-sm text-gray-600">13-25 anos</p>
            </div>
          </div>
          
          <div class="group relative overflow-hidden rounded-lg bg-gradient-to-r from-blue-100 to-blue-200 p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
               @click="goToAgeGroup('adulto')">
            <div class="text-center">
              <div class="text-4xl mb-4">👨</div>
              <h3 class="text-lg font-semibold text-gray-900">Adulto</h3>
              <p class="mt-2 text-sm text-gray-600">26-59 anos</p>
            </div>
          </div>
          
          <div class="group relative overflow-hidden rounded-lg bg-gradient-to-r from-green-100 to-green-200 p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
               @click="goToAgeGroup('idoso')">
            <div class="text-center">
              <div class="text-4xl mb-4">👴</div>
              <h3 class="text-lg font-semibold text-gray-900">Idoso</h3>
              <p class="mt-2 text-sm text-gray-600">60+ anos</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Products Section -->
    <section class="py-16">
      <div class="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Produtos em Destaque
          </h2>
          <p class="mt-4 text-lg text-gray-600">
            Confira nossos produtos mais populares
          </p>
        </div>
        
        <div class="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4" v-if="featuredProducts.length">
          <ProductCard 
            v-for="product in featuredProducts" 
            :key="product.id" 
            :product="product" 
          />
        </div>
        
        <div class="mt-12 text-center">
          <router-link to="/produtos" 
                      class="inline-flex items-center justify-center rounded-md bg-blue-600 px-8 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Ver Todos os Produtos
          </router-link>
        </div>
      </div>
    </section>

    <!-- Newsletter Section 
    <section class="bg-gray-50 py-16">
      <div class="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Fique por dentro das novidades
          </h2>
          <p class="mt-4 text-lg text-gray-600">
            Receba ofertas especiais e lançamentos em primeira mão
          </p>
          <div class="mt-8 flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input type="email" 
                   placeholder="Digite seu e-mail" 
                   class="flex-1 rounded-md border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500">
            <button class="rounded-md bg-blue-600 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Inscrever-se
            </button>
          </div>
        </div>
      </div>
    </section>
    -->
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { productService, categoryService } from '../services/api'
import ProductCard from '../components/ProductCard.vue'

export default {
  name: 'Home',
  components: {
    ProductCard
  },
  setup() {
    const router = useRouter()
    const categories = ref([])
    const featuredProducts = ref([])
    const loading = ref(false)

    const fetchCategories = async () => {
      try {
        const data = await categoryService.getCategories()
        categories.value = data
      } catch (error) {
        console.error('Erro ao carregar categorias:', error)
      }
    }

    const fetchFeaturedProducts = async () => {
      try {
        loading.value = true
        const data = await productService.getProducts()
        // Pegar apenas 4 produtos aleatórios para destaque
        featuredProducts.value = data.slice(0, 4)
      } catch (error) {
        console.error('Erro ao carregar produtos em destaque:', error)
      } finally {
        loading.value = false
      }
    }

    const goToCategory = (categoryName) => {
      router.push(`/produtos?category=${categoryName}`)
    }

    const goToAgeGroup = (ageGroup) => {
      router.push(`/produtos?age_group=${ageGroup}`)
    }

    onMounted(() => {
      fetchCategories()
      fetchFeaturedProducts()
    })

    return {
      categories,
      featuredProducts,
      loading,
      goToCategory,
      goToAgeGroup
    }
  }
}
</script>
