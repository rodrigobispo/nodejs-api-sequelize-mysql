'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Pessoas', [{
      nome: 'Ana Souza',
      ativo: true,
      email: 'ana@ana.com',
      role: 'estudante',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nome: 'Marcos Cintra',
      ativo: true,
      email: 'marcos@marcos.com',
      role: 'estudante',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nome: 'Marcos Sousa',
      ativo: true,
      email: 'marcos@marcossousa.com',
      role: 'estudante',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nome: 'Julio Lima',
      ativo: true,
      email: 'julio@julio.com',
      role: 'estudante',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nome: 'Paula Moraes',
      ativo: true,
      email: 'paula@paula.com',
      role: 'docente',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nome: 'Sergio Lopes',
      ativo: true,
      email: 'sergio@sergio.com',
      role: 'docente',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Pessoas', null, {});
  }
};
