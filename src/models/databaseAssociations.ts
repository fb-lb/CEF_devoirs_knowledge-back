import { User } from "./User.js";
import { Theme } from "./Theme.js";
import { Cursus } from "./Cursus.js";
import { Lesson } from "./Lesson.js";
import { Element } from "./Element.js";
import { Text } from "./Text.js";
import { Image } from "./Image.js";

// Relations between models

export function setupAssociations() {
  // Association between User and User
  User.belongsTo(User, {
    as: "UpdatedByUser",
    foreignKey: "updatedBy",
  });

  User.hasMany(User, {
    as: "UpdatedUsers",
    foreignKey: "updatedBy",
  });

  // Association between Theme and User
  Theme.belongsTo(User, {
    as: "UpdatedByUser",
    foreignKey: "updatedBy",
  });

  User.hasMany(Theme, {
    as: "UpdatedThemes",
    foreignKey: "updatedBy",
  });

  // Association between Cursus and Theme
  Cursus.belongsTo(Theme, {
    as: "IncludedInTheme",
    foreignKey: "theme_id",
  });

  Theme.hasMany(Cursus, {
    as: "IncludesCursus",
    foreignKey: "theme_id",
  });

  // Association between Cursus and User
  Cursus.belongsTo(User, {
    as: "UpdatedByUser",
    foreignKey: "updatedBy",
  });

  User.hasMany(Cursus, {
    as: "UpdatedCursus",
    foreignKey: "updatedBy",
  });

  // Association between Lesson and Cursus
  Lesson.belongsTo(Cursus, {
    as: "IncludedInCursus",
    foreignKey: "cursus_id",
  });

  Cursus.hasMany(Lesson, {
    as: "InludesLessons",
    foreignKey: "cursus_id",
  });

  // Association between Lesson and User
  Lesson.belongsTo(User, {
    as: "UpdatedByUser",
    foreignKey: "updatedBy",
  });

  User.hasMany(Lesson, {
    as: "UpdatedLessons",
    foreignKey: "updatedBy",
  });

  // Association between Element and Lesson
  Element.belongsTo(Lesson, {
    as: "IncludedInLesson",
    foreignKey: "lesson_id",
  });

  Lesson.hasMany(Element, {
    as: "InludesElements",
    foreignKey: "lesson_id",
  });

  // Association between Element and User
  Element.belongsTo(User, {
    as: "UpdatedByUser",
    foreignKey: "updatedBy",
  });

  User.hasMany(Element, {
    as: "UpdatedElements",
    foreignKey: "updatedBy",
  });

  // Association between Text and Element
  Text.belongsTo(Element, {
    as: "IncludedInElement",
    foreignKey: "element_id",
  });

  Element.hasMany(Text, {
    as: "IncludesTexts",
    foreignKey: "element_id",
  });

  // Association between Text and User
  Text.belongsTo(User, {
    as: "UpdatedByUser",
    foreignKey: "updatedBy",
  });

  User.hasMany(Text, {
    as: "UpdatedTexts",
    foreignKey: "updatedBy",
  });

  // Association between Image and Element
  Image.belongsTo(Element, {
    as: "IncludedInElement",
    foreignKey: "element_id",
  });

  Element.hasMany(Image, {
    as: "IncludesImages",
    foreignKey: "element_id",
  });

  // Association between Image and User
  Image.belongsTo(User, {
    as: "UpdatedByUser",
    foreignKey: "updatedBy",
  });

  User.hasMany(Image, {
    as: "UpdatedImages",
    foreignKey: "updatedBy",
  });
}

export { User };
