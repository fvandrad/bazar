<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 card-hover">
    <div class="aspect-square overflow-hidden bg-gray-100">
      <img :src="product.image" 
           :alt="product.name" 
           class="w-full h-full object-cover object-center group-hover:opacity-75">
    </div>
    
    <div class="p-4">
      <div class="flex items-center justify-between mb-2">
        <h3 class="text-lg font-semibold text-gray-900 truncate">
          {{ product.name }}
        </h3>
        <div class="flex items-center space-x-1">
          <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {{ product.category }}
          </span>
        </div>
      </div>
      
      <p class="text-sm text-gray-600 mb-3 line-clamp-2">
        {{ product.description }}
      </p>
      
      <div class="flex items-center justify-between mb-3">
        <div class="flex items-center space-x-2">
          <span class="text-sm text-gray-500 capitalize">{{ product.gender }}</span>
          <span class="text-gray-300">•</span>
          <span class="text-sm text-gray-500 capitalize">{{ product.age_group }}</span>
        </div>
        <div class="flex items-center">
          <span class="text-sm text-gray-500 mr-1">Estoque:</span>
          <span class="text-sm font-medium" 
                :class="product.stock > 0 ? 'text-green-600' : 'text-red-600'">
            {{ product.stock }}
          </span>
        </div>
      </div>
      
      <div class="flex items-center justify-between">
        <div class="flex-1">
          <p class="text-2xl font-bold text-gray-900 price-tag">
            R$ {{ product.price.toFixed(2).replace('.', ',') }}
          </p>
        </div>
        <div class="flex space-x-2">
          <router-link :to="`/produto/${product.id}`" 
                      class="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
            Ver Detalhes
          </router-link>
          <button @click="shareOnWhatsApp" 
                  class="bg-green-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.513z"/>
            </svg>
          </button>
        </div>
      </div>
      
      <!-- Size and Color indicators -->
      <div class="mt-3 flex flex-wrap gap-2">
        <div class="flex items-center">
          <span class="text-xs text-gray-500 mr-1">Tamanhos:</span>
          <div class="flex space-x-1">
            <span v-for="size in product.sizes.slice(0, 3)" 
                  :key="size"
                  class="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
              {{ size }}
            </span>
            <span v-if="product.sizes.length > 3" 
                  class="text-xs text-gray-500">
              +{{ product.sizes.length - 3 }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const shareOnWhatsApp = () => {
      const message = `Olá! Confira este produto incrível: *${props.product.name}*\n\n` +
                     `💰 Preço: R$ ${props.product.price.toFixed(2).replace('.', ',')}\n` +
                     `📦 Categoria: ${props.product.category}\n` +
                     `📝 Descrição: ${props.product.description}\n\n` +
                     `🛍️ Veja mais detalhes em: ${window.location.origin}/produto/${props.product.id}`
      
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`
      window.open(whatsappUrl, '_blank')
    }

    return {
      shareOnWhatsApp
    }
  }
}
</script>

<style scoped>
.line-clamp-2 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
