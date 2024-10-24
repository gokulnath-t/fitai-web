import React, { useState } from "react";
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
import { dispatch } from "@/redux/store";
import { goToNextStep, updateAllergies } from "@/redux/slices/appSlice";
import Milk from "@/assets/images/Allergies/milk.png";
import Eggs from "@/assets/images/Allergies/eggs.png";
import Peanuts from "@/assets/images/Allergies/peanut.png";
import TreeNuts from "@/assets/images/Allergies/treenuts.png";
import Shellfish from "@/assets/images/Allergies/fish.png";
import Fish from "@/assets/images/Allergies/fish.png";
import Soy from "@/assets/images/Allergies/soy.png";
import Wheat from "@/assets/images/Allergies/wheat.png";
import Sesame from "@/assets/images/Allergies/seseme.png";
import None from "@/assets/images/Allergies/none.png";

interface AllergyType {
  title: string;
  index: number;
  iconPath: string;
  key: string;
}

const AllergiesList: AllergyType[] = [
  { title: "Milk", key: "MILK", index: 1, iconPath: Milk },
  { title: "Eggs", key: "EGGS", index: 2, iconPath: Eggs },
  { title: "Peanuts", key: "PEANUTS", index: 3, iconPath: Peanuts },
  { title: "Tree Nuts", key: "TREE_NUTS", index: 4, iconPath: TreeNuts },
  { title: "Shellfish", key: "SHELLFISH", index: 5, iconPath: Shellfish },
  { title: "Fish", key: "FISH", index: 6, iconPath: Fish },
  { title: "Soy", key: "SOY", index: 7, iconPath: Soy },
  { title: "Wheat", key: "WHEAT", index: 8, iconPath: Wheat },
  { title: "Sesame", key: "SESAME", index: 9, iconPath: Sesame },
  { title: "None", key: "NONE", index: 10, iconPath: None },
];

export default function AllergiesScreen() {
  const [selectedAllergy, setSelectedAllergy] = useState<number[]>([]);

  const handleSelection = (index: number) => {
    setSelectedAllergy((prevSelected) =>
      prevSelected.includes(index)
        ? prevSelected.filter((item) => item !== index)
        : [...prevSelected, index]
    );
  };

  const handleSubmit = () => {
    const selectedAllergies = AllergiesList.filter((item) =>
      selectedAllergy.includes(item.index)
    ).map((allergy) => allergy.title);
    console.log("Selected allergies:", selectedAllergies);
    dispatch(updateAllergies(selectedAllergies));
    dispatch(goToNextStep());
    // Here you would typically dispatch an action or navigate to the next screen
    // For example: navigate('/food-around-me')
  };

  const disabled = selectedAllergy.length === 0;

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-600 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-gray-800 text-white">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Allergies</CardTitle>
          <CardDescription className="text-gray-400">
            Let us know if you have any food allergies.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {AllergiesList.map((item) => (
              <Button
                key={item.index}
                variant={
                  selectedAllergy.includes(item.index) ? "default" : "outline"
                }
                className="h-auto py-4 flex flex-col items-center justify-center"
                onClick={() => handleSelection(item.index)}
              >
                <img
                  src={item.iconPath}
                  alt={item.title}
                  className="w-10 h-10 mb-2"
                />
                <span className="text-lg">{item.title}</span>
              </Button>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" disabled={disabled} onClick={handleSubmit}>
            Select Restaurants
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
