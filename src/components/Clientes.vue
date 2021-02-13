<template>
  <v-app>
    <h1>Gestión de Clientes</h1>

    <section v-if="errored">
      <p>
        Lo sentimos, no es posible obtener la información en este momento, por
        favor intente nuevamente mas tarde
      </p>
    </section>
    <section v-else>
      <div v-if="loading">Cargando...</div>

      <div
        v-else
        v-for="cliente in clientes"
        v-bind:key="cliente.id"
        class="currency"
      ></div>
    </section>

    <v-data-table
      :headers="headers"
      :items="clientes"
      sort-by="firstName"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Vue JS + ASP.NET Core API</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                New Item
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.firstName"
                        label="First Name"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.lastName"
                        label="Last Name"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.city"
                        label="City"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.country"
                        label="Country"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4"> </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="headline"
                >Are you sure you want to delete this item?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
      <template v-slot:no-data>
        <!-- <v-btn
        color="primary"
        @click="initialize"
      >
        Reset
      </v-btn> -->
      </template>
    </v-data-table>
  </v-app>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      clientes: [],
      loading: true,
      errored: false,
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: "FirstName",
          align: "start",
          sortable: false,
          value: "firstName",
        },
        { text: "Last Name", value: "lastName" },
        { text: "City", value: "city" },
        { text: "Country", value: "country" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        firstName: "",
        lastName: "",
        city: "",
        country: "",
      },
      defaultItem: {
        firstName: "",
        lastName: "",
        city: "",
        country: "",
      },
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    //this.initialize()
  },

  methods: {
    loadCustomers() {
      this.loading = true;
      axios
        .get("http://localhost:54824/api/Customer")
        .then((response) => {
          console.log(response.data);
          this.loading = false;
          this.clientes = response.data;
        })
        .catch((error) => {
          console.log(error);
          this.errored = true;
        })
        .finally(() => (this.loading = false));
    },
    saveCustomer() {
      axios
        .post("http://localhost:54824/api/Customer", this.editedItem)
        .then((response) => {
          console.log(response.data);
          this.loading = false;
          this.loadCustomers();
        })
        .catch((error) => {
          console.log(error);
          this.errored = true;
        })
        .finally(() => (this.loading = false));
    },
    updateCustomer() {
      let customerUpd = {
        id: this.editedIndex,
        firstName: this.editedItem.firstName,
        lastName: this.editedItem.lastName,
        city: this.editedItem.city,
        country: this.editedItem.country,
      };
      axios
        .put("http://localhost:54824/api/Customer", customerUpd)
        .then((response) => {
          console.log(response.data);
          this.loading = false;
          this.loadCustomers();
        })
        .catch((error) => {
          console.log(error);
          this.errored = true;
        })
        .finally(() => (this.loading = false));
    },
    deleteCustomer() {
      const idCliente = this.editedIndex;
      console.log("IdCliente: " + idCliente);
      const url = "http://localhost:54824/api/Customer/" + idCliente;
      axios
        .delete(url)
        .then((response) => {
          console.log("Response Delete: " + response.data);
          this.loadCustomers();
        })
        .catch((error) => {
          this.errored = true;
          console.log("Catch Delete: " + error);
        })
        .finally(() => (this.loading = false));
    },
    editItem(item) {
      console.log("editItem :" + item.id);
      //   this.editedIndex = this.desserts.indexOf(item);
      this.editedIndex = item.id;
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      console.log("deleteItem :" + item.id);
      //   this.editedIndex = this.desserts.indexOf(item);
      this.editedIndex = item.id;
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1);
      this.deleteCustomer();
      this.loadCustomers();
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {      
      console.log("valor de editedIndex: "+ this.editedIndex);
      if (this.editedIndex > -1) {
        //Es una actualización
        this.updateCustomer();
        console.log("updateCustomer de editedIndex: "+ this.editedIndex);
      } else {
        //Es un nuevo registor
        this.saveCustomer();
        console.log("saveCustomer de editedIndex: "+ this.editedIndex);
      }
      //this.loadCustomers();
      this.close();
    },
  },
  mounted() {
    this.loadCustomers();
  },
};
</script>