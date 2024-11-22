<template>
  <div class="books-container">
    <h1>Libros</h1>
    <div class="books-grid">
      <div v-for="book in books" :key="book.id" class="book-card">
        <img :src="`http://127.0.0.1:3000/images/${book.image}`" alt="Imagen del libro" />
        <h2>{{ book.name }}</h2>
        <p>Autor: {{ book.autor }}</p>
        <p>Precio: ${{ book.price }}</p>
        <p>Género: {{ book.gender }}</p>
        <p>Editorial: {{ book.editory }}</p>
        <div class="actions">
          <button @click="editBook(book)">Editar</button>
          <button @click="showModal(book)">Eliminar</button>
        </div>
      </div>
    </div>
    <button class="add-book" @click="navigateToAddBook">Agregar Nuevo Libro</button>

    <!-- Modal de confirmación -->
    <ConfirmModal
      :visible="isModalVisible"
      @confirm="deleteBook"
      @cancel="hideModal"
    />
  </div>
</template>

<script>
import axios from "axios";
import ConfirmModal from "./modalDelete.vue";

export default {
  components: { ConfirmModal },
  data() {
    return {
      books: [], // Almacena los libros desde la API
      isModalVisible: false,
      bookToDelete: null, // Almacena el libro que se va a eliminar
    };
  },
  methods: {
    async fetchBooks() {
      try {
        const response = await axios.get("http://127.0.0.1:3000/books");
        console.log(response.data.data);
        this.books = response.data.data; // Asegúrate de que el formato del API es correcto
      } catch (error) {
        console.error("Error al obtener los libros:", error);
      }
    },
    editBook(book) {
      this.$router.push({ name: "EditBook", params: { bookId: book.id, initialData: book } });
    },
    showModal(book) {
      console.log("showModal", book);
      this.bookToDelete = book; // Establece el libro a eliminar
      this.isModalVisible = true; // Muestra el modal
    },
    hideModal() {
      this.isModalVisible = false; // Oculta el modal
    },
    async deleteBook() {
      try {
        if (this.bookToDelete) {
          await axios.delete(`http://127.0.0.1:3000/books/${this.bookToDelete.id}`);
          this.books = this.books.filter(book => book.id !== this.bookToDelete.id); // Elimina el libro del array
          this.hideModal(); // Cierra el modal
        }
      } catch (error) {
        console.error("Error al eliminar el libro:", error);
      }
    },
    navigateToAddBook() {
      this.$router.push({ name: "AddBook" });
    },
  },
  created() {
    this.fetchBooks(); // Llama a la API para obtener los libros
  },
};
</script>

<style scoped>
.books-container {
  padding: 20px;
}
.books-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}
.book-card {
  border: 1px solid #ccc;
  padding: 15px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.book-card img {
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 4px;
}
.actions {
  margin-top: 10px;
}
.actions button {
  margin: 5px;
  padding: 5px 10px;
}
.add-book {
  margin-top: 20px;
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.add-book:hover {
  background-color: #0056b3;
}
</style>
