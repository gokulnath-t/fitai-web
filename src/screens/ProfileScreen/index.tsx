import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useDispatch } from "react-redux";
import { goToNextStep, updateProfile } from "@/redux/slices/appSlice";

export default function ProfileScreen() {
  const [formData, setFormData] = useState({
    name: "",
    currentHeight: "",
    currentWeight: "",
    goalWeight: "",
  });
  const dispatch = useDispatch();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    dispatch(updateProfile(formData));
    dispatch(goToNextStep());
  };

  return (
    <div className="bg-gradient-to-b to-[#B0FF8B] from-[#0E6200] flex items-center justify-center p-4">
      <Card className="h-full w-full max-w-2xl bg-gray-800 text-white to-[#B0FF8B] from-[#0E6200]">
        <CardHeader>
          <CardTitle>Profile Details</CardTitle>
          <CardDescription>
            Please enter your health details below.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="currentHeight">Current Height (inches)</Label>
              <Input
                id="currentHeight"
                name="currentHeight"
                type="number"
                placeholder="Enter your current height"
                value={formData.currentHeight}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="currentWeight">Current Weight (lbs)</Label>
              <Input
                id="currentWeight"
                name="currentWeight"
                type="number"
                placeholder="Enter your current weight"
                value={formData.currentWeight}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="goalWeight">Goal Weight (lbs)</Label>
              <Input
                id="goalWeight"
                name="goalWeight"
                type="number"
                placeholder="Enter your goal weight"
                value={formData.goalWeight}
                onChange={handleChange}
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
