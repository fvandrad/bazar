<template>
  <div class="bg-white">
    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>

    <!-- Product Detail -->
    <div v-else-if="product" class="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Breadcrumb -->
      <nav class="flex mb-8" aria-label="Breadcrumb">
        <ol class="inline-flex items-center space-x-1 md:space-x-3">
          <li class="inline-flex items-center">
            <router-link to="/" class="text-gray-700 hover:text-blue-600">
              Início
            </router-link>
          </li>
          <li>
            <div class="flex items-center">
              <svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
              </svg>
              <router-link to="/produtos" class="ml-1 text-gray-700 hover:text-blue-600 md:ml-2">
                Produtos
              </router-link>
            </div>
          </li>
          <li aria-current="page">
            <div class="flex items-center">
              <svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
              </svg>
              <span class="ml-1 text-gray-500 md:ml-2">{{ product.name }}</span>
            </div>
          </li>
        </ol>
      </nav>

      <div class="lg:grid lg:grid-cols-2 lg:gap-x-8">
        <!-- Product Image -->
        <div class="lg:max-w-lg lg:self-start">
          <div class="aspect-square overflow-hidden rounded-lg bg-gray-100">
            <img :src="product.image" 
                 :alt="product.name" 
                 class="h-full w-full object-cover object-center">
          </div>
        </div>

        <!-- Product Info -->
        <div class="mt-10 lg:mt-0 lg:col-start-2 lg:row-span-2 lg:self-start">
          <div class="lg:max-w-lg">
            <h1 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {{ product.name }}
            </h1>
            
            <!-- Price -->
            <div class="mt-4">
              <p class="text-3xl font-bold text-gray-900">
                R$ {{ product.price.toFixed(2).replace('.', ',') }}
              </p>
            </div>

            <!-- Description -->
            <div class="mt-6">
              <h3 class="text-lg font-medium text-gray-900">Descrição</h3>
              <p class="mt-4 text-gray-700">{{ product.description }}</p>
            </div>

            <!-- Details -->
            <div class="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <h4 class="text-sm font-medium text-gray-900">Categoria</h4>
                <p class="mt-1 text-sm text-gray-600 capitalize">{{ product.category }}</p>
              </div>
              <div>
                <h4 class="text-sm font-medium text-gray-900">Tipo</h4>
                <p class="mt-1 text-sm text-gray-600 capitalize">{{ product.type }}</p>
              </div>
              <div>
                <h4 class="text-sm font-medium text-gray-900">Gênero</h4>
                <p class="mt-1 text-sm text-gray-600 capitalize">{{ product.gender }}</p>
              </div>
              <div>
                <h4 class="text-sm font-medium text-gray-900">Faixa Etária</h4>
                <p class="mt-1 text-sm text-gray-600 capitalize">{{ product.age_group }}</p>
              </div>
            </div>

            <!-- Sizes -->
            <div class="mt-6">
              <h4 class="text-sm font-medium text-gray-900">Tamanhos Disponíveis</h4>
              <div class="mt-2 flex flex-wrap gap-2">
                <span v-for="size in product.sizes" 
                      :key="size"
                      class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                  {{ size }}
                </span>
              </div>
            </div>

            <!-- Colors -->
            <div class="mt-6">
              <h4 class="text-sm font-medium text-gray-900">Cores Disponíveis</h4>
              <div class="mt-2 flex flex-wrap gap-2">
                <span v-for="color in product.colors" 
                      :key="color"
                      class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  {{ color }}
                </span>
              </div>
            </div>

            <!-- Stock -->
            <div class="mt-6">
              <div class="flex items-center">
                <h4 class="text-sm font-medium text-gray-900">Estoque:</h4>
                <span class="ml-2 text-sm font-medium" 
                      :class="product.stock > 0 ? 'text-green-600' : 'text-red-600'">
                  {{ product.stock > 0 ? `${product.stock} unidades` : 'Esgotado' }}
                </span>
              </div>
            </div>

            <!-- Share on WhatsApp -->
            <div class="mt-8">
              <button @click="shareOnWhatsApp"
                      class="w-full bg-green-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors">
                <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.513z"/>
                </svg>
                Compartilhar no WhatsApp
              </button>
            </div>

            <!-- Back to Products -->
            <div class="mt-6">
              <router-link to="/produtos" 
                          class="inline-flex items-center text-blue-600 hover:text-blue-700">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                </svg>
                Voltar aos Produtos
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Product Not Found -->
    <div v-else class="text-center py-12">
      <div class="text-gray-500">
        <svg class="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
        </svg>
        <h3 class="text-lg font-medium text-gray-900 mb-2">Produto não encontrado</h3>
        <p class="text-gray-600">O produto que você está procurando não existe ou foi removido.</p>
        <router-link to="/produtos" 
                    class="mt-4 inline-flex items-center text-blue-600 hover:text-blue-700">
          Voltar aos Produtos
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { productService } from '../services/api'

export default {
  name: 'ProductDetail',
  setup() {
    const route = useRoute()
    const product = ref(null)
    const loading = ref(false)

    const fetchProduct = async () => {
      try {
        loading.value = true
        const productId = route.params.id
        const data = await productService.getProductById(productId)
        product.value = data
      } catch (error) {
        console.error('Erro ao carregar produto:', error)
        product.value = null
      } finally {
        loading.value = false
      }
    }

    const shareOnWhatsApp = () => {
      if (!product.value) return
      
      const message = `🛍️ *${product.value.name}*\n\n` +
                     `💰 Preço: R$ ${product.value.price.toFixed(2).replace('.', ',')}\n` +
                     `📦 Categoria: ${product.value.category}\n` +
                     `👤 Gênero: ${product.value.gender}\n` +
                     `👶 Faixa Etária: ${product.value.age_group}\n` +
                     `📏 Tamanhos: ${product.value.sizes.join(', ')}\n` +
                     `🎨 Cores: ${product.value.colors.join(', ')}\n` +
                     `📦 Estoque: ${product.value.stock} unidades\n\n` +
                     `📝 Descrição: ${product.value.description}\n\n` +
                     `🔗 Veja mais detalhes em: ${window.location.href}`
      
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`
      window.open(whatsappUrl, '_blank')
    }

    onMounted(() => {
      fetchProduct()
    })

    return {
      product,
      loading,
      shareOnWhatsApp
    }
  }
}
</script>
