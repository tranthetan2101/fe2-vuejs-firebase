<template>
  <b-row>
    <b-col cols="12">
      <b-jumbotron>
        <template slot="header">
          {{product.name}}
        </template>
        <template slot="lead">
          Title: {{product.name}}<br>
          Description: {{product.description}}<br>
          Author: {{product.price}}<br>
        </template>
      </b-jumbotron>
    </b-col>
  </b-row>
</template>
 
<script>
 
import { db} from '../../firebase'
 
export default {
  name: 'DetailProduct',
  data () {
    return {
      key: '',
      product: {}
    }
  },
  created () {
    const ref = db.firestore().collection('products').doc(this.$route.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        this.key = doc.id;
        this.product = doc.data();
      } else {
        alert("No such document!");
      }
    });
  }
}
</script>
 
<style>
  .jumbotron {
    padding: 2rem;
  }
  .edit-btn {
    margin-right: 20px;
    width: 70px;
  }
</style>