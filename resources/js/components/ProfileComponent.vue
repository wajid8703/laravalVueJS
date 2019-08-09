<style>
.widget-user-header {
  background-position: center center;
  background-size: cover;
  height: 250px !important;
}
</style>


<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-12 mt-3">
        <div class="box box-widget widget-user">
          <!-- Add the bg color to the header using any of the bg-* classes -->
          <div
            class="widget-user-header bg-black tex-white"
            style="background-image:url('./img/bg.png')"
          >
            <h3 class="widget-user-username">Elizabeth Pierce</h3>
            <h5 class="widget-user-desc">Web Designer</h5>
          </div>
          <div class="widget-user-image">
            <img class="img-circle" src alt="User Avatar" />
          </div>
          <div class="box-footer">
            <div class="row">
              <div class="col-sm-4 border-right">
                <div class="description-block">
                  <h5 class="description-header">3,200</h5>
                  <span class="description-text">SALES</span>
                </div>
                <!-- /.description-block -->
              </div>
              <!-- /.col -->
              <div class="col-sm-4 border-right">
                <div class="description-block">
                  <h5 class="description-header">13,000</h5>
                  <span class="description-text">FOLLOWERS</span>
                </div>
                <!-- /.description-block -->
              </div>
              <!-- /.col -->
              <div class="col-sm-4">
                <div class="description-block">
                  <h5 class="description-header">35</h5>
                  <span class="description-text">PRODUCTS</span>
                </div>
                <!-- /.description-block -->
              </div>
              <!-- /.col -->
            </div>
            <!-- /.row -->
          </div>
        </div>
        <form >
          <div class="form-group">
            <label for="name">Name:</label>
            <input type="text" v-model="form.name" class="form-control" id="name" :class="{ 'is-invalid': form.errors.has('name') }" />
            <has-error :form="form" field="name"></has-error>
          </div>
          <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" v-model="form.email" class="form-control" id="email" :class="{ 'is-invalid': form.errors.has('email') }" />
            <has-error :form="form" field="email"></has-error>

          </div>

          <button type="submit" @click.prevent="updateInfo()" class="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: new Form({
        id: "",
        name: "",
        email: "",
        password: ""
      })
    };
  },
  mounted() {
    console.log("Component mounted.");
  },
  methods:{
    updateInfo(){
      this.$Progress.start();
      this.form.put('api/profile')
      .then( () => {
        this.$Progress.finish();
      })
      .catch( () => {
        this.$Progress.fail();
      });
    }
  },
  created() {
    axios.get("api/profile").then(({ data }) => (this.form.fill(data)));
  }
};
</script>
