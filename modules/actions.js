import * as t from './constants';
import exercises from '../config/data';
import {AsyncStorage} from 'react-native';

export function getExercises(muscle) {
    return () => {
        return new Promise((resolve, reject) => {
            let keys = Object.keys(exercises);
            if (keys.includes(muscle.toLowerCase())) {
                let result = exercises[muscle.toLowerCase()]
                resolve(result)
            } else {
                reject({message: "Category not found"})
            }
        });
    };
}

export function addExercise(exercise) {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(t.EXERCISE_KEY, (err, result) => {
                if (!err) {
                    let exercises = (!result) ? [] : JSON.parse(result);
                    const index = exercises.findIndex((exercise) => exercise.id.id === exercise.id)

              
                    if (index !== -1) reject({message: "Exercise has previously being selected"})
                    else exercises.push(exercise)

                    AsyncStorage.setItem(t.EXERCISE_KEY, JSON.stringify(exercises), () => {
                        dispatch({"type": t.ADD_EXERCISE, data: {exercise}});
                        resolve();
                    });

                } else reject({message: "Unable to add exercise, please try again !"})
            });
        });
    };
}


export function getFavoriteExercises() {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(t.EXERCISE_KEY, (err, result) => {
                if (!err) {
                    let exercises = (!result) ? [] : JSON.parse(result)
                    dispatch({"type": t.EXERCISES_AVAILABLE, data: {exercises}});
                    resolve();
                }
                else reject({message: err})
            });
        });
    };
}

export function removeExercise(id) {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
           
            AsyncStorage.getItem(t.EXERCISE_KEY, (err, result) => {
                if (!err) {
                    let exercises = (!result) ? [] : JSON.parse(result)

                    const index = exercises.findIndex((obj) => obj.id === id)

          
                    if (index !== -1) {
                        exercises.splice(index, 1);
                        AsyncStorage.setItem(t.EXERCISE_KEY, JSON.stringify(exercises), () => {
                            dispatch({"type": t.REMOVE_EXERCISE, data: {id}});
                            resolve();
                        });
                    }else{
                        reject({message: "Exercise not found"})
                    }
                } else reject({message: "Unable to add exercise, please try again !"})
            });
        });
    };
}

