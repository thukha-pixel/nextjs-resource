import fs from 'node:fs';
import slugify from 'slugify';
import sql from 'better-sqlite3';
import xss from 'xss';

const db = sql('meals.db');

export async function getMeals() {
  // loading state ကို ပြချင်လို့ နည်းနည်း delay ထားတာ...
  await new Promise((resolve) => setTimeout(resolve, 5000));

  // throw new Error('Loading meals failed...');
  return db.prepare('SELECT * FROM meals').all();
}

export function getMeal(slug) {
  return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
}

export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true });

  // instructions မှာ html တွေမိုလို့ xss မဖြစ်အောင် sanitize လုပ်တယ်...
  meal.instructions = xss(meal.instructions);

  const extension = meal.image.name.split('.').pop();
  const fileName = `${meal.slug}.${extension}`;

  const stream = fs.createWriteStream(`public/images/${fileName}`);
  const bufferedImage = await meal.image.arrayBuffer();
  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error('Saving image failed!');
    }
  });

  meal.image = `/images/${fileName}`;

  db.prepare(`
    INSERT INTO meals (title, summary, instructions, creator, creator_email, image, slug)
    VALUES (@title, @summary, @instructions, @creator, @creator_email, @image, @slug)
  `).run(meal);
}
