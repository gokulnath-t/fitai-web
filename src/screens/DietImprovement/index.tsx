import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronRight } from "lucide-react"
import { dispatch } from '@/redux/store';
import { goToNextStep, updateDietImprovement } from '@/redux/slices/appSlice';

interface DietImprovementType {
  title: string;
  index: number;
  key: string;
}

const DietImprovementList: DietImprovementType[] = [
  { title: "Low carb", key: "LOW_CARB", index: 1 },
  { title: "High carb", key: "HIGH_CARB", index: 2 },
  { title: "High Protein", key: "HIGH_PROTEIN", index: 3 },
  { title: "Low Sodium", key: "LOW_SODIUM", index: 4 },
  { title: "Low Calorie", key: "LOW_CALORIE", index: 5 },
  { title: "Low Fat", key: "LOW_FAT", index: 6 },
  { title: "High Fiber", key: "HIGH_FIBER", index: 7 },
]

export default function DietImprovement() {
  const [selectedDiet, setSelectedDiet] = useState<number[]>([])

  const handleSelection = (index: number) => {
    setSelectedDiet(prevSelected => 
      prevSelected.includes(index)
        ? prevSelected.filter(item => item !== index)
        : [...prevSelected, index]
    )
  }

  const handleSubmit = () => {
    const selectedImprovements = DietImprovementList
      .filter(item => selectedDiet.includes(item.index))
      .map(diet => diet.title)
    console.log('Selected diet improvements:', selectedImprovements);
    dispatch(updateDietImprovement(selectedImprovements));
    dispatch(goToNextStep())
  }

  const disabled = selectedDiet.length === 0

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-600 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-gray-800 text-white">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Diet Improvement</CardTitle>
          <CardDescription className="text-gray-400">
            Enhance your diet with one of these popular plans.
            <br />
            (Select as many as you like)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {DietImprovementList.map((item) => (
              <Button
                key={item.index}
                variant={selectedDiet.includes(item.index) ? "default" : "outline"}
                className="h-auto py-4 flex items-center justify-center"
                onClick={() => handleSelection(item.index)}
              >
                <span className="text-lg">{item.title}</span>
              </Button>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full" 
            disabled={disabled}
            onClick={handleSubmit}
          >
            Select Allergies
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}