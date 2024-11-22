<template>
    <div v-if="visible" class="modal-overlay">
      <div class="modal-content">
        <p>¿Estás seguro de que deseas eliminar este libro?</p>
        <button @click="$emit('confirm')">Sí</button>
        <button @click="$emit('cancel')">No</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      visible: Boolean, // Controla la visibilidad del modal
    },
  };
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .modal-content {
    background-color: #ffffff;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
    width: 300px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  button {
    padding: 10px 20px;
    margin: 5px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  button:hover {
    background-color: #0056b3;
  }
  p {
    margin: 0;
    color: black;
  }
  </style>
  