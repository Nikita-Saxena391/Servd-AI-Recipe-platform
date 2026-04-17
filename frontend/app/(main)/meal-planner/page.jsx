"use client";

import { useEffect, useState } from "react";
import { Calendar, Plus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import MealCard from "@/components/MealCard";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useFetch from "@/hooks/use-fetch";
import { addMealManual, getMeals } from "@/actions/mealPlanner.actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function MealPlannerPage() {
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    date: "",
    mealType: "breakfast",
    mealName: "",
  });

  const [localMeals, setLocalMeals] = useState([]);

  // ✅ FETCH MEALS
  const { loading: loadingMeals, data: mealsData, fn: fetchMeals } =
    useFetch(getMeals);

  // ✅ ADD MEAL
  const { loading: adding, data: addData, fn: addMealFn } =
    useFetch(addMealManual);

  // 🔄 Initial fetch
  useEffect(() => {
    fetchMeals();
  }, []);

  // 🔐 AUTH REDIRECT (fetch)
  useEffect(() => {
    if (mealsData?.auth === false) {
      router.push("/sign-in?redirect_url=/meal-planner");
    }
  }, [mealsData]);

  // 🔐 AUTH REDIRECT (add)
  useEffect(() => {
    if (addData?.auth === false) {
      router.push("/sign-in?redirect_url=/meal-planner");
    }
  }, [addData]);

  // 🔄 Sync meals
  useEffect(() => {
    if (mealsData?.meals) {
      setLocalMeals(mealsData.meals);
    }
  }, [mealsData]);

  // ✅ After adding meal
  useEffect(() => {
    if (addData?.success) {
      toast.success("Meal added 🍽️");
      setOpen(false);
      setForm({ date: "", mealType: "breakfast", mealName: "" });
      fetchMeals();
    }
  }, [addData]);

  // ➕ ADD HANDLER
  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("date", form.date);
    fd.append("mealType", form.mealType);
    fd.append("mealName", form.mealName);

    await addMealFn(fd);
  };

  const meals = localMeals;

  if (mealsData?.auth === false) return null;

  return (
    <div className="min-h-screen bg-stone-50 pt-24 px-4 pb-16">
      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="flex justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold flex gap-2 items-center">
              <Calendar className="text-orange-600" />
              Meal Planner
            </h1>
            <p className="text-stone-600">
              Plan your meals and track your diet
            </p>
          </div>

          <Button onClick={() => setOpen(true)}>
            <Plus className="w-4 h-4" />
            Add Meal
          </Button>
        </div>

        {/* LIST */}
        {loadingMeals ? (
          <Loader2 className="animate-spin" />
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {meals.length === 0 ? (
              <p className="text-stone-500">No meals planned yet</p>
            ) : (
              meals.map((meal) => (
                <MealCard key={meal.id} meal={meal} />
              ))
            )}
          </div>
        )}

        {/* MODAL */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Meal</DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="date"
                className="w-full border p-2"
                value={form.date}
                onChange={(e) =>
                  setForm({ ...form, date: e.target.value })
                }
              />

              <select
                className="w-full border p-2"
                value={form.mealType}
                onChange={(e) =>
                  setForm({ ...form, mealType: e.target.value })
                }
              >
                <option>breakfast</option>
                <option>lunch</option>
                <option>dinner</option>
              </select>

              <input
                className="w-full border p-2"
                placeholder="Meal name"
                value={form.mealName}
                onChange={(e) =>
                  setForm({ ...form, mealName: e.target.value })
                }
              />

              <Button type="submit" disabled={adding}>
                {adding ? "Saving..." : "Save Meal"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}