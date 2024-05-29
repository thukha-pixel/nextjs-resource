import Image from 'next/image';
import { getMeal } from '@/lib/meals';
import { notFound } from 'next/navigation';

import classes from './page.module.css';

// export async function generateMetadata({ params }) {
//   const meal = await getMeal(params.mealSlug);

//   if (!meal) {
//     notFound();
//   }

//   return {
//     title: meal.title,
//     description: meal.summary
//   };
// }

/**
 * page.js တိုင်း params ကနေ တန်ဖိုး ယူလို့ရတယ်...
 */
export default function MealDetailsPage({ params }) {
  const meal = getMeal(params.mealSlug);

  if (!meal) {
    /**
     * အနီးဆုံး error.js or not-found.js ကိုပြပေးတယ်...
     * next navigation က default ရတာ...
     *  */ 
    notFound();
  }

  /** 
   * html code တွေပါလာတာမို့
   * line နောက်တစ်ကြောင်းဆင်းချင်လို့ /n ကို <br /> tag နဲ့ replace လုပ်
  */
  meal.instructions = meal.instructions.replace(/\n/g, '<br />');

  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image src={meal.image} fill />
        </div>
        <div className={classes.headerText}>
          <h1>{meal.title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={classes.summary}>SUMMARY</p>
        </div>
      </header>
      <main>
        <p className={classes.instructions} dangerouslySetInnerHTML={{ __html: meal.instructions }}></p>
      </main>
    </>
  );
}
