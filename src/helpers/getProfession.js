import {specialities} from "../mock/specialities";

export const getProfession = (id) => {
    return specialities.find(el => el.value === id).label
}