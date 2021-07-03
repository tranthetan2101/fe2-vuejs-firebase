<template>
  <div class="shop" id="shop">
    <div class="container">
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
                <h5 class="card-priceS">{{ product.price | currency }}</h5>
              </div>

              <Addtocart
                :image="getImage(product.images)"
                :p-id="product.id"
                :price="product.price"
                :name="product.name"
              >
              </Addtocart>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "../../firebase";
export default {
  name: "shop",
  data() {
    return {
      products: [],
    };
  },
  methods: {
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