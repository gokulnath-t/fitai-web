export const getSelected = (
    mealRestriction: string[],
    dietImprovement: string[],
    allergies: string[]
  ) => {
    const meal = "Meal Restrictions : " + mealRestriction.join(", ");
    const diet = "Diet Improvement : " + dietImprovement.join(", ");
    const allergy = "Allergies : " + allergies.join(", ");
    return (
      (mealRestriction.length ? meal : "") +
      "\n" +
      (dietImprovement.length ? diet : "") +
      "\n" +
      (allergies.length ? allergy : "")
    );
  };