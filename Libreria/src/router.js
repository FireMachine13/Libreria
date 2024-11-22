import { createRouter, createWebHistory } from "vue-router";
import AddBook from "@/components/AddBook.vue";
import BooksGrid from "@/components/libreriaGrid.vue";

const routes = [
  { path: "/books", name: "BooksGrid", component: BooksGrid },
  { path: "/add-book", name: "AddBook", component: AddBook },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
