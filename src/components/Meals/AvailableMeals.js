import React, { useEffect, useState } from "react";
import "./AvailableMeals.css";
import Card from "../UI/Card";
import MealItem from "./MealItems";

const AvailableMeals = () => {
  const [mealsItem, setMealsitems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  //fetching the meals from Firebase
  useEffect(() => {
    setIsLoading(true);
    const fetchMeals = async () => {
      const response = await fetch(
        "https://react-http-4dcfb-default-rtdb.firebaseio.com/meals.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();
      const loaddedMeals = [];

      for (const key in data) {
        loaddedMeals.push({
          id: key,
          pic: data[key].pic,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
      }

      setMealsitems(loaddedMeals);
      setIsLoading(false);
    };

    fetchMeals().catch((error) => {
      setIsLoading(false);
      setError(error.message);
    });
  }, []);

  const listAllMeals = mealsItem.map((meal) => (
    <MealItem
      id={meal.id} // this is new!
      key={meal.id}
      pic={meal.pic}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className="meals">
      <Card>
        {!isLoading && <ul>{listAllMeals}</ul>}
        {!isLoading && (
          <ul>
            {listAllMeals.length === 0 && (
              <p className="failed">No Menu Found</p>
            )}
          </ul>
        )}
        {!isLoading && error && <p>{error}</p>}
        {isLoading && <p className="failed">Loading Meals</p>}
      </Card>
    </section>
  );
};

export default AvailableMeals;
