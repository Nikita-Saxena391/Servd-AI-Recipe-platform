"use client";

import { UserButton } from "@clerk/nextjs";
import { Cookie, Refrigerator, CalendarDays } from "lucide-react";
import React from "react";

const UserDropDown = () => {
  return (
    <UserButton>
      <UserButton.MenuItems>
        <UserButton.Link
          label="My Recipes"
          labelIcon={<Cookie size={16} />}
          href="/recipes"
        />
      </UserButton.MenuItems>

      <UserButton.MenuItems>
        <UserButton.Link
          label="My Pantry"
          labelIcon={<Refrigerator size={16} />}
          href="/pantry"
        />

        {/* ✅ ADD THIS */}
        <UserButton.Link
          label="Meal Planner"
          labelIcon={<CalendarDays size={16} />}
          href="/meal-planner"
        />

        <UserButton.Action label="manageAccount" />
      </UserButton.MenuItems>
    </UserButton>
  );
};

export default UserDropDown;
