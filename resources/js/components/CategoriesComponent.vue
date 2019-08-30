<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-12">
        <div class="box">
          <div class="box-header">
            <h3 class="box-title">Categories List</h3>

            <div class="box-tools">
              <button
                class="bt btn-success"
                @click="newModal"
                data-toggle="modal"
                data-target="#addNew"
              >Add New</button>
              <br />
            </div>
            <br />
          </div>
          <!-- /.box-header -->
          <div class="box-body table-responsive no-padding">
            <table class="table table-hover">
              <tbody>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Flag</th>
                  <th>Actions</th>
                </tr>
                <tr v-for="category in categories" :key="category.category_id" >
                  <td> {{category.category_id }} </td>
                  <td> {{category.category_name }} </td>
                  <td> {{category.category_flag }} </td>
                   <td>
                    <a href="#" @click="editModal(category)">
                      Edit
                      <i class="fa fa-edit"></i>
                    </a>
                    /
                    <a href="#" @click="deleteCategory(category.category_id)">
                      Delete
                      <i class="fa fa-trash"></i>
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- /.box-body -->
        </div>
      </div>
    </div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="addNew"
      tabindex="-1"
      role="dialog"
      aria-labelledby="addNewlabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document"> 
        <div class="modal-content">
          <div class="modal-header">
            <h5 v-show="!editmode" class="modal-title" id="addNewlabel">Add New</h5>
            <h5 v-show="editmode" class="modal-title" id="addNewlabel">Update</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form @submit.prevent="editmode ? updateCategory() : createCategory()">
            <div class="modal-body">
              <div class="form-group">
                <label>Name</label>
                <input
                  v-model="form.name"
                  placeholder="Name"
                  type="text"
                  name="name"
                  class="form-control"
                  :class="{ 'is-invalid': form.errors.has('name') }"
                />
                <has-error :form="form" field="name"></has-error>
              </div>

              <div class="form-group">
                <label>Flag</label>
                <input
                  v-model="form.flag"
                  placeholder="Flag"
                  type="text"
                  name="flag"
                  class="form-control"
                  :class="{ 'is-invalid': form.errors.has('flag') }"
                />
                <has-error :form="form" field="flag"></has-error>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
              <button v-show="editmode" type="submit" class="btn btn-success">Update</button>
              <button v-show="!editmode" type="submit" class="btn btn-primary">Create</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      editmode: false,
      categories: {},
      form: new Form({
        id: "",
        name: "",
        flag: ""
      })
    };
  },
  methods: {
    deleteCategory(id){
       swal
        .fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        })
        .then(result => {
          //send ajax request to server
          if (result.value) {
            console.log('value'+result.value);
            this.form
              .post("api/deletecategory/" + id)
              .then(() => {
                // Fire.$emit("ActionDone");
              this.loadCategories();
                swal.fire("Deleted!", "Your data has been deleted.", "success");
              })
              .catch(() => {
                swal.fire("Failed!", "Something went wrong.", "error");
              });
          }
        });
    },
    loadCategories() {
      axios
        .get("api/categories1")
        .then(({ data }) => (
           this.categories = data))
        .catch(response => {
          console.log(response);
        });
    },
    createCategory() {
      this.form
        .post("api/addcategory")
        .then(() => {
          $("#addNew").modal("hide");
          toast.fire({
            type: "success",
            title: "Category added successfully"
          });
          this.loadCategories();
        })
        .catch(() => {});
    },
    newModal() {
      this.editmode = false;
      $("#newModal").modal("show");
    }
  },
  mounted() {
    
      this.loadCategories();
    console.log("Component mounted.");
  }
};
</script>
