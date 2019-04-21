require('dotenv').config();
const seed = require("mongo-seeding");
const path = require("path");

const seederConfig = {
  database: {
    name: process.env.MONGO_DB,
  },
  dropDatabase: true
};

const seeder = new seed.Seeder(seederConfig);
const collections = seeder.readCollectionsFromPath(
  //path-ul e relativ la directorul proiectului nu a directorului "scripts"
  path.resolve('./src/seeders'),
  {
    transformers: [seed.Seeder.Transformers.replaceDocumentIdWithUnderscoreId],
  },
);

seeder.import(collections)
  .then(() => {
    console.log('Seeded Successfully!');
  })
  .catch(err => {
    console.log('Error', err);
  });
