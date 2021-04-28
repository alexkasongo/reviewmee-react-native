import { contracts, categories } from "./dataArrays";

export function getCategoryById(categoryId) {
  let category;
  categories.map((data) => {
    if (data.id == categoryId) {
      category = data;
    }
  });
  return category;
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

export function getNumberOfContracts(categoryId) {
  let count = 0;
  contracts.map((data) => {
    if (data.categoryId == categoryId) {
      count++;
    }
  });
  return count;
}

// functions for search
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
