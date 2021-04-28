import { contracts, categories, ingredients } from "./dataArrays";

export function getCategoryById(categoryId) {
  let category;
  categories.map((data) => {
    if (data.id == categoryId) {
      category = data;
    }
  });
  return category;
}

export function getIngredientName(ingredientID) {
  let name;
  ingredients.map((data) => {
    if (data.ingredientId == ingredientID) {
      name = data.name;
    }
  });
  return name;
}

export function getIngredientUrl(ingredientID) {
  let url;
  ingredients.map((data) => {
    if (data.ingredientId == ingredientID) {
      url = data.photo_url;
    }
  });
  return url;
}

export function getCategoryName(categoryId) {
  let name;
  categories.map((data) => {
    if (data.id == categoryId) {
      name = data.name;
    }
  });
  return name;
}

export function getContracts(categoryId) {
  const ContractsArray = [];
  contracts.map((data) => {
    if (data.categoryId == categoryId) {
      ContractsArray.push(data);
    }
  });
  return ContractsArray;
}

// modifica
export function getContractsByIngredient(ingredientId) {
  const ContractsArray = [];
  contracts.map((data) => {
    data.ingredients.map((index) => {
      if (index[0] == ingredientId) {
        ContractsArray.push(data);
      }
    });
  });
  return ContractsArray;
}

export function getNumberOfContracts(categoryId) {
  let count = 0;
  contracts.map((data) => {
    if (data.categoryId == categoryId) {
      count++;
    }
  });
  return count;
}

export function getAllIngredients(idArray) {
  const ingredientsArray = [];
  idArray.map((index) => {
    ingredients.map((data) => {
      if (data.ingredientId == index[0]) {
        ingredientsArray.push([data, index[1]]);
      }
    });
  });
  return ingredientsArray;
}

// functions for search
export function getContractsByIngredientName(ingredientName) {
  const nameUpper = ingredientName.toUpperCase();
  const ContractsArray = [];
  ingredients.map((data) => {
    if (data.name.toUpperCase().includes(nameUpper)) {
      // data.name.yoUpperCase() == nameUpper
      const contracts = getContractsByIngredient(data.ingredientId);
      const unique = [...new Set(contracts)];
      unique.map((item) => {
        ContractsArray.push(item);
      });
    }
  });
  const uniqueArray = [...new Set(ContractsArray)];
  return uniqueArray;
}

export function getContractsByCategoryName(categoryName) {
  const nameUpper = categoryName.toUpperCase();
  const ContractsArray = [];
  categories.map((data) => {
    if (data.name.toUpperCase().includes(nameUpper)) {
      const contracts = getContracts(data.id); // return a vector of contracts
      contracts.map((item) => {
        ContractsArray.push(item);
      });
    }
  });
  return ContractsArray;
}

export function getContractsByRecipeName(recipeName) {
  const nameUpper = recipeName.toUpperCase();
  const ContractsArray = [];
  contracts.map((data) => {
    if (data.title.toUpperCase().includes(nameUpper)) {
      ContractsArray.push(data);
    }
  });
  return ContractsArray;
}
