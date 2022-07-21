import React, { Fragment } from 'react'
import AvailableMeals from './AvailableMeals'
import MealsMenu from './MealsMenu'

const Meals = () => {
  return (
    <Fragment>
       
        <MealsMenu />
        <AvailableMeals />
    </Fragment>
  )
}

export default Meals