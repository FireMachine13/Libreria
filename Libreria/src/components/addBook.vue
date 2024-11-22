<template>
    <form @submit.prevent="submitForm">
      <div>
        <label>Nombre:</label>
        <input v-model="name" required />
      </div>
      <div>
        <label>Precio:</label>
        <input type="number" v-model="price" required />
      </div>
      <div>
        <label>Imagen:</label>
        <input type="file" @change="onFileChange" accept="image/*" required />
      </div>
      <div>
        <label>Género:</label>
        <input type="text" v-model="gender" required />
      </div>
      <div>
        <label>Editorial:</label>
        <input type="text" v-model="editory" required />
      </div>
      <div>
        <label>Autor:</label>
        <input type="text" v-model="autor" required />
      </div>
      <button type="submit">Guardar</button>
    </form>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    props: ["initialProduct"],
    data() {
      return {
        name: "",
        price: "",
        image: "",
        gender: "",
        editory: "",
        autor: "",
      };
    },
    methods: {
      onFileChange(event) {
        const file = event.target.files[0];
        this.image = file;
      },
  
      async submitForm() {
        // Crear el formulario con los datos del libro
        const formdata = new FormData();
        formdata.append("name", this.name);
        formdata.append("price", this.price);
        formdata.append("image", this.image);
        formdata.append("gender", this.gender);
        formdata.append("editory", this.editory);
        formdata.append("autor", this.autor);
  
        try {
          // Enviar los datos a la API
          const respuesta = await axios.post("http://127.0.0.1:3000/books", formdata, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
  
          console.log("Libro guardado:", respuesta.data);
  
          // Redirigir a la vista de la lista de libros después de guardar
          this.$router.push({ name: "BooksGrid" });
        } catch (error) {
          console.error("Error al guardar el libro:", error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-width: 400px;
    margin: 0 auto;
  }
  label {
    font-weight: bold;
  }
  button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px;
    border-radius: 4px;
    cursor: pointer;
  }
  button:hover {
    background-color: #0056b3;
  }
  </style>
  