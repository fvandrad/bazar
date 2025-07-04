<template>
  <div class="bg-white">
    <!-- Header -->
    <div class="bg-gray-50 py-8">
      <div class="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold text-gray-900">Sobre Nós</h1>
        <p class="mt-2 text-gray-600">Conheça mais sobre o Bazar  </p>
      </div>
    </div>

    <div class="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <!-- Content -->
        <div>
          <h2 class="text-3xl font-bold text-gray-900 mb-6">
            Nossa História
          </h2>
          <div class="space-y-4 text-gray-700">
            <p>
              O Bazar   nasceu da paixão por democratizar a moda e tornar roupas, 
              calçados e acessórios de qualidade acessíveis para toda a família. 
              Desde nossa fundação, temos o compromisso de oferecer produtos que 
              combinam estilo, conforto e preço justo.
            </p>
            <p>
              Nossa missão é ser mais que uma loja - somos um espaço onde cada pessoa 
              pode encontrar peças que expressem sua personalidade e estilo único. 
              Acreditamos que a moda deve ser inclusiva, atendendo adultos e crianças, 
              homens e mulheres, com a mesma dedicação e cuidado.
            </p>
            <p>
              Com uma curadoria cuidadosa de produtos, buscamos sempre as melhores 
              opções do mercado, garantindo qualidade e variedade para nossos clientes. 
              Nosso objetivo é que cada visita ao Bazar   seja uma experiência 
              especial e satisfatória.
            </p>
          </div>
        </div>

        <!-- Image -->
        <div class="relative">
          <div class="text-8xl text-center">
            🛍️
          </div>
        </div>
      </div>

      <!-- Values Section -->
      <div class="mt-20">
        <h2 class="text-3xl font-bold text-gray-900 text-center mb-12">
          Nossos Valores
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center">
            <div class="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Qualidade</h3>
            <p class="text-gray-600">
              Selecionamos cuidadosamente cada produto para garantir a melhor qualidade aos nossos clientes.
            </p>
          </div>
          
          <div class="text-center">
            <div class="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Preço Justo</h3>
            <p class="text-gray-600">
              Oferecemos produtos com excelente custo-benefício, sem comprometer a qualidade.
            </p>
          </div>
          
          <div class="text-center">
            <div class="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Inclusão</h3>
            <p class="text-gray-600">
              Acreditamos que a moda deve ser para todos, independente da idade, gênero ou estilo.
            </p>
          </div>
        </div>
      </div>

      <!-- Statistics -->
      <div class="mt-20 bg-gray-50 rounded-lg p-8">
        <h2 class="text-3xl font-bold text-gray-900 text-center mb-12">
          Nossos Números
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div>
            <div class="text-3xl font-bold text-blue-600 mb-2">1000+</div>
            <div class="text-gray-600">Produtos</div>
          </div>
          <div>
            <div class="text-3xl font-bold text-green-600 mb-2">500+</div>
            <div class="text-gray-600">Clientes Satisfeitos</div>
          </div>
          <div>
            <div class="text-3xl font-bold text-purple-600 mb-2">3</div>
            <div class="text-gray-600">Categorias</div>
          </div>
          <div>
            <div class="text-3xl font-bold text-red-600 mb-2">100%</div>
            <div class="text-gray-600">Satisfação</div>
          </div>
        </div>
      </div>

      <!-- CTA Section -->
      <div class="mt-20 text-center">
        <h2 class="text-3xl font-bold text-gray-900 mb-6">
          Pronto para Descobrir Nossos Produtos?
        </h2>
        <p class="text-xl text-gray-600 mb-8">
          Explore nossa coleção e encontre tudo o que você precisa para se vestir com estilo.
        </p>
        <router-link to="/produtos" 
                    class="inline-flex items-center justify-center rounded-md bg-blue-600 px-8 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          Ver Produtos
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About'
}
</script>
