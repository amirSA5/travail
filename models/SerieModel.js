const mongoose = require ('mongoose');

const serieSchema = new mongoose.Schema ({
  Nom: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    sparse: true,
  },

  sousArticle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'sousArticleSchema',
  },
});

module.exports = mongoose.model ('serieSchema', serieSchema);
