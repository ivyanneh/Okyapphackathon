import { Dimensions, ScrollView, StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import React, { useState } from 'react';
import { en } from './Encyclopedia/en';

const EncyclopediaScreen = () => {
   const [expandedCategory, setExpandedCategory] = useState(null);
   const [expandedSubCategories, setExpandedSubCategories] = useState({}); // Object to track subcategories for each category

   const handleCategoryPress = (categoryId) => {
      setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
   };

   const handleSubCategoryPress = (categoryId, subCategoryId) => {
      setExpandedSubCategories((prevState) => {
         const newState = { ...prevState };
         // Toggle the subcategory expansion for the given category
         newState[categoryId] = newState[categoryId] === subCategoryId ? null : subCategoryId;
         return newState;
      });
   };

   return (
      <View style={styles.background}>  {/* Updated here to a simple View container */}
         <ScrollView contentContainerStyle={styles.container}>
            {en.categories.allIds.map((categoryId) => {
               const category = en.categories.byId[categoryId];
               // Ensure the category exists
               if (!category) {
                  console.warn(`Category with ID ${categoryId} not found.`);
                  return null; // Skip this category if not found
               }

               return (
                  <View key={categoryId} style={styles.category}>
                     <TouchableOpacity onPress={() => handleCategoryPress(categoryId)}>
                        <Text style={styles.categoryTitle}>
                           {category.name} {category.tags.primary.emoji}
                        </Text>
                     </TouchableOpacity>

                     {/* Show subcategories when the category is expanded */}
                     {expandedCategory === categoryId && (
                        <View style={styles.subCategoryContainer}>
                           {category.subCategories.map((subCategoryId) => {
                              const subCategory = en.subCategories.byId[subCategoryId];
                              // Ensure the subcategory exists
                              if (!subCategory) {
                                 console.warn(`Subcategory with ID ${subCategoryId} not found.`);
                                 return null; // Skip this subcategory if not found
                              }

                              const isSubCategoryExpanded = expandedSubCategories[categoryId] === subCategoryId;

                              return (
                                 <View key={subCategoryId} style={styles.subCategory}>
                                    <TouchableOpacity onPress={() => handleSubCategoryPress(categoryId, subCategoryId)}>
                                       <Text style={styles.subCategoryTitle}>
                                          {subCategory.name}
                                       </Text>
                                    </TouchableOpacity>

                                    {/* Show articles when the subcategory is expanded */}
                                    {isSubCategoryExpanded && (
                                       <View style={styles.contentContainer}>
                                          {subCategory.articles.map((articleId) => {
                                             const article = en.articles.byId[articleId];
                                             // Ensure the article exists
                                             if (!article) {
                                                console.warn(`Article with ID ${articleId} not found.`);
                                                return null;
                                             }
                                             return (
                                                <View key={articleId} style={styles.article}>
                                                   <Text style={styles.articleTitle}>{article.title}</Text>
                                                   <Text style={styles.articleContent}>{article.content}</Text>
                                                </View>
                                             );
                                          })}
                                       </View>
                                    )}
                                 </View>
                              );
                           })}
                        </View>
                     )}
                  </View>
               );
            })}
         </ScrollView>
      </View>
   );
};

export default EncyclopediaScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#C4DFE6',  // Background color updated here
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  container: {
    padding: 10,
  },
  category: {
    marginBottom: 8,
    borderRadius: 10,
    backgroundColor: '#66A5AD', 
  },
  categoryTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#fc03b1',
    padding: 9,
    backgroundColor: '#66A5AD',
  },
  subCategoryContainer: {
    marginLeft: 8,
    backgroundColor: '#66A5AD', 
  },
  subCategory: {
    marginBottom: 9,
    backgroundColor: '#66A5AD', 
  },
  subCategoryTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#fc03b3',
    padding: 9,
    backgroundColor: '#C4DFE6',
    marginBottom: 10,
    borderRadius: 4,
  },
  contentContainer: {
    marginLeft: 9,
    padding: 10,
    backgroundColor: '#66A5AD',  // Updated background color for content container
    borderRadius: 5,
  },
  article: {
    marginBottom: 10,
    backgroundColor: '#66A5AD', // Updated background color for article container
  },
  articleTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#fc03b3',
  },
  articleContent: {
    fontSize: 10,
    color: '#333',
  },
});
