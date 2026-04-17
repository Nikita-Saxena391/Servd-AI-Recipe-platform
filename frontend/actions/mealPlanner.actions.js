"use server";

import { checkUser } from "@/lib/checkUser";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache"; 
const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

//////////////////////////////////////////////////////

// ➕ ADD MEAL (Recipe-based planner)
//////////////////////////////////////////////////////
export async function addMeal(formData) {
  try {
    
    const user = await checkUser();

if (!user) {
  redirect("/sign-in"); // Clerk sign-in page
}
    

    const recipeId = formData.get("recipeId");
    const date = formData.get("date");
    const mealType = formData.get("mealType");

    if (!recipeId || !date || !mealType) {
      throw new Error("All fields are required");
    }

    const response = await fetch(`${STRAPI_URL}/api/meal-plans`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${STRAPI_API_TOKEN}`,
      },
      body: JSON.stringify({
        data: {
          date,
          mealType,
          user: user.id,
          recipe: recipeId,
        },
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to add meal");
    }

    return {
      success: true,
      message: "Meal added 🍽️",
    };
  } catch (error) {
    console.error("addMeal error:", error);
    throw new Error(error.message);
  }
}

//////////////////////////////////////////////////////
// ➕ ADD MEAL (Manual input)
//////////////////////////////////////////////////////
export async function addMealManual(formData) {
  try {
    const user = await checkUser();
    if (!user) throw new Error("User not authenticated");

    const date = formData.get("date");
    const mealType = formData.get("mealType");
    const mealName = formData.get("mealName");

    const payload = {
      data: {
        date,
        mealType,
        mealName,
        user: user.id, // try this first
      },
    };

    const response = await fetch(`${STRAPI_URL}/api/meal-plans`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${STRAPI_API_TOKEN}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      console.log("🔥 STRAPI ERROR:", JSON.stringify(data, null, 2));
      throw new Error(data.error?.message || "Failed to save meal");
    }

    return {
      success: true,
      data: data.data,
      message: "Meal saved successfully",
    };
  } catch (err) {
    console.error("addMealManual error:", err);
    throw new Error(err.message);
  }
}
//////////////////////////////////////////////////////
// 📥 GET MEAL HISTORY
//////////////////////////////////////////////////////
export async function getMeals() {
  const user = await checkUser();
  if (!user) throw new Error("User not authenticated");

const res = await fetch(
  `${STRAPI_URL}/api/meal-plans?filters[user][id][$eq]=${user.id}&sort=date:desc&_=${Date.now()}`,
  {
    headers: {
      Authorization: `Bearer ${STRAPI_API_TOKEN}`,
    },
    cache: "no-store",
  }
);
  const data = await res.json();

  return {
    success: true,
    meals: data.data.map((item) => ({
      id: item.id,
      date: item.date,
      mealName: item.mealName,
      mealType: item.mealType,
    })),
  };
}
//////////////////////////////////////////////////////
// ❌ DELETE MEAL
//////////////////////////////////////////////////////
