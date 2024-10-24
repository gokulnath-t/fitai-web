import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronRight } from "lucide-react"
import { goalList, GoalType } from './helper'
import { dispatch } from '@/redux/store'
import { goToNextStep, updateGoal } from '@/redux/slices/appSlice'




export default function GoalScreen() {
  const [selectedGoal, setSelectedGoal] = useState<GoalType | null>(null)

  const handleSubmit = () => {
    if (selectedGoal) {
      console.log('Selected goal:', selectedGoal);
      dispatch(updateGoal(selectedGoal));
      dispatch(goToNextStep())
    }
  }

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-600 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-gray-800 text-white">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Goals</CardTitle>
          <CardDescription>Choose your fitness goal to tailor your plan.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {goalList.map((goal) => (
              <Button
                key={goal.index}
                variant={selectedGoal?.index === goal.index ? "default" : "outline"}
                className="w-full justify-start text-left"
                onClick={() => setSelectedGoal(goal)}
              >
                {goal.title}
              </Button>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full" 
            disabled={!selectedGoal}
            onClick={handleSubmit}
          >
            Select Meal Restrictions
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}