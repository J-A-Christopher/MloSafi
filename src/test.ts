interface Food extends BaseModel {
  imageUrl: string,
  price: number,
  description: string,
  starRating:number,
  category: Category;
  subCategory: SubCategory;
  }
  
  interface Category extends BaseModel {
    foodId: number;
  }
  
  interface SubCategory extends BaseModel {
    categoryId: number;
    size: string | null;
  }
  
  interface BaseModel {
    id: number;
    name: string | null;
 
  }
  
  const sampleFood: Food[] = [
    {
      id: 1,
      starRating: 3,
      name: "Pizza",
      imageUrl: 'https://kauquemibicahqiybdwc.supabase.co/storage/v1/object/sign/mlosafi/burger.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJtbG9zYWZpL2J1cmdlci5wbmciLCJpYXQiOjE3MTQxMjM3ODYsImV4cCI6MTc0NTY1OTc4Nn0.0bOMg3v1o-Gv7Z9C1zK9BlPhAp3pUSIMLQqImlEjyVw&t=2024-04-26T09%3A26%3A51.979Z',
      price: 12,
      description:"A cool one",
      category: { id: 11, foodId: 1, name: "Pepperoni" },
      subCategory: {
        categoryId: 11,
        id: 111,
        name: null,
        size: "Medium"
      },
    },
  ];