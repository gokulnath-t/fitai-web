import Profile from "../ProfileScreen";
import Goal from "../GoalScreen";
import MealRestriction from "../MealRestriction";
import DietImprovement from "../DietImprovement";
import Allergy from "../Allergies";
import FoodAround from "../FoodAround";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
// Placeholder components for each step
const ProfileScreen = () => <Profile />;
const GoalScreen = () => <Goal />;
const MealRestrictionScreen = () => <MealRestriction />;
const DietImprovementScreen = () => <DietImprovement />;
const AllergiesScreen = () => <Allergy />;
const FoodAroundScreen = () => <FoodAround />;

const steps = [
  { name: "Profile", component: ProfileScreen },
  { name: "Goal", component: GoalScreen },
  { name: "Meal Restriction", component: MealRestrictionScreen },
  { name: "Diet Improvement", component: DietImprovementScreen },
  { name: "Allergies", component: AllergiesScreen },
  { name: "Food Around", component: FoodAroundScreen },
];

export default function StepNavigation() {
  const { currentStep } = useSelector((state: RootState) => state.app);
  console.log("currentStep", currentStep);

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div className="min-h-screen bg-gradient-to-b to-[#B0FF8B] from-[#0E6200] flex items-center justify-center p-2">
      <CurrentStepComponent />
    </div>
  );
}
