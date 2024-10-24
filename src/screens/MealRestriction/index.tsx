import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import Balanced from "@/assets/images/MealRestriction/balanced.png";
import Gluten from "@/assets/images/MealRestriction/gluten.png";
import keto from "@/assets/images/MealRestriction/keto.png";
import Mediterranean from "@/assets/images/MealRestriction/mediterranean.png";
import Paleo from "@/assets/images/MealRestriction/paleo.png";
import Vegan from "@/assets/images/MealRestriction/vegan.png";
import { dispatch } from "@/redux/store";
import { goToNextStep, updateMealRestriction } from "@/redux/slices/appSlice";

interface MealRestrictionType {
  title: string;
  index: number;
  iconPath: string;
  key: string;
}

const MealRestrictionList: MealRestrictionType[] = [
  {
    title: "Keto",
    key: "KETO",
    iconPath: keto,
    index: 1,
  },
  {
    title: "Vegan",
    key: "VEGAN",
    iconPath: Vegan,
    index: 2,
  },
  {
    title: "Gluten Free",
    key: "GLUTEN_FREE",
    iconPath: Gluten,
    index: 3,
  },
  {
    title: "Paleo",
    key: "PALEO",
    iconPath: Paleo,
    index: 4,
  },
  {
    title: "Mediterranean",
    key: "MEDITERRANEAN",
    iconPath: Mediterranean,
    index: 5,
  },
  {
    title: "Balanced Diet",
    key: "BALANCED_DIET",
    iconPath: Balanced,
    index: 6,
  },
];

export default function MealRestriction() {
  const [selectedMeal, setSelectedMeal] = useState<number[]>([]);

  const handleSelection = (index: number) => {
    setSelectedMeal((prevSelected) =>
      prevSelected.includes(index)
        ? prevSelected.filter((item) => item !== index)
        : [...prevSelected, index]
    );
  };

  const handleSubmit = () => {
    const selectedRestrictions = MealRestrictionList.filter((item) =>
      selectedMeal.includes(item.index)
    ).map((meal) => meal.title);
    console.log("Selected restrictions:", selectedRestrictions);
    dispatch(updateMealRestriction(selectedRestrictions));
    dispatch(goToNextStep());
  };

  const disabled = selectedMeal.length === 0;

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-600 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-gray-800 text-white">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Meal Restrictions
          </CardTitle>
          <CardDescription className="text-gray-400">
            Select any dietary restrictions you follow.
            <br />
            (Select as many as you like)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {MealRestrictionList.map((item) => (
              <Button
                key={item.index}
                variant={
                  selectedMeal.includes(item.index) ? "default" : "outline"
                }
                className="h-auto py-4 flex flex-col items-center justify-center"
                onClick={() => handleSelection(item.index)}
              >
                <img
                  src={item.iconPath}
                  alt={item.title}
                  className="w-12 h-12 mb-2 "
                />
                <span>{item.title}</span>
              </Button>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" disabled={disabled} onClick={handleSubmit}>
            Select Diet Plan
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
