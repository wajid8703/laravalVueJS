<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div class="box">
          <div class="box-header">
            <h3 class="box-title">Responsive Hover Table</h3>

            <div class="box-tools">
              <button class="bt btn-success" @click="newModal" data-toggle="modal" data-target="#addNew">Add New</button>
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
                  <th>Email</th>
                  <th>Registered At</th>
                  <th>Actions</th>
                </tr>
                <tr v-for="user in users" :key="user.id">
                  <td>{{ user.id }}</td>
                  <td>{{ user.name | upText }}</td>
                  <!-- upText and myDate are both user defined functions globally -->
                  <td>{{ user.email }}</td>
                  <td>{{ user.created_at | myDate}}</td>
                  <td>
                    <a href="#" @click="editModal(user)">
                      Edit
                      <i class="fa fa-edit"></i>
                    </a>
                    /
                    <a href="#" @click="deleteUser(user.id)">
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
        <!-- /.box -->
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
          <form @submit.prevent="editmode ? updateUser() : createUser()">
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
                <label>Email</label>
                <input
                  v-model="form.email"
                  placeholder="Email"
                  type="text"
                  name="email"
                  class="form-control"
                  :class="{ 'is-invalid': form.errors.has('email') }"
                />
                <has-error :form="form" field="email"></has-error>
              </div>

              <div class="form-group">
                <label>Password</label>
                <input
                  v-model="form.password"
                  placeholder="Password"
                  type="password"
                  name="password"
                  class="form-control"
                  :class="{ 'is-invalid': form.errors.has('password') }"
                />
                <has-error :form="form" field="password"></has-error>
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
  <!-- template will have only one child like one div not two childs -->
</template>

<script>
export default {
  data() {
    return {
      users: {},
      editmode: false,
      form: new Form({
        name: "",
        email: "",
        password: ""
      })
    };
  },
  methods: {
    updateUser() {
     
},
    editModal(user) {
      this.editmode = true;
      this.form.reset();
      $('#addNew').modal('show');
      //fill the 
      this.form.fill(user);
    },
    newModal() {
      this.editmode = false;
      this.form.reset();
      $('#addNew').modal('show');
    },
    deleteUser(id) {
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
            this.form
            .delete("api/user/" + id)
            .then(() => { 
              Fire.$emit("AfterCreate");

              swal.fire("Deleted!", "Your file has been deleted.", "success");
            })
            .catch(() => {
              swal.fire("Failed!", "Something went wrong.", "error");
            });
          }
          
        });
    },
    loadUsers() {
      // { data } this is function in latest script and previous was function({data})
      axios.get("api/user").then(({ data }) => (this.users = data.data));
    },

    createUser() {
      //show progress bar
      this.$Progress.start();
      this.form
        .post("api/user")
        .then(() => {
          //call event
          Fire.$emit("AfterCreate");

          $("#addNew").modal("hide");
          toast.fire({
            type: "success",
            title: "Signed in successfully"
          });
          // this.loadUsers();

          this.$Progress.finish();
        })
        .catch(() => {
          toast.fire({
            type: "error",
            title: "Something went wrong!"
          });
        });
    }
  },
  created() {
    this.loadUsers();
    //event declared
    Fire.$on("AfterCreate", () => {
      this.loadUsers();
    });
    //call this function after every 3 ms to fetch and display data
    // setInterval(() => this.loadUsers(),3000);
  }
};
</script>
