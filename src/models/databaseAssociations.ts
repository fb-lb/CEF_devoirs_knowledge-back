import { User } from "./User.js";
import { Theme } from "./Theme.js";
import { Cursus } from "./Cursus.js";
import { Lesson } from "./Lesson.js";
import { Element } from "./Element.js";
import { Text } from "./Text.js";
import { Image } from "./Image.js";
import { UserTheme } from "./User-Theme.js";
import { UserCursus } from "./User-Cursus.js";
import { UserLesson } from "./User-Lesson.js";

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

  Element.hasOne(Text, {
    as: "IncludeText",
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

  Element.hasOne(Image, {
    as: "IncludeImage",
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

  // Associations between UserTheme and User
  UserTheme.belongsTo(User, {
    as: "PurchasedByUser",
    foreignKey: "user_id",
  });

  UserTheme.belongsTo(User, {
    as: "CreatedByUser",
    foreignKey: "createdBy",
  })

  UserTheme.belongsTo(User, {
    as: "UpdatedByUser",
    foreignKey: "updatedBy",
  });

  User.hasMany(UserTheme, {
    as: "HasThemes",
    foreignKey: "user_id",
  });

  User.hasMany(UserTheme, {
    as: "CreatedUsersThemes",
    foreignKey: "createdBy",
  });

  User.hasMany(UserTheme, {
    as: "UpdatedUsersThemes",
    foreignKey: "updatedBy",
  });

  // Association between UserTheme and Theme
  UserTheme.belongsTo(Theme, {
    as: "RelatedToTheme",
    foreignKey: "theme_id",
  });

  Theme.hasMany(UserTheme, {
    as: "ThemePurchases",
    foreignKey: "theme_id",
  });

  // Associations between UserCursus and User
  UserCursus.belongsTo(User, {
    as: "PurchasedByUser",
    foreignKey: "user_id",
  });

  UserCursus.belongsTo(User, {
    as: "CreatedByUser",
    foreignKey: "createdBy",
  })

  UserCursus.belongsTo(User, {
    as: "UpdatedByUser",
    foreignKey: "updatedBy",
  });

  User.hasMany(UserCursus, {
    as: "HasCursus",
    foreignKey: "user_id",
  });

  User.hasMany(UserCursus, {
    as: "CreatedUsersCursus",
    foreignKey: "createdBy",
  });

  User.hasMany(UserCursus, {
    as: "UpdatedUsersCursus",
    foreignKey: "updatedBy",
  });

  // Association between UserCursus and Cursus
  UserCursus.belongsTo(Cursus, {
    as: "RelatedToCursus",
    foreignKey: "cursus_id",
  });

  Cursus.hasMany(UserCursus, {
    as: "CursusPurchases",
    foreignKey: "cursus_id",
  });

  // Associations between UserLesson and User
  UserLesson.belongsTo(User, {
    as: "PurchasedByUser",
    foreignKey: "user_id",
  });

  UserLesson.belongsTo(User, {
    as: "CreatedByUser",
    foreignKey: "createdBy",
  });

  UserLesson.belongsTo(User, {
    as: "UpdatedByUser",
    foreignKey: "updatedBy",
  });

  User.hasMany(UserLesson, {
    as: "HasLessons",
    foreignKey: "user_id",
  });

  User.hasMany(UserLesson, {
    as: "CreatedUsersLessons",
    foreignKey: "createdBy",
  });

  User.hasMany(UserTheme, {
    as: "UpdatedUsersLessons",
    foreignKey: "updatedBy",
  });

  // Association between UserLesson and Lesson
  UserLesson.belongsTo(Lesson, {
    as: "RelatedToLesson",
    foreignKey: "lesson_id",
  });

  Lesson.hasMany(UserLesson, {
    as: "LessonPurchases",
    foreignKey: "lesson_id",
  });
}

export { 
  User,
  Theme,
  Cursus,
  Lesson,
  Element,
  Text,
  Image,
  UserTheme,
  UserCursus,
  UserLesson,
 };