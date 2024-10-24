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
import { dispatch } from "@/redux/store";
import { updateRestaurants } from "@/redux/slices/appSlice";
import ChickFill from "@/assets/images/Restaurants/chick-fil-a.png";
import CheeseFac from "@/assets/images/Restaurants/cheese-fac.png";
import TraderJoe from "@/assets/images/Restaurants/trader-joe.png";
import { useNavigate } from "react-router-dom";

interface RestaurantType {
  title: string;
  index: number;
  iconPath: string;
  key: string;
}

const RestaurantList: RestaurantType[] = [
  {
    title: "Chick-fil-A",
    key: "CHICK_FIL_A",
    index: 1,
    iconPath: ChickFill,
  },
  {
    title: "Cheese Factory",
    key: "CHEESE_FACTORY",
    index: 2,
    iconPath: CheeseFac,
  },
  {
    title: "Trader Joe",
    key: "TRADER_JOE",
    index: 3,
    iconPath: TraderJoe,
  },
];

export default function FoodAroundScreen() {
  const [selectedRestaurants, setSelectedRestaurants] = useState<number[]>([]);
  const navigate = useNavigate()
  const handleSelection = (index: number) => {
    setSelectedRestaurants((prevSelected) =>
      prevSelected.includes(index)
        ? prevSelected.filter((item) => item !== index)
        : [...prevSelected, index]
    );
  };

  const handleSubmit = () => {
    if (selectedRestaurants.length > 0) {
      const selectedRestaurantNames = RestaurantList.filter((restaurant) =>
        selectedRestaurants.includes(restaurant.index)
      ).map((restaurant) => restaurant.title);
      console.log("Selected restaurants:", selectedRestaurantNames);
      dispatch(updateRestaurants(selectedRestaurantNames));
      navigate('/aiChat')
    }
  };

  const disabled = selectedRestaurants.length === 0;

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-600 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-gray-800 text-white">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Food around Me</CardTitle>
          <CardDescription className="text-gray-400">
            Find meals from your favorite places nearby.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {RestaurantList.map((item) => (
              <Button
                key={item.index}
                variant={
                  selectedRestaurants.includes(item.index)
                    ? "default"
                    : "outline"
                }
                className="h-auto py-4 flex flex-col items-center justify-center"
                onClick={() => handleSelection(item.index)}
              >
                <img
                  src={item.iconPath}
                  alt={item.title}
                  className="w-24 mb-2"
                />
                <span className="text-lg">{item.title}</span>
              </Button>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" disabled={disabled} onClick={handleSubmit}>
            Continue
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
