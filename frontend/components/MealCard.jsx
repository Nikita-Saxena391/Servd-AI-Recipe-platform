"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";


export default function MealCard({ meal, onDelete }) {
  if (!meal) return null;

  // ✅ Handle both formats (Strapi v4/v5 safe)
  const data = meal.attributes || meal;

  return (
    <div className="bg-white border rounded-xl p-4 flex justify-between items-start shadow-sm hover:shadow-md transition">
      
      {/* LEFT */}
      <div>
        <p className="text-sm text-gray-500">
          {data.date || "No date"}
        </p>

        <h3 className="font-bold text-lg mt-1">
          {data.mealName || "Unnamed meal"}
        </h3>

        <Badge className="mt-2">
          {data.mealType || "unknown"}
        </Badge>
      </div>

      {/* DELETE BUTTON */}
     
    </div>
  );
}