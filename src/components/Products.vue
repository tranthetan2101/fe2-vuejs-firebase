<template>
  <div class="products" id="products">
    <div class="container">
      <h1 class="text-center p-5">Danh sách sản phẩm</h1>
      <div class="row">
        <div class="col-md-4" v-for="product in products" :key="product">
          <div class="card product-item">
            <carousel :perPage="1">
              <slide v-for="(image, index) in product.images" :key="index">
                <img
                  :src="image"
                  class="card-img-top"
                  alt="..."
                  width="250px"
                />
              </slide>
            </carousel>

            <div class="card-body">
              <div class="d-flex justify-content-between">
                <h5 class="card-title">{{ product.name }}</h5>
                <h5 class="card-priceS"><b>{{ product.price | number('0,0')}}</b> VND</h5>
              </div>

              <Addtocart
                :image="getImage(product.images)"
                :p-id="product.id"
                :price="product.price"
                :name="product.name"
              >
              </Addtocart>
                <!-- <button size="sm" @click.stop="DetailProduct(key)">Details</button> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "../firebase";
export default {
  name: "Products",
  props: {
    msg: String,
  },
  data() {
    return {
      products: [],
      product: {
          name:null,
          description:null,
          price:null,
          tags:[],
          images:[]
      },
    };
  },
  methods: {
    DetailProduct() {
      this.$firestore.products.doc(this.product.id).get(this.product)
    },
    getImage(images) {
      return images[0];
    },
  },
  firestore() {
    return {
      products: db.collection("products"),
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.products {
  margin-top: 7rem;
  background: #f2f2f2;
  padding-bottom: 3rem;
}
</style>
