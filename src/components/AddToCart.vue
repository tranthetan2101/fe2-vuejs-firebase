<template>
  <div class="add-to-cart">
   
        <button class="btn btn-primary" @click="addToCart">Mua ngay</button>
    
  </div>
</template>
<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
<script>

export default {
  name: "AddToCard",
  props: {
    name: String,
    price: String,
    image: String,
    pId: String
  },

  data(){
      return {
          item :{
            productName: this.name,
            productImage: this.image,
            productPrice: this.price,
            productId: this.pId,
            productQuantity: 1,
          }

      }
  },
  methods:{
    addToCart(){
      $('#miniCart').modal('show');
      this.$store.commit('addToCart', this.item)
    }

  }

};
</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
