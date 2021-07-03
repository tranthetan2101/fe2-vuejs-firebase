<template>
  <div class="products">
    <div class="container h-100">
      <!-- header page -->
      <div class="intro h-100">
        <div class="row h-100 justify-content-center align-items-center">
          <div class="col-md-6">
            <h3>Products page</h3>
            <p>The ultimate creative studio. Let your ideas flow with brilliant
              color, blazing graphics, faster processors, intuitive tools, and a
              stunning, adjustable 28” display.</p>
          </div>
          <div class="col-md-6">
            <img src="/img/svg/products.svg" class="img-fluid" />
          </div>
        </div>
      </div>

      <h3 class="d-inline-block">list product</h3>
      <button class="btn btn-primary float-right" @click="addNew()"> new product</button>
      <table class="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>images</th>
            <th>Modify</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id">
            <td>{{ product.name }}</td>
            <td>{{ product.price }}</td>
            <td>
              <carousel :perPage="1">
                <slide v-for="image in product.images" :key="image">
                  <img :src="image" class="img-fluid" alt="..." width="80px">
                </slide>
              </carousel>
            </td>
            <td>
              <button class="btn btn-primary" @click="editProduct(product)">edit</button>
              <button class="btn btn-danger" @click="deleteProduct(product)"> delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="product" tabindex="-1" role="dialog" aria-labelledby="editLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editLabel" v-if="modal =='edit'">sửa sản phẩm</h5>
            <h5 class="modal-title" id="editLabel" v-if="modal == 'addnew'">Tạo mới sản phẩm</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <!-- main product -->
              <div class="col-md-8">
                <div class="form-group">
                  <input type="text" placeholder="Tên sản phẩm" v-model="product.name" class="form-control" />
                </div>

                <div class="form-group" >
                  <!-- <textarea class="form-control" placeholder="Mô tả sản phẩm" v-model="product.description"></textarea> -->
                  <vue-editor v-model="product.description"></vue-editor>
                </div>
              </div>
              <!-- product sidebar -->
              <div class="col-md-4">
                <h4 class="display-6">Product Details</h4>
                <hr />
                <div class="form-group">
                  <input type="text" placeholder="Gía sản phẩm" v-model="product.price" class="form-control"  />
                </div>

                <div class="form-group">
                  <input type="text" placeholder="Tags" v-on:keyup.188="addTag" v-model="tag" class="form-control" />
                  <div  class="d-flex">
                        <p v-for="tag in product.tags" :key="tag">
                            <span class="p-1">{{tag}}</span>
                        </p>
                      </div>
                </div>

                <div class="form-group">
                  <label for="product_image">ảnh sản phẩm</label>
                  <input type="file" @change="uploadImage" class="form-control"/>
                </div>

                <div class="form-group d-flex">
                  <div class="p-1" v-for="(image,index) in product.images" :key="image">
                    <div class="img-wrapp">
                      <img :src="image" alt="" width="80px" />
                      <span class="delete-img" @click="deleteImage(image,index)">X</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal" >Thoát</button>
            <button @click="addProduct()" type="button" class="btn btn-primary" v-if="modal == 'addnew'">Tạo mới</button>
            <button @click="updateProduct()" type="button" class="btn btn-primary" v-if="modal == 'edit'">Sửa</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
<script>
import { VueEditor } from "vue2-editor";
import { db,fb } from "../../firebase";
export default {
  name: "Product",
  components: {
    VueEditor
  },
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
      activeItem: null,
      modal:null,
      tag:null
    };
  },
   firestore(){
      return {
        products: db.collection('products'),
      }
  },
  methods: {
    reset(){
      this.product = {
          name:null,
          description:null,
          price:null,
          tags:[],
          images:[]
      }
    },
    addTag(){
      this.product.tags.push(this.tag);
      this.tag ="";
    },
    addNew() {
      this.modal ='addnew';
      this.reset();
      $("#product").modal("show");
    },
    deleteImage(img,index){
      let image = fb.storage().refFromURL(img);
      this.product.images.splice(index,1);
      image.delete().then(function() {
        console.log('image deleted');
      }).catch(function(error) {
        console.log('an error occurred');
      });
    },
    uploadImage(e){
        if(e.target.files[0]){
          let file = e.target.files[0];
          let storageRef = fb.storage().ref('products/'+ Math.random() + '_'  + file.name);
          let uploadTask  = storageRef.put(file);
          uploadTask.on('state_changed', (snapshot) => {
          }, (error) => {
          }, () => {
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
              this.product.images.push(downloadURL);
            });
          });
      }
    },
    updateProduct() {
      this.$firestore.products.doc(this.product.id).update(this.product);
      Toast.fire({
        icon: 'success',
        title: 'update in successfully'
      });
      $("#product").modal("hide");
    },

    editProduct(product) {
      this.modal = 'edit';
      this.product = product;
      this.activeItem = product['.key'];
      $("#product").modal("show");
    },

    deleteProduct(doc) {
        Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.$firestore.products.doc(doc.id).delete();
          Toast.fire({
            icon: 'success',
            title: 'delete in successfully'
          })
        }
      })
    },

    addProduct() {
     this.$firestore.products.add(this.product);
     $("#product").modal("hide");
     Toast.fire({
            icon: 'success',
            title: 'add product in successfully'
          })
    }
  },
};
</script>


<style scoped lang="scss">
    .img-wrapp{
      position: relative;
    }
    .img-wrapp span.delete-img{
        position: absolute;
        top: -14px;
        left: -2px;
    }
    .img-wrapp span.delete-img:hover{
      cursor: pointer;
    }
</style>