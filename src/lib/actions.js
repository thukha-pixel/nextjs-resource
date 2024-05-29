'use server';

import { redirect } from "next//navigation";
import { revalidatePath } from "next/cache";
import { saveMeal } from "./meals";

/**
 * action မှာ ပုံမှန်အားဖြင့် path လမ်းကြောင်းတွေပဲ ထည့်တယ်...
 * အခု က ssr မိုလို့ ဒီမှာပဲ တန်းပြီး execute လုပ်တယ်...
 */
const shareMeal = async (prevState, formData) => {
  // 'use server';
  const meal = {
    title: formData.get('title'),
    summary: formData.get('summary'),
    instructions: formData.get('instructions'),
    image: formData.get('image'),
    creator: formData.get('name'),
    creator_email: formData.get('email'),
  };

  if (isInvalidText(meal.title) || isInvalidText(meal.summary) || isInvalidText(meal.creator) || isInvalidText(meal.creator_email) || !meal.creator_email.includes('@') || !meal.image || meal.image.size === 0) {
    console.log(isInvalidText(meal.title));
    console.log(isInvalidText(meal.summary));
    console.log(isInvalidText(meal.creator));
    console.log(isInvalidText(meal.creator_email));
    console.log(!meal.creator_email.includes('@'));
    console.log(!meal.image);
    console.log(meal.image.size === 0);
    // throw new Error('Invalid input');
    return {
      message: 'Invalid input.'
    };
  }

  await saveMeal(meal);
  /** 
   * အရင် cache တွေကို remove လုပ်ပစ်တယ်... 
   * revalidatePath('/', 'layout')
   * 
   * */
  revalidatePath('/meals', 'layout');

  redirect('/meals');
};

const isInvalidText = (text) => {
  return !text || text.trim() === ''
}

export {shareMeal};